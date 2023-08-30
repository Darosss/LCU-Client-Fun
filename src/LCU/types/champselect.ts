export interface ChampSelectSessionDataRequired {
  myTeam: TeamChampSelectSessionData[];
  theirTeam: TeamChampSelectSessionData[];
  actions: ActionsChampSelectSessionData[][];
  bans: ChampSelectSessionDataBans;
  localPlayerCellId: number;
}

interface ChampSelectSessionDataBans {
  myTeamBans: number[];
  theirTeamBans: number[];
  numBans: number;
}

export interface ChampSelectSessionDataRequiredWithActionsFlat
  extends Omit<ChampSelectSessionDataRequired, "actions"> {
  actions: ActionsChampSelectSessionData[];
}

export interface TeamChampSelectSessionData {
  assignedPosition: string | null;
  cellId: number;
  championId: number;
  championPickIntent: number;
  entitledFeatureType: string | null;
  nameVisibilityType: string | null;
  obfuscatedPuuid: string | null;
  obfuscatedSummonerId: number;
  puuid: string | null;
  selectedSkinId: number;
  spell1Id: number;
  spell2Id: number;
  summonerId: number;
  team: number;
  wardSkinId: number;
}

export interface ActionsChampSelectSessionData {
  actorCellId: number;
  championId: number;
  completed: boolean;
  id: number;
  isAllyAction: boolean;
  isInProgress: boolean;
  pickTurn: number;
  type: string;
}

export interface ChampSelectActionBody {
  championId: number;
  completed?: boolean;
}

export interface ChangeSummonersSpellsBody {
  spell1Id?: number;
  spell2Id?: number;
}

export interface ChampSelectSessionTimerResponse {
  adjustedTimeLeftInPhase: number;
  internalNowInEpochMs: number;
  isInfinite: boolean;
  phase: string;
  totalTimeInPhase: number;
}

export type AssignedPosition =
  | "utility"
  | "middle"
  | "top"
  | "bottom"
  | "jungle";
