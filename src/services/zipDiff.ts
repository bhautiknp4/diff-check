import JSZip from "jszip";
import { diffLines, createTwoFilesPatch } from "diff";

export type FileEntry = {
  path: string;
  isDir: boolean;
  content?: string; // Only for text files
};

export type DiffResult = {
  added: string[];
  removed: string[];
  modified: string[];
  unchanged: string[];
  diffs: Record<string, string>; // path -> unified diff for modified files
};

const TEXT_FILE_EXTENSIONS = [
  ".txt",
  ".md",
  ".json",
  ".html",
  ".js",
  ".ts",
  ".css",
  ".tsx",
  ".jsx",
];

function normalizePath(path: string): string {
  // Replace backslashes with forward slashes and remove leading/trailing slashes
  return path
    .replace(/\\/g, "/")
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase();
}

function isTextFile(filename: string): boolean {
  const lowerFilename = filename.toLowerCase();
  return TEXT_FILE_EXTENSIONS.some((ext) => lowerFilename.endsWith(ext));
}

export async function extractZipEntries(
  file: File | Buffer
): Promise<FileEntry[]> {
  try {
    const zip = await JSZip.loadAsync(file);
    const entries: FileEntry[] = [];

    for (const [path, entry] of Object.entries(zip.files)) {
      try {
        const normalizedPath = normalizePath(path);
        if (entry.dir) {
          entries.push({ path: normalizedPath, isDir: true });
        } else {
          let content: string | undefined = undefined;
          if (isTextFile(normalizedPath)) {
            content = await entry.async("text");
          }
          entries.push({ path: normalizedPath, isDir: false, content });
        }
      } catch (error) {
        console.warn(`Failed to process file ${path}:`, error);
      }
    }

    return entries;
  } catch (error) {
    throw new Error(
      `Failed to load ZIP file: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export function compareZipEntries(
  left: FileEntry[],
  right: FileEntry[]
): DiffResult {
  // Create maps with normalized paths
  const leftMap = new Map(left.map((f) => [f.path, f]));
  const rightMap = new Map(right.map((f) => [f.path, f]));

  const added: string[] = [];
  const removed: string[] = [];
  const modified: string[] = [];
  const unchanged: string[] = [];
  const diffs: Record<string, string> = {};

  // Debugging: Log all paths to verify normalization
  console.log("Left ZIP paths:", Array.from(leftMap.keys()));
  console.log("Right ZIP paths:", Array.from(rightMap.keys()));

  // Compare files from right (new) ZIP
  for (const [path, rightEntry] of rightMap.entries()) {
    if (!leftMap.has(path)) {
      if (rightEntry.isDir) {
        added.push(path); // Track added directories
      } else if (isTextFile(path)) {
        added.push(path);
      }
    } else {
      const leftEntry = leftMap.get(path)!;
      if (leftEntry.isDir !== rightEntry.isDir) {
        // Type changed (file <-> directory)
        if (isTextFile(path)) {
          modified.push(path);
          diffs[path] = createTwoFilesPatch(
            path,
            path,
            leftEntry.content || "",
            rightEntry.content || "",
            "ZIP 1",
            "ZIP 2"
          );
        }
      } else if (!leftEntry.isDir && isTextFile(path)) {
        if (leftEntry.content !== rightEntry.content) {
          modified.push(path);
          diffs[path] = createTwoFilesPatch(
            path,
            path,
            leftEntry.content || "",
            rightEntry.content || "",
            "ZIP 1",
            "ZIP 2"
          );
        } else {
          unchanged.push(path);
        }
      }
    }
  }

  // Check for removed files or directories
  for (const [path, leftEntry] of leftMap.entries()) {
    if (!rightMap.has(path)) {
      if (leftEntry.isDir || isTextFile(path)) {
        removed.push(path);
      }
    }
  }

  return { added, removed, modified, unchanged, diffs };
}
