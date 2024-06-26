import { DataDragonChampionsJsonFileData, AssignedPosition } from ".";

export interface RPCLCUResponse {
  errorCode: string;
  httpStatus: number;
  implementationDetails: any;
  message: string;
}

export interface BaseLCUHandlerWsOnParams<T = unknown> {
  path: string;
  cb: (error: unknown | null, data: T | null) => void;
}

export interface ClientOptions {
  autoAccept: boolean;
  autoPickChamps: {
    [position in AssignedPosition]: DataDragonChampionsJsonFileData[];
  };
  autoPickChamp: boolean;
  preventRiotClientToTurnOn: boolean;
  runes: RunesOptions;
  championSelect: ChampionSelectOptions;
}

export interface RunesOptions {
  swapSpells: boolean;
  changeSpells: boolean;
}

interface ChampionSelectOptions {
  showImages: boolean;
}
export interface CurrentSummonerData {
  accountId: number;
  displayName: string;
  gameName: string;
  internalName: string;
  nameChangeFlag: boolean;
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
  unnamed: boolean;
  xpSinceLastLevel: number;
  xpUntilNextLevel: number;
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
