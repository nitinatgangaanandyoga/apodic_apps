// One-time migration: copy the existing content JSON files into the
// DynamoDB Spaces table, so nothing has to be re-entered by hand.
//
// Because DynamoDB stores nested JSON directly, this is close to a literal
// copy — each file becomes one item, plus a `kind` field so club and
// society records can share one table.
//
// Usage (after running scripts/provision-aws.sh and filling in .env.local):
//   npm run seed
//
// Safe to re-run: it overwrites each space's item with the JSON file's
// current content, so editing a JSON file and re-running updates DynamoDB
// to match (handy right up until the admin UI is what edits content instead).

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "..", "data");

const region = process.env.AWS_REGION || "ap-south-1";
const tableName = process.env.SPACES_TABLE_NAME || "ApodicSpaces-Spaces";

const client = new DynamoDBClient({ region });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

async function loadJsonFiles(dirName) {
  const dir = path.join(dataDir, dirName);
  let entries;
  try {
    entries = await readdir(dir);
  } catch {
    return [];
  }
  const files = entries.filter((f) => f.endsWith(".json"));
  return Promise.all(
    files.map(async (file) => {
      const raw = await readFile(path.join(dir, file), "utf-8");
      return JSON.parse(raw);
    })
  );
}

async function seedKind(dirName, kind) {
  const records = await loadJsonFiles(dirName);
  for (const record of records) {
    if (!record.slug) {
      console.warn(`  [skip] ${dirName} record with no "slug" field`);
      continue;
    }
    const item = { kind, ...record };
    await docClient.send(new PutCommand({ TableName: tableName, Item: item }));
    console.log(`  [ok] ${kind}/${record.slug}`);
  }
  return records.length;
}

async function main() {
  console.log(`Seeding table "${tableName}" in ${region} from data/*.json ...`);
  const clubCount = await seedKind("clubs", "club");
  const societyCount = await seedKind("societies", "society");
  console.log(
    `Done: ${clubCount} club(s), ${societyCount} society(ies) written to ${tableName}.`
  );
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
