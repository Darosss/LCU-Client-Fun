export interface ChampSelectSessionDataRequired {
  myTeam: TeamChampSelectSessionData[];
  theirTeam: TeamChampSelectSessionData[];
  actions: ActionsChampSelectSessionData[][];
  bans: ChampSelectSessionDataBans;
  localPlayerCellId: number;
}

export interface ChampSelectSessionDataBans {
  myTeamBans: number[];
  theirTeamBans: number[];
  numBans: number;
}

export interface ChampSelectSessionDataRequiredWithActionsFlat
  extends Omit<ChampSelectSessionDataRequired, "actions"> {
  actions: {
    pickActions: ActionsChampSelectSessionData[];
    banActions: ActionsChampSelectSessionData[];
  };
}

export interface TeamChampSelectSessionData {
  assignedPosition: AssignedPosition | null;
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
  | "jungle"
  | "other";

export interface ChampSelectActionParams {
  championId: number;
  actionId: number;
  completed?: boolean;
}

export interface ChampSelectSummonerData {
  actingBackgroundAnimationState:
    | "not-acting-background"
    | "is-acting-background"
    | "";
  activeActionType: "pick" | "ban" | "";
  areSummonerActionsComplete: false;
  assignedPosition: AssignedPosition;
  banIntentSquarePortratPath: string;
  cellId: number;
  championIconStyle: string;
  championId: number;
  championName: string;
  currentChampionVotePercentInteger: number;
  entitledFeatureType: string;
  isActingNow: boolean;
  isDonePicking: boolean;
  isOnPlayersTeam: boolean;
  isPickIntenting: boolean;
  isPlaceholder: boolean;
  isSelf: boolean;
  nameVisibilityType: "VISIBLE" | "HIDDEN" | "";
  obfuscatedPuuid: string;
  obfuscatedSummonerId: number;
  pickSnipedClass: string;
  puuid: string;
  shouldShowActingBar: boolean;
  shouldShowBanIntentIcon: boolean;
  shouldShowExpanded: boolean;
  shouldShowRingAnimations: boolean;
  shouldShowSelectedSkin: boolean;
  shouldShowSpells: boolean;
  showMuted: boolean;
  showSwaps: boolean;
  showTrades: boolean;
  skinId: number;
  skinSplashPath: string;
  slotId: number;
  spell1IconPath: string;
  spell2IconPath: string;
  statusMessageKey: string;
  summonerId: number;
  swapId: number;
  tradeId: number;
}

export type GetChampionsIdsForChampSelectActions =
  | "disabled-champion-ids"
  | "pickable-champion-ids"
  | "bannable-champion-ids";

export type GetAvailableChampionsIdsForChampSelectType = {
  bannable: number[];
  pickable: number[];
  disabled: number[];
};
