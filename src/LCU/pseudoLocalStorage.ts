import * as fs from "fs";
import * as path from "path";
import { ClientOptions } from "./types";

const dataFilePath = path.join(__dirname, "localstorage.json");

export function readData(): ClientOptions {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data) as ClientOptions;
  } catch (error) {
    return {} as ClientOptions;
  }
}

export function writeData(data: ClientOptions): void {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data), "utf-8");
  } catch (error) {}
}

function dataFileExists(): boolean {
  console.log("run?");
  return fs.existsSync(dataFilePath);
}

if (!dataFileExists()) {
  const defaultData: ClientOptions = {
    autoAccept: true,
  };
  writeData(defaultData);
}
