import { Credentials, LeagueWebSocket } from "league-connect";

export interface BaseLCUHandlerOpts {
  credentials: Credentials;
  leagueWS: LeagueWebSocket;
}

export type EventName =
  | "GameStart"
  | "MinionsSpawning"
  | "FirstBrick"
  | "TurretKilled"
  | "InhibKilled"
  | "DragonKill"
  | "DragonKill"
  | "HeraldKill"
  | "BaronKill"
  | "ChampionKill"
  | "Multikill"
  | "Multikill"
  | "Multikill"
  | "Multikill"
  | "Ace";

export type LiveGameDataBaseEvent = {
  EventID: number;
  EventName: EventName;
  EventTime: number;
  KillerName?: string;
  Assisters?: string[];
  TurretKilled?: string;
  InhibKilled?: string;
  DragonType?: string;
  Stolen?: string;
  VictimName?: string;
  KillStreak?: number;
  Acer?: string;
  AcingTeam?: string;
};
