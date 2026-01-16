import type { ModHashes } from "./api.js";

export interface IndexFile {
  path: string;
  hashes: ModHashes;
  env: {
    client: string;
    server: string;
  };
  downloads: string[];
  fileSize: number;
}

export interface ModrinthIndex {
  formatVersion: number;
  game: string;
  versionId: string;
  name: string;
  summary: string;
  files: IndexFile[];
  dependencies: {
    minecraft: string;
    "fabric-loader": string;
  };
}
