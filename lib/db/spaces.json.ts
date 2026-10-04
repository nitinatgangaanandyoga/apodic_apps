// Local-file-backed implementation of SpaceStore — the default for
// `npm run dev` (DATA_BACKEND unset or "json"), so running the app and
// trying out the admin UI locally needs no AWS account at all: it reads
// and writes the same data/clubs/*.json and data/societies/*.json files
// the prototype has always used. See lib/db/spaces.dynamodb.ts for the
// production counterpart, and lib/db/spaces.ts for the facade that picks
// between them.
//
// Not for production use: most serverless/edge hosts (Amplify Hosting's
// Next.js runtime included) give the app a read-only or ephemeral
// filesystem, so a write here would silently not persist. That's exactly
// why production uses DynamoDB instead.

import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { SpaceItem, SpaceKind, SpaceStore } from "./types";

const dataDir = path.join(process.cwd(), "data");

const DIR_BY_KIND: Record<SpaceKind, string> = {
  club: "clubs",
  society: "societies",
};

function filePath(kind: SpaceKind, slug: string) {
  return path.join(dataDir, DIR_BY_KIND[kind], `${slug}.json`);
}

async function readSpaceFile(kind: SpaceKind, slug: string): Promise<SpaceItem | null> {
  try {
    const raw = await readFile(filePath(kind, slug), "utf-8");
    return { kind, ...JSON.parse(raw) };
  } catch (err: any) {
    if (err?.code === "ENOENT") return null;
    throw err;
  }
}

async function listSpaceFiles(kind: SpaceKind): Promise<SpaceItem[]> {
  const dir = path.join(dataDir, DIR_BY_KIND[kind]);
  let entries: string[];
  try {
    entries = await readdir(dir);
  } catch (err: any) {
    if (err?.code === "ENOENT") return [];
    throw err;
  }
  const files = entries.filter((f) => f.endsWith(".json"));
  return Promise.all(
    files.map(async (file) => {
      const raw = await readFile(path.join(dir, file), "utf-8");
      return { kind, ...JSON.parse(raw) } as SpaceItem;
    })
  );
}

export const jsonSpaceStore: SpaceStore = {
  async getSpaceItem(slug) {
    return (
      (await readSpaceFile("club", slug)) ??
      (await readSpaceFile("society", slug))
    );
  },

  async listSpaceItems() {
    const [clubItems, societyItems] = await Promise.all([
      listSpaceFiles("club"),
      listSpaceFiles("society"),
    ]);
    return [...clubItems, ...societyItems];
  },

  async putSpaceItem(item: SpaceItem) {
    const { kind, ...record } = item;
    // `kind` isn't stored in the file itself — which directory it's in
    // already says that — so it's stripped back out before writing.
    await writeFile(filePath(kind, record.slug), JSON.stringify(record, null, 2) + "\n", "utf-8");
  },
};
