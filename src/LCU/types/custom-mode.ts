export enum BotDifficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
}

export enum TeamsIds {
  first = "100",
  second = "200",
}

export interface ChampionBotsData {
  active: boolean;
  botDifficulties: [BotDifficulty.EASY, BotDifficulty.MEDIUM];
  id: number;
  name: string;
}

export interface AddBotToLobbyBody {
  botDifficulty: BotDifficulty;
  championId: number;
  teamId: TeamsIds;
}

export interface ManageBotInCustomLobbyOpts {
  teamId: TeamsIds;
  botName: string;
}

export type SwitchTeamParam = "one" | "two";

export type ManagePlayerInLobbyActions =
  | "kick"
  | "revoke-invite"
  | "grant-invite";

export interface ManagePlayerInLobbyOpts {
  managePlayerId: number;
  action: ManagePlayerInLobbyActions;
}

export enum CustomTeamIds {
  one = 100,
  two = 200,
}
