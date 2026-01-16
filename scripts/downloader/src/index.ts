import ora from "ora";
import axios from "axios";
import JSZip from "jszip";
import path from "path";
import fs from "fs";
const config = (await import("../../config.json", { with: { type: "json" } }))
  .default;

import type { ModVersion, ModMetadata, Collection } from "./types/api.js";
import type { ModObject } from "./types/custom.js";
import type { ModrinthIndex } from "./types/mrpack.js";

const versionsPath = config.versionsPath;
const modPath = config.modPath;
const fabricLoaderVersion = config.fabricVersion;
const collectionID = config.collectionID;
const userID = config.userID;
const projectVersion = config.version;
const modpackVersion = config.gameVersion;

axios.defaults.headers.common["User-Agent"] =
  "github.com/CubeBeveled/server-sided";
let skipped: string[] = [];

main();
async function main() {
  const spinner = ora("Downloading mods").start();

  if (fs.existsSync(modPath))
    fs.rmSync(path.join(modPath), { recursive: true });

  const collection = await findCollection(userID, collectionID);

  if (collection) spinner.text = "Found collection";
  else {
    console.error("Collection not found");
    process.exit(1);
  }

  const mods: ModObject[] = [];
  for (const projectId of collection.projects) {
    const metadata = await getProjectMetadata(projectId);
    if (metadata) spinner.text = `Found project metadata for ${metadata.name}`;
    else {
      console.error(`Could not get project metadata`);
      skipped.push(`${projectId} not found`);
      continue;
    }

    const name = metadata.name;
    let found = false;

    const versions = await getProjectVersions(projectId);
    if (versions) spinner.text = `Found versions for ${name}`;
    else {
      console.error(`Could not get versions for ${name} (${projectId})`);
      skipped.push(`${name} versions not found`);
      continue;
    }

    for (const modVersion of versions) {
      const file = modVersion.files.find((f) => f.filename.endsWith(".jar"));

      if (
        modVersion.game_versions.includes(modpackVersion) &&
        modVersion.loaders.includes("fabric") &&
        file
      ) {
        spinner.text = `Downloading ${file.filename}`;

        const jar = await axios.get(file.url, {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/java-archive",
          },
        });

        const jarFilePath = path.join(modPath, file.filename);

        mods.push({
          path: jarFilePath,
          hashes: file.hashes,
          downloadUrl: file.url,
          fileSize: file.size,
        });

        if (fs.existsSync(modPath)) {
          if (!fs.existsSync(jarFilePath))
            fs.writeFileSync(jarFilePath, jar.data);
        } else {
          fs.mkdirSync(path.dirname(jarFilePath), { recursive: true });
          fs.writeFileSync(jarFilePath, jar.data);
        }

        found = true;
        break;
      }
    }

    if (!found) skipped.push(`${name} not found for ${modpackVersion}`);
  }

  spinner.text = "Making zip files";
  const zip = new JSZip();

  let modrinthIndex: ModrinthIndex = {
    formatVersion: 1,
    game: "minecraft",
    versionId: projectVersion,
    name: `Server sided ${projectVersion} for ${modpackVersion}`,
    summary: "Kitchen sink type shi",
    files: [],
    dependencies: {
      minecraft: modpackVersion,
      "fabric-loader": fabricLoaderVersion,
    },
  };

  mods.forEach((mod: ModObject) => {
    modrinthIndex.files.push({
      path: mod.path,
      hashes: mod.hashes,
      env: {
        client: "optional",
        server: "required",
      },
      downloads: [mod.downloadUrl],
      fileSize: mod.fileSize,
    });
  });

  zip.file("modrinth.index.json", JSON.stringify(modrinthIndex, null, 2));
  const zipContent = await zip.generateAsync({ type: "nodebuffer" });
  const mrpackPath = path.join(versionsPath, config.version);

  if (!fs.existsSync(mrpackPath)) fs.mkdirSync(mrpackPath, { recursive: true });

  fs.writeFileSync(
    path.join(mrpackPath, `server-sided-${modpackVersion}.mrpack`),
    zipContent
  );

  spinner.stop();
  console.log("\nDone");
  console.log("Mods skipped\n" + skipped.join("\n  "));
}

async function findCollection(userId: string, collectionId: string) {
  try {
    const res = await axios.get(
      `https://api.modrinth.com/v3/user/${userId}/collections`
    );

    return res.data.find(
      (collection: Collection) => collection.id == collectionId
    );
  } catch (err) {
    console.error(
      `Error finding collection ${collectionID} for user ${userID}`
    );

    // @ts-ignore
    if (err && err.status) console.error(err.status);
    return;
  }
}

async function getProjectMetadata(
  projectId: any
): Promise<ModMetadata | undefined> {
  try {
    const res = await axios.get(
      `https://api.modrinth.com/v3/project/${projectId}`
    );

    return res.data;
  } catch (err) {
    console.error(`Error finding project ${projectId}`);

    // @ts-ignore
    if (err && err.status) console.error(err.status);
    return;
  }
}

async function getProjectVersions(
  projectId: string
): Promise<ModVersion[] | undefined> {
  try {
    const res = await axios.get(
      `https://api.modrinth.com/v3/project/${projectId}/version`
    );

    return res.data;
  } catch (err) {
    console.error(`Error getting versions for project ${projectId}`);

    // @ts-ignore
    if (err && err.status) console.error(err.status);
    return;
  }
}
