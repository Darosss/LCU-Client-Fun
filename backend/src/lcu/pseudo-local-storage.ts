import { dataFileExists, readData, writeData } from "@/helpers";
import { ClientOptions, configsDefaults } from "@/shared";

const dataFilePath = "localstorage.json";
if (!dataFileExists(dataFilePath)) {
  writeData<ClientOptions>(dataFilePath, configsDefaults);
}

export function updateLocalStorageData(value: Partial<ClientOptions>) {
  const previousData = readLocalStorageData();
  writeData<ClientOptions>(dataFilePath, { ...previousData, ...value });
}

export function writeLocalStorageData(value: ClientOptions) {
  writeData<ClientOptions>(dataFilePath, value);
}

export function readLocalStorageData() {
  return readData<ClientOptions>(dataFilePath);
}
