import * as path from "path";
import { getData } from "../helpers/fetchdata";
import {
  DataDragonChampionDataRequired,
  DataDragonChampionDataResponse,
} from "./types";
import { readData, writeData } from "../helpers/fsdata";

//TODO: from .env / api dunno
const CURRENT_LOL_VERSION = "13.16.1";
const championsFilePath = path.join(
  __dirname,
  `champions${CURRENT_LOL_VERSION.trim()}.json`
);

export async function getDataDragonChampions(): Promise<DataDragonChampionDataResponse> {
  const championsResponse = await getData(
    `http://ddragon.leagueoflegends.com/cdn/${CURRENT_LOL_VERSION.trim()}/data/en_US/champion.json`
  );

  return championsResponse as DataDragonChampionDataResponse;
}

export function writeDragonChampionsData(
  value: DataDragonChampionDataRequired
) {
  writeData<DataDragonChampionDataRequired>(championsFilePath, value);
}

export function readDragonChampionsData() {
  return readData<DataDragonChampionDataRequired>(championsFilePath);
}
