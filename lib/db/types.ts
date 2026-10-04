// Shared types for the space content store. Kept separate from any one
// backend (JSON files vs. DynamoDB) so both implementations — and the
// facade in spaces.ts that picks between them — can import the same
// shapes without depending on each other.

import type { Club, Society } from "@/lib/mockData";

export type SpaceKind = "club" | "society";

// What a "space" is, regardless of where it's stored: a Club or Society's
// full shape plus a `kind` discriminator (needed once both live in one
// DynamoDB table; the JSON backend infers `kind` from which directory a
// file lives in instead of storing the field on disk).
export type SpaceItem =
  | ({ kind: "club" } & Club)
  | ({ kind: "society" } & Society);

// The interface both backends implement, so the facade (and anything that
// imports from "@/lib/db/spaces") never needs to know which one is active.
export interface SpaceStore {
  getSpaceItem(slug: string): Promise<SpaceItem | null>;
  listSpaceItems(): Promise<SpaceItem[]>;
  putSpaceItem(item: SpaceItem): Promise<void>;
}
