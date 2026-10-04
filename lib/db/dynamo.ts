// Single shared DynamoDB client for the app. Uses the AWS SDK v3
// DynamoDBDocumentClient so callers work with plain JS objects instead of
// DynamoDB's raw { S: "..." } / { N: "..." } attribute format.
//
// Credentials come from the standard AWS SDK resolution chain (env vars,
// ~/.aws/credentials, or the IAM role Amplify Hosting attaches at runtime)
// — never hardcoded here and never passed in from the app code.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const region = process.env.AWS_REGION || "ap-south-1";

const client = new DynamoDBClient({ region });

export const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    // Drop attributes with `undefined` instead of throwing — content
    // objects coming from forms/JSON often have optional fields.
    removeUndefinedValues: true,
  },
});

// Table names are configurable via env so the same code can point at a
// per-environment table (e.g. a local/dev table vs. the Amplify-hosted
// production table) without a code change.
export const TABLES = {
  spaces: process.env.SPACES_TABLE_NAME || "ApodicSpaces-Spaces",
  photos: process.env.PHOTOS_TABLE_NAME || "ApodicSpaces-Photos",
} as const;
