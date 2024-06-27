import {
  DataDragonChampionsJsonFileData,
  DataDragonSpellsJsonFileData
} from "@/shared";

export function findSummonerSpellById(
  data: DataDragonSpellsJsonFileData[],
  spellId: number
) {
  return data.find(({ id }) => id === spellId)?.name || "";
}

export function findChampionById(
  data: DataDragonChampionsJsonFileData[],
  championId: number
) {
  return data.find(({ id }) => id === championId);
}
