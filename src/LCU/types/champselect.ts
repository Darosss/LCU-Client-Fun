export interface ChampSelectSessionDataRequired {
  myTeam: MyTeamChampSelectSessionData[];
  actions: ActionsChampSelectSessionData[][];
}

export interface MyTeamChampSelectSessionData {
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
