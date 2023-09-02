import * as fs from "fs";

export function readData<T = unknown>(path: string): T {
  try {
    const data = fs.readFileSync(path, "utf-8");
    return JSON.parse(data) as T;
  } catch (error) {
    return {} as T;
  }
}

export function writeData<T = unknown>(path: string, data: T): void {
  try {
    fs.writeFileSync(path, JSON.stringify(data), "utf-8");
  } catch (error) {}
}

export function dataFileExists(path: string): boolean {
  return fs.existsSync(path);
}
