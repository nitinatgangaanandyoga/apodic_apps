// DynamoDB-backed implementation of SpaceStore — used in production
// (DATA_BACKEND=dynamodb). See lib/db/spaces.json.ts for the local-dev
// counterpart, and lib/db/spaces.ts for the facade that picks between them.

import { GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TABLES } from "./dynamo";
import type { SpaceItem, SpaceStore } from "./types";

export const dynamoSpaceStore: SpaceStore = {
  async getSpaceItem(slug) {
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLES.spaces,
        Key: { slug },
      })
    );
    return (result.Item as SpaceItem) ?? null;
  },

  async listSpaceItems() {
    // A Scan is fine at this scale (a handful of spaces, read on every page
    // render being cached by Next.js) — revisit only if the number of
    // spaces grows enough for this to matter.
    const result = await docClient.send(
      new ScanCommand({ TableName: TABLES.spaces })
    );
    return (result.Items as SpaceItem[]) ?? [];
  },

  async putSpaceItem(item: SpaceItem) {
    await docClient.send(
      new PutCommand({
        TableName: TABLES.spaces,
        Item: item,
      })
    );
  },
};
