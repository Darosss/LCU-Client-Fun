import * as fs from "fs";
import path from "path";
import { FOLDER_PATH_DOWNLOADED_CONTENT } from "@/globals";

(() => {
  if (fs.existsSync(FOLDER_PATH_DOWNLOADED_CONTENT)) return;

  fs.mkdirSync(FOLDER_PATH_DOWNLOADED_CONTENT);
})();

export function readData<T = unknown>(fileName: string): T {
  try {
    const data = fs.readFileSync(
      path.join(FOLDER_PATH_DOWNLOADED_CONTENT, fileName),
      "utf-8"
    );
    return JSON.parse(data) as T;
  } catch (error) {
    return {} as T;
  }
}

export function writeData<T = unknown>(fileName: string, data: T): void {
  try {
    fs.writeFileSync(
      path.join(FOLDER_PATH_DOWNLOADED_CONTENT, fileName),
      JSON.stringify(data),
      "utf-8"
    );
  } catch (error) {}
}

export function createFolder(folderPath: string): void {
  try {
    fs.mkdirSync(path.join(FOLDER_PATH_DOWNLOADED_CONTENT, folderPath), {
      recursive: true
    });
  } catch (error) {
    console.error(`Error creating folder at ${folderPath}: ${error}`);
  }
}

export function dataFileExists(fileName: string): boolean {
  return fs.existsSync(path.join(FOLDER_PATH_DOWNLOADED_CONTENT, fileName));
}
