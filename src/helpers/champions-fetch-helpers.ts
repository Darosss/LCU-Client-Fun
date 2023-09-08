import * as path from "path";
import { fetchDataByUrl, dataFileExists, readData, writeData } from "./";
import type {
  DataDragonChampionDataResponse,
  DataDragonChampionsJsonFileData,
} from "@lcu";
import { CURRENT_LOL_VERSION, ddragonLeagueOfLegendsBaseLink } from "@globals";

const championsFilePath = path.join(
  __dirname,
  `champions${CURRENT_LOL_VERSION.trim()}.json`
);

export async function getDataDragonChampions(): Promise<DataDragonChampionDataResponse> {
  const championsResponse = await fetchDataByUrl(
    ddragonLeagueOfLegendsBaseLink("champion.json")
  );

  return championsResponse as DataDragonChampionDataResponse;
}

export function writeDragonChampionsData(
  value: DataDragonChampionsJsonFileData[]
) {
  writeData<DataDragonChampionsJsonFileData[]>(championsFilePath, value);
}

async function ifDataDragonChampsDoesNotExist() {
  if (!dataFileExists(championsFilePath)) {
    const dragonChampsData: DataDragonChampionsJsonFileData[] = [];
    const { data: responseData } = await getDataDragonChampions();
    for (const [, value] of Object.entries(responseData)) {
      dragonChampsData.push({
        name: value.name,
        id: parseInt(value.key, 10),
        idName: value.id,
      });
    }

    writeDragonChampionsData(dragonChampsData);

    return true;
  }
}

const readedDragonChampionsData =
  readData<DataDragonChampionsJsonFileData[]>(championsFilePath);

export const dragonChampionsData =
  Object.keys(readedDragonChampionsData).length === 0
    ? []
    : readedDragonChampionsData;

(async () => {
  const didntExist = await ifDataDragonChampsDoesNotExist();
  if (!didntExist) return;
  dragonChampionsData.splice(0, dragonChampionsData.length);
  //in case when file does not exist
  const newData =
    readData<DataDragonChampionsJsonFileData[]>(championsFilePath);
  dragonChampionsData.push(...newData);
})();
