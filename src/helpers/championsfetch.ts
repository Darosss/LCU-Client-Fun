import * as path from "path";
import { getData } from "../helpers/fetchdata";
import {
  DataDragonChampionDataResponse,
  DataDragonChampionsJsonFileData,
} from "../LCU/types";
import { dataFileExists, readData, writeData } from "../helpers/fsdata";
import {
  CURRENT_LOL_VERSION,
  ddragonLeagueOfLegendsBaseLink,
} from "../globals";

const championsFilePath = path.join(
  __dirname,
  `champions${CURRENT_LOL_VERSION.trim()}.json`
);

export async function getDataDragonChampions(): Promise<DataDragonChampionDataResponse> {
  const championsResponse = await getData(
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
  }
}

export async function readDragonChampionsData() {
  await ifDataDragonChampsDoesNotExist();

  return readData<DataDragonChampionsJsonFileData[]>(championsFilePath);
}
