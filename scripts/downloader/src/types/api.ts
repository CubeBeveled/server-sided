export interface ModHashes {
  sha512: string;
  sha1: string;
}

export interface ModDependency {
  version_id: string;
  project_id: string;
  file_name: string;
  dependency_type: string;
}

export interface ModFile {
  id: string;
  hashes: ModHashes;
  url: string;
  filename: string;
  primary: boolean;
  size: number;
  file_type: string | null;
}

export interface ModLicense {
  id: string;
  name: string;
  url: string;
}

export type ModLoaders = Array<"fabric" | "forge" | "neoforge" | "quilt">;

export interface ModVersion {
  id: string;
  project_id: string;
  author_id: string;
  featured: boolean;
  name: string;
  version_number: string;
  project_types: string[];
  games: string[];
  changelog: string;
  date_published: string;
  downloads: number;
  version_type: string;
  status: string;
  requested_status: string | null;
  files: ModFile[];
  dependencies: ModDependency[];
  loaders: ModLoaders;
  ordering: string | null;
  game_versions: string;
  environment: string;
}

export interface ModMetadata {
  id: string;
  slug: string;
  project_types: string[];
  games: string[];
  team_id: string;
  organization: string | null;
  name: string;
  summary: string;
  description: string;
  published: string;
  updated: string;
  approved: string | null;
  queued: boolean | null;
  status: string;
  requested_status: string | null;
  moderator_message: string | null;
  license: ModLicense;
  downloads: number;
  followers: number;
  categories: string[];
  additional_categories: string[];
  loaders: ModLoaders;
  versions: string[];
  icon_url: string;
  link_urls: {
    [link: string]: { platform: string; donation: boolean; url: string };
  };
  gallery: string[];
  color: number;
  thread_id: string;
  monetization_status: string;
  side_types_migration_review_status: string;
  environment: string[];
  game_versions: string[];
}

export interface Collection {
  id: string;
  user: string;
  name: string;
  description: string;
  icon_url: string | null;
  color: number | null;
  status: string;
  created: string;
  updated: string;
  projects: string[];
}

export interface UserCollections {
  [index: number]: Collection;
}
