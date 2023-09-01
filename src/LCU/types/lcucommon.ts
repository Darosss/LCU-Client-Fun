import { DataDragonChampionsJsonFileData } from "./champions";
import { AssignedPosition } from "./champselect";
import { DataDragonSpellsJsonFileData } from "./spells";

export interface EligibileLobby {
  eligible: boolean;
  queueId: number;
  restrictions: any;
}

export type EligibileLobbyAndQueueData = Partial<EligibileLobby> &
  Partial<QueueData>;

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
  | "GameStart"
  | "Reconnect"
  | "WaitingForStats"
  | "TerminatedInError"
  | "Lobby"
  | "None";

export interface ClientOptions {
  autoAccept: boolean;
  minSize: { width: number; height: number };
  autoPickChamps: {
    [position in AssignedPosition]: DataDragonChampionsJsonFileData[];
  };
  autoPickChamp: boolean;
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
  localMember: LobbyMember;
  members: LobbyMember[];
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
  customTeam100: LobbyMember[];
  customTeam200: LobbyMember[];
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

export interface LobbyMember {
  allowedChangeActivity: boolean;
  allowedInviteOthers: boolean;
  allowedKickOthers: boolean;
  allowedStartActivity: boolean;
  allowedToggleInvite: boolean;
  autoFillEligible: boolean;
  autoFillProtectedForPromos: boolean;
  autoFillProtectedForSoloing: boolean;
  autoFillProtectedForStreaking: boolean;
  botChampionId: number;
  botDifficulty: string;
  botId: string;
  firstPositionPreference: PositionsPreferences;
  isBot: boolean;
  isLeader: boolean;
  isSpectator: boolean;
  playerSlots: [];
  puuid: string;
  ready: true;
  secondPositionPreference: PositionsPreferences;
  showGhostedBanner: boolean;
  summonerIconId: number;
  summonerId: number;
  summonerInternalName: string;
  summonerLevel: number;
  summonerName: string;
  teamId: number;
}

export interface AllRequiredDataDragon {
  dataDragonChampions: DataDragonChampionsJsonFileData[];
  dataDragonSpells: DataDragonSpellsJsonFileData[];
}

export enum PositionsPreferences {
  TOP = "TOP",
  JUNGLE = "JUNGLE",
  MIDDLE = "MIDDLE",
  BOTTOM = "BOTTOM",
  UTILITY = "UTILITY",
  FILL = "FILL",
  UNSELECTED = "UNSELECTED",
}

export interface ChangePositionPreferenceBody {
  firstPreference: PositionsPreferences;
  secondPreference: PositionsPreferences;
}
