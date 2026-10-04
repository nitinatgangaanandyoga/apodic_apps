// The one module the rest of the app imports to read/write space content
// (clubs & societies) — it never talks to a file or to DynamoDB directly
// itself, it just picks which one to delegate to.
//
//   DATA_BACKEND=json      (or unset) → data/clubs/*.json, data/societies/*.json
//   DATA_BACKEND=dynamodb              → the DynamoDB Spaces table
//
// Local dev needs no AWS account: DATA_BACKEND is simply left unset, so
// `npm run dev` reads/writes the same JSON files the prototype always has.
// Production (Amplify Hosting) sets DATA_BACKEND=dynamodb as an
// environment variable, so the exact same admin code writes to DynamoDB
// instead — no code branches anywhere outside this file.
//
// See the "Apodic Spaces: CMS Plan" doc for the reasoning.

import { jsonSpaceStore } from "./spaces.json";
import { dynamoSpaceStore } from "./spaces.dynamodb";
import type { SpaceItem, SpaceKind, SpaceStore } from "./types";

export type { SpaceItem, SpaceKind, SpaceStore };

const backend = process.env.DATA_BACKEND === "dynamodb" ? "dynamodb" : "json";

const store: SpaceStore = backend === "dynamodb" ? dynamoSpaceStore : jsonSpaceStore;

export const getSpaceItem = store.getSpaceItem;
export const listSpaceItems = store.listSpaceItems;
export const putSpaceItem = store.putSpaceItem;
