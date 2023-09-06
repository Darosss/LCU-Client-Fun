import {
  DataDragonChampionsJsonFileData,
  AssignedPosition,
  DataDragonSpellsJsonFileData,
} from "./";

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
  //FIXME: boolean
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
  //FIXME: boolean
  unnamed: false;
  xpSinceLastLevel: number;
  xpUntilNextLevel: number;
}

export interface LobbyGameDataResponse {
  canStartActivity: boolean;
  gameConfig: LobbyGameConfig;
  //TODO: change any in needed / required data
  invitations: LobbyInvitationData[];
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

export interface LobbyInvitationData {
  invitationId?: string;
  invitationType?: unknown;
  state: InvitationState;
  timestamp: number;
  toSummonerId: number;
  toSummonerName: string;
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
  // FIXME: boolean
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

export interface FriendsListData {
  availability: string;
  displayGroupId: number;
  displayGroupName: string;
  gameName: string;
  gameTag: string;
  groupId: number;
  groupName: string;
  icon: number;
  id: string;
  isP2PConversationMuted: boolean;
  lastSeenOnlineTimestamp: number | null;
  lol: FriendListLOL;
  name: string;
  note: string;
  patchline: string;
  pid: string;
  platformId: string;
  product: string;
  productName: string;
  puuid: string;
  statusMessage: string;
  summary: string;
  summonerId: number;
  time: number;
}

interface FriendListLOL {
  bannerIdSelected: string;
  challengeCrystalLevel: string;
  challengePoints: number;
  challengeTitleSelected: string;
  challengeTokensSelected: string;
  championId: string;
  companionId: number;
  damageSkinId: number;
  gameId: number;
  gameMode: string;
  gameQueueType: string;
  gameStatus: string;
  iconOverride: string;
  initRankStat: number;
  isObservable: string;
  level: number;
  mapId: string;
  mapSkinId: number;
  masteryScore: number;
  profileIcon: number;
  pty: string;
  puuid: string;
  queueId: number;
  regalia: string;
  skinVariant: string;
  skinname: string;
  timeStamp: number;
}

export interface ConversationMessagesData {
  body: string;
  fromId: string;
  fromObfuscatedSummonerId: number;
  fromPid: string;
  fromSummonerId: number;
  id: string;
  isHistorical: boolean;
  timestamp: string;
  type: "system" | "chat";
}

export interface InvitePlayerToLobbyBody {
  toSummonerId: number;
}

export interface ReceivedInvitationData {
  canAcceptInvitation: boolean;
  fromSummonerId: number;
  fromSummonerName: string;
  gameConfig: {
    gameMode: string;
    inviteGameType: string;
    mapId: number;
    queueId: number;
  };
  invitationId: string;
  restrictions: [
    {
      expiredTimestamp: number;
      restrictionArgs: unknown;
      restrictionCode: string;
      summonerIds: number[];
      summonerIdsString: string;
    }
  ];
  state: InvitationState;
  timestamp: string;
}

export type ManageInvitationAction = "accept" | "decline";

export type InvitationState = "Requested" | "Declined" | "Pending" | "Accepted";
