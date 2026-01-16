import type { ModHashes } from "./api.js";

export interface ModObject {
  path: string;
  downloadUrl: string;
  hashes: ModHashes;
  fileSize: number;
}
