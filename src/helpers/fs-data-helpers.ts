import * as fs from "fs";

export function readData<T = unknown>(path: string): T {
  try {
    const data = fs.readFileSync(`${__dirname}\\${path}`, "utf-8");
    return JSON.parse(data) as T;
  } catch (error) {
    return {} as T;
  }
}

export function writeData<T = unknown>(path: string, data: T): void {
  try {
    fs.writeFileSync(`${__dirname}\\${path}`, JSON.stringify(data), "utf-8");
  } catch (error) {}
}

export function createFolder(folderPath: string): void {
  try {
    fs.mkdirSync(`${__dirname}\\${folderPath}`, { recursive: true });
  } catch (error) {
    console.error(`Error creating folder at ${folderPath}: ${error}`);
  }
}

export function dataFileExists(path: string): boolean {
  return fs.existsSync(`${__dirname}/${path}`);
}
