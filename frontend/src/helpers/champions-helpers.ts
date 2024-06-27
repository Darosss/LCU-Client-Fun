import {
  ChampionData,
  DataDragonChampionsJsonFileData,
  TeamChampSelectSessionData,
  isBannedOrPickedChamp
} from "@/shared";

export function isChampionInChampionDataArray(
  availableChamps: ChampionData[],
  championId: number
) {
  return availableChamps.some((x) => x.id === championId);
}

export function findAvailableChampionForAutoPick(
  champions: DataDragonChampionsJsonFileData[],
  team: TeamChampSelectSessionData[],
  bans: number[],
  summonerChampions: ChampionData[]
) {
  let foundChampionId: number | null = null;
  let priorityIdx = 0;
  while (!foundChampionId && champions.length > priorityIdx) {
    if (champions.length > 0) {
      const champion = champions[priorityIdx];

      const isNotBannedOrNotPicked = !isBannedOrPickedChamp(
        champion.id,
        team,
        bans
      );
      const canLocalSummonerPlayThisChamp = isChampionInChampionDataArray(
        summonerChampions,
        champion.id
      );
      if (canLocalSummonerPlayThisChamp && isNotBannedOrNotPicked) {
        foundChampionId = champion.id;
        break;
      }
      priorityIdx++;
    } else {
      priorityIdx++;
    }
  }

  return foundChampionId;
}
