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

type AvailableCustomLobbyGameModes = "PRACTICETOOL" | "CLASSIC";

/**
 *- 11 - Summoners Rift
 *- 12 - Howling Abys (ARAM)
 */
type AvailableCustomLobbyMapsIds = 11 | 12;

/**
 *- 1 - Blind
 *- 2 - Draft
 *- 4 - All random
 *- 6 - Tournament
 */
type AvailableCustomLobbyMutators = 1 | 2 | 4 | 6;

type AvailableCustomLobbyTeamSize = 1 | 2 | 3 | 4 | 5;

type AvailableCustomLobbySpectatorPolicy =
  | "LobbyAllowed"
  | "AllAllowed"
  | "NotAllowed"
  | "FriendsAllowed";

export interface CreateCustomLobbyOpts {
  gameMode: AvailableCustomLobbyGameModes;
  mapId: AvailableCustomLobbyMapsIds;
  mutators: { id: AvailableCustomLobbyMutators };
  teamSize: AvailableCustomLobbyTeamSize;
  specatatorPolicy: AvailableCustomLobbySpectatorPolicy;
  name?: string;
  password?: string | null;
}
