import { CURRENT_LOL_VERSION, ddragonLeagueOfLegendsBaseLink } from "@/globals";
import { fetchDataByUrl, writeData, dataFileExists, readData } from "./";
import {
  DataDragonSpellsDataResponse,
  DataDragonSpellsJsonFileData
} from "@/shared";

const spellsFilePath = `spells${CURRENT_LOL_VERSION.trim()}.json`;

export async function getDataDragonSpells(): Promise<DataDragonSpellsDataResponse> {
  const spellsResponse = await fetchDataByUrl(
    ddragonLeagueOfLegendsBaseLink("summoner.json")
  );

  return spellsResponse as DataDragonSpellsDataResponse;
}

export function writeDragonSpellsData(value: DataDragonSpellsJsonFileData[]) {
  writeData<DataDragonSpellsJsonFileData[]>(spellsFilePath, value);
}

async function ifDataDragonSpellsDoesNotExist() {
  if (!dataFileExists(spellsFilePath)) {
    const spellsDragonData: DataDragonSpellsJsonFileData[] = [];
    const { data: responseData } = await getDataDragonSpells();
    for (const [, value] of Object.entries(responseData)) {
      spellsDragonData.push({
        name: value.name,
        id: parseInt(value.key, 10),
        modes: value.modes,
        summonerLevel: value.summonerLevel
      });
    }

    writeDragonSpellsData(spellsDragonData);
    return true;
  }
}

const readedDragonSpellsData =
  readData<DataDragonSpellsJsonFileData[]>(spellsFilePath);

export const dragonSpellsData =
  Object.keys(readedDragonSpellsData).length === 0
    ? []
    : readedDragonSpellsData;

(async () => {
  const didntExist = await ifDataDragonSpellsDoesNotExist();
  if (!didntExist) return;

  dragonSpellsData.splice(0, dragonSpellsData.length);
  //in case when file does not exist
  const newData = readData<DataDragonSpellsJsonFileData[]>(spellsFilePath);
  dragonSpellsData.push(...newData);
})();
