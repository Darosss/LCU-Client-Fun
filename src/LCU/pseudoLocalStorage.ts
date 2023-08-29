import * as path from "path";
import { ClientOptions } from "./types";
import { dataFileExists, readData, writeData } from "../helpers/fsdata";

const dataFilePath = path.join(__dirname, "localstorage.json");

if (!dataFileExists(dataFilePath)) {
  const defaultData: ClientOptions = {
    autoAccept: true,
    minSize: { width: 1024, height: 768 },
  };
  writeData<ClientOptions>(dataFilePath, defaultData);
}

export function writeLocalStorageData(value: ClientOptions) {
  writeData<ClientOptions>(dataFilePath, value);
}

export function readLocalStorageData() {
  return readData<ClientOptions>(dataFilePath);
}
