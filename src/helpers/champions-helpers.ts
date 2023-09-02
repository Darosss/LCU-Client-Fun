import {
  ChampionData,
  DataDragonChampionsJsonFileData,
  TeamChampSelectSessionData,
} from "@lcu";

export function isBannedOrPickedChamp(
  championId: number,
  team: TeamChampSelectSessionData[],
  bans: number[]
) {
  const isAlreadyPicked = team.some((team) => team.championId === championId);
  const isAlreadyBanned = bans.some((id) => id === championId);

  return isAlreadyBanned || isAlreadyPicked;
}

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
