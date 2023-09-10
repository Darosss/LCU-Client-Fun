import * as path from "path";
import type { ClientOptions } from "./";
import { dataFileExists, readData, writeData } from "@helpers";

const dataFilePath = path.join(__dirname, "localstorage.json");

if (!dataFileExists(dataFilePath)) {
  const defaultData: ClientOptions = {
    autoAccept: true,
    minSize: { width: 1024, height: 768 },
    autoPickChamps: {
      utility: [],
      middle: [],
      top: [],
      bottom: [],
      jungle: [],
      other: [],
    },
    autoPickChamp: false,
    preventRiotClientToTurnOn: true,
  };
  writeData<ClientOptions>(dataFilePath, defaultData);
}

export function writeLocalStorageData(value: ClientOptions) {
  writeData<ClientOptions>(dataFilePath, value);
}

export function readLocalStorageData() {
  return readData<ClientOptions>(dataFilePath);
}
