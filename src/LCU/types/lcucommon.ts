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
