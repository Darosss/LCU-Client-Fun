import { TeamChampSelectSessionData } from "../lcu-types/champ-select.types";

export function isBannedOrPickedChamp(
  championId: number,
  team: TeamChampSelectSessionData[],
  bans: number[]
) {
  const isAlreadyPicked = team.some((team) => team.championId === championId);
  const isAlreadyBanned = bans.some((id) => id === championId);

  return isAlreadyBanned || isAlreadyPicked;
}
