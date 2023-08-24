export interface EligibileLobby {
  eligible: boolean;
  queueId: number;
  restrictions: any;
}

export interface QueueData {
  queueId: number;
  map: string;
  description: null | string;
  notes: null | string;
}

export type GameFlowPhaseData =
  | "ReadyCheck"
  | "ChampSelect"
  | "InProgress"
  | "Matchmaking"
  | "Lobby"
  | "None";

export interface ClientOptions {
  autoAccept: boolean;
}

export interface CurrentSummonerData {
  accountId: number;
  displayName: string;
  gameName: string;
  internalName: string;
  nameChangeFlag: false;
  percentCompleteForNextLevel: number;
  privacy: string;
  profileIconId: number;
  puuid: string;
  rerollPoints: {
    currentPoints: number;
    maxRolls: number;
    numberOfRolls: number;
    pointsCostToRoll: number;
    pointsToReroll: number;
  };
  summonerId: number;
  summonerLevel: number;
  tagLine: string;
  unnamed: false;
  xpSinceLastLevel: number;
  xpUntilNextLevel: number;
}

export interface LobbyGameDataResponse {
  canStartActivity: boolean;
  gameConfig: LobbyGameConfig;
  //TODO: change any in needed / required data
  invitations: any;
  localMember: any;
  members: any;
  mucJwtDto: any;
  multiUserChatId: any;
  multiUserChatPassword: any;
  partyId: any;
  partyType: any;
  restrictions: any;
  scarcePositions: any;
  warnings: any;
}

export interface LobbyGameConfig {
  allowablePremadeSizes: number[];
  customLobbyName: string;
  customMutatorName: string;
  customRewardsDisabledReasons: [];
  customSpectatorPolicy: string;
  customSpectators: [];
  customTeam100: [];
  customTeam200: [];
  gameMode: string;
  isCustom: boolean;
  isLobbyFull: boolean;
  isTeamBuilderManaged: boolean;
  mapId: number;
  maxHumanPlayers: number;
  maxLobbySize: number;
  maxTeamSize: number;
  pickType: string;
  premadeSizeAllowed: boolean;
  queueId: number;
  shouldForceScarcePositionSelection: boolean;
  showPositionSelector: boolean;
  showQuickPlaySlotSelection: boolean;
}
