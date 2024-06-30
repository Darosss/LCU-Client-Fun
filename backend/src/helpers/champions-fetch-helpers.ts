import {
  DataDragonChampionDataResponse,
  DataDragonChampionsJsonFileData
} from "@/shared";
import {
  fetchDataByUrl,
  dataFileExists,
  readData,
  writeData,
  downloadPng,
  createFolder
} from "./";

import {
  BASE_RAW_COMMUNITY_DRAGON_GAME_DATA,
  CURRENT_LOL_VERSION,
  ddragonLeagueOfLegendsBaseLink
} from "@/globals";

const basePathChampionIcons = `/lol-game-data/assets/v1/champion-icons`;

const championsFilePath = `champions${CURRENT_LOL_VERSION.trim()}.json`;

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
        idName: value.id
      });
    }

    writeDragonChampionsData(dragonChampsData);

    //download all jpg champ select icons
    //https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/

    if (!dataFileExists(basePathChampionIcons)) {
      createFolder(basePathChampionIcons);
    }
    dragonChampsData.forEach(async (champ) => {
      const url = `${BASE_RAW_COMMUNITY_DRAGON_GAME_DATA}/v1/champion-icons/${champ.id}.png`;
      const outputPath = `${basePathChampionIcons}/${champ.id}.png`;

      downloadPng(url, outputPath);
    });

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
