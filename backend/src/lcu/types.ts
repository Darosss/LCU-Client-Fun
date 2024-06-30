import { Credentials, LeagueWebSocket } from "league-connect";

export interface BaseLCUHandlerOpts {
  credentials: Credentials;
  leagueWS: LeagueWebSocket;
}
