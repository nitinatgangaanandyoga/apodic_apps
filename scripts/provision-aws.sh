#!/usr/bin/env bash
#
# One-time setup of the AWS resources the Apodic Spaces CMS needs:
#   - a DynamoDB table for space content (clubs & societies)
#   - a DynamoDB table cataloguing uploaded photos
#   - an S3 bucket for photo storage
#   - a Cognito User Pool + app client for the admin login
#
# Run this yourself, from a terminal where `aws configure` has already set
# up your own AWS credentials — Claude never sees or handles those
# credentials. Safe to re-run: every step checks whether its resource
# already exists before creating it.
#
# Usage:
#   chmod +x scripts/provision-aws.sh
#   ./scripts/provision-aws.sh
#
# At the end it prints the values to put in .env.local (see
# .env.local.example for the full list of variables the app reads).

set -euo pipefail

REGION="${AWS_REGION:-ap-south-1}"
SPACES_TABLE="${SPACES_TABLE_NAME:-ApodicSpaces-Spaces}"
PHOTOS_TABLE="${PHOTOS_TABLE_NAME:-ApodicSpaces-Photos}"
# S3 bucket names are globally unique across ALL of AWS, so this needs a
# suffix specific to you — defaults to your AWS account id.
ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"
PHOTOS_BUCKET="${PHOTOS_BUCKET_NAME:-apodic-spaces-photos-${ACCOUNT_ID}}"
USER_POOL_NAME="${USER_POOL_NAME:-ApodicSpacesAdmin}"
COGNITO_DOMAIN_PREFIX="${COGNITO_DOMAIN_PREFIX:-apodic-spaces-admin-${ACCOUNT_ID}}"
# Where Cognito's hosted UI redirects back to after login. Update this to
# your real Amplify Hosting URL once deployed; localhost is enough for
# building the admin locally first.
CALLBACK_URLS="${CALLBACK_URLS:-http://localhost:3001/api/auth/callback/cognito}"
ADMIN_EMAIL="${ADMIN_EMAIL:-}"

echo "Region:            $REGION"
echo "Spaces table:      $SPACES_TABLE"
echo "Photos table:      $PHOTOS_TABLE"
echo "Photos bucket:     $PHOTOS_BUCKET"
echo "Cognito pool name: $USER_POOL_NAME"
echo

# ---------------------------------------------------------------------
# 1. DynamoDB: Spaces table (partition key: slug)
# ---------------------------------------------------------------------
if aws dynamodb describe-table --table-name "$SPACES_TABLE" --region "$REGION" >/dev/null 2>&1; then
  echo "[skip] DynamoDB table $SPACES_TABLE already exists"
else
  echo "[create] DynamoDB table $SPACES_TABLE"
  aws dynamodb create-table \
    --table-name "$SPACES_TABLE" \
    --attribute-definitions AttributeName=slug,AttributeType=S \
    --key-schema AttributeName=slug,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region "$REGION" >/dev/null
  aws dynamodb wait table-exists --table-name "$SPACES_TABLE" --region "$REGION"
fi

# ---------------------------------------------------------------------
# 2. DynamoDB: Photos catalog table (partition key: spaceId, sort key: photoId)
# ---------------------------------------------------------------------
if aws dynamodb describe-table --table-name "$PHOTOS_TABLE" --region "$REGION" >/dev/null 2>&1; then
  echo "[skip] DynamoDB table $PHOTOS_TABLE already exists"
else
  echo "[create] DynamoDB table $PHOTOS_TABLE"
  aws dynamodb create-table \
    --table-name "$PHOTOS_TABLE" \
    --attribute-definitions \
        AttributeName=spaceId,AttributeType=S \
        AttributeName=photoId,AttributeType=S \
    --key-schema \
        AttributeName=spaceId,KeyType=HASH \
        AttributeName=photoId,KeyType=RANGE \
    --billing-mode PAY_PER_REQUEST \
    --region "$REGION" >/dev/null
  aws dynamodb wait table-exists --table-name "$PHOTOS_TABLE" --region "$REGION"
fi

# ---------------------------------------------------------------------
# 3. S3: photos bucket
#    Layout used by the app: apodic-spaces/<space-slug>-<spaceId>/<photo-id>.<ext>
#    (folders are just key prefixes — nothing to pre-create there)
# ---------------------------------------------------------------------
if aws s3api head-bucket --bucket "$PHOTOS_BUCKET" --region "$REGION" >/dev/null 2>&1; then
  echo "[skip] S3 bucket $PHOTOS_BUCKET already exists"
else
  echo "[create] S3 bucket $PHOTOS_BUCKET"
  if [ "$REGION" = "us-east-1" ]; then
    aws s3api create-bucket --bucket "$PHOTOS_BUCKET" --region "$REGION" >/dev/null
  else
    aws s3api create-bucket --bucket "$PHOTOS_BUCKET" --region "$REGION" \
      --create-bucket-configuration LocationConstraint="$REGION" >/dev/null
  fi
  # Photos are served to the public app, so allow public reads of objects
  # only (not bucket listing) via a bucket policy, and block anything else.
  aws s3api put-public-access-block --bucket "$PHOTOS_BUCKET" --region "$REGION" \
    --public-access-block-configuration \
      BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=false,RestrictPublicBuckets=false
  cat > /tmp/apodic-bucket-policy.json <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadPhotos",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${PHOTOS_BUCKET}/apodic-spaces/*"
    }
  ]
}
POLICY
  aws s3api put-bucket-policy --bucket "$PHOTOS_BUCKET" --region "$REGION" \
    --policy file:///tmp/apodic-bucket-policy.json
  rm -f /tmp/apodic-bucket-policy.json
  # CORS so the browser can PUT directly to S3 via a presigned URL from the admin.
  cat > /tmp/apodic-bucket-cors.json <<CORS
{
  "CORSRules": [
    {
      "AllowedOrigins": ["http://localhost:3001", "https://*.amplifyapp.com"],
      "AllowedMethods": ["PUT", "GET"],
      "AllowedHeaders": ["*"],
      "MaxAgeSeconds": 3000
    }
  ]
}
CORS
  aws s3api put-bucket-cors --bucket "$PHOTOS_BUCKET" --region "$REGION" \
    --cors-configuration file:///tmp/apodic-bucket-cors.json
  rm -f /tmp/apodic-bucket-cors.json
fi

# ---------------------------------------------------------------------
# 4. Cognito: admin user pool + app client + hosted UI domain
# ---------------------------------------------------------------------
USER_POOL_ID="$(aws cognito-idp list-user-pools --max-results 60 --region "$REGION" \
  --query "UserPools[?Name=='${USER_POOL_NAME}'].Id | [0]" --output text)"

if [ "$USER_POOL_ID" = "None" ] || [ -z "$USER_POOL_ID" ]; then
  echo "[create] Cognito user pool $USER_POOL_NAME"
  USER_POOL_ID="$(aws cognito-idp create-user-pool \
    --pool-name "$USER_POOL_NAME" \
    --auto-verified-attributes email \
    --admin-create-user-config AllowAdminCreateUserOnly=true \
    --region "$REGION" \
    --query "UserPool.Id" --output text)"

  aws cognito-idp create-user-pool-domain \
    --domain "$COGNITO_DOMAIN_PREFIX" \
    --user-pool-id "$USER_POOL_ID" \
    --region "$REGION" >/dev/null
else
  echo "[skip] Cognito user pool $USER_POOL_NAME already exists ($USER_POOL_ID)"
fi

CLIENT_ID="$(aws cognito-idp list-user-pool-clients --user-pool-id "$USER_POOL_ID" \
  --region "$REGION" --query "UserPoolClients[?ClientName=='admin-web'].ClientId | [0]" --output text)"

if [ "$CLIENT_ID" = "None" ] || [ -z "$CLIENT_ID" ]; then
  echo "[create] Cognito app client admin-web"
  CLIENT_JSON="$(aws cognito-idp create-user-pool-client \
    --user-pool-id "$USER_POOL_ID" \
    --client-name admin-web \
    --generate-secret \
    --allowed-o-auth-flows code \
    --allowed-o-auth-scopes openid email profile \
    --allowed-o-auth-flows-user-pool-client \
    --supported-identity-providers COGNITO \
    --callback-urls "$CALLBACK_URLS" \
    --region "$REGION")"
  CLIENT_ID="$(echo "$CLIENT_JSON" | node -e 'process.stdout.write(JSON.parse(require("fs").readFileSync(0)).UserPoolClient.ClientId)')"
  CLIENT_SECRET="$(echo "$CLIENT_JSON" | node -e 'process.stdout.write(JSON.parse(require("fs").readFileSync(0)).UserPoolClient.ClientSecret)')"
else
  echo "[skip] Cognito app client admin-web already exists ($CLIENT_ID)"
  CLIENT_SECRET="(already created — find it under Cognito > User pools > $USER_POOL_NAME > App clients > admin-web > 'Show client secret')"
fi

if [ -n "$ADMIN_EMAIL" ]; then
  if aws cognito-idp admin-get-user --user-pool-id "$USER_POOL_ID" --username "$ADMIN_EMAIL" --region "$REGION" >/dev/null 2>&1; then
    echo "[skip] Admin user $ADMIN_EMAIL already exists"
  else
    echo "[create] Admin user $ADMIN_EMAIL (temporary password will be emailed by Cognito)"
    aws cognito-idp admin-create-user \
      --user-pool-id "$USER_POOL_ID" \
      --username "$ADMIN_EMAIL" \
      --user-attributes Name=email,Value="$ADMIN_EMAIL" Name=email_verified,Value=true \
      --region "$REGION" >/dev/null
  fi
else
  echo "[note] Set ADMIN_EMAIL=you@example.com and re-run to create your admin login,"
  echo "       or add users later: AWS Console > Cognito > User pools > $USER_POOL_NAME > Users"
fi

echo
echo "Done. Put these in .env.local (see .env.local.example):"
echo
echo "AWS_REGION=$REGION"
echo "SPACES_TABLE_NAME=$SPACES_TABLE"
echo "PHOTOS_TABLE_NAME=$PHOTOS_TABLE"
echo "PHOTOS_BUCKET_NAME=$PHOTOS_BUCKET"
echo "COGNITO_USER_POOL_ID=$USER_POOL_ID"
echo "COGNITO_CLIENT_ID=$CLIENT_ID"
echo "COGNITO_CLIENT_SECRET=$CLIENT_SECRET"
echo "COGNITO_ISSUER=https://cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}"
