import {
  Credentials,
  LeagueWebSocket,
  authenticate,
  createWebSocketConnection,
} from "league-connect";
import { LobbyLCUHandler } from "./lobby-lcu-handler";
import { HeadLCUHandler } from "./head-lcu-handler";
import { ChampSelectLCUHandler } from "./champ-select-lcu-handler";
import { SocialLCUHandler } from "./social-lcu-handler";

class LCUHandlersFactory {
  private credentials?: Credentials;
  private leagueWs?: LeagueWebSocket;
  private fullInitialized: boolean = false;

  public async initialize() {
    await this.initializeCredentials();
    await this.initLeagueWS();

    this.fullInitialized = true;
  }

  public async refresh() {
    this.fullInitialized = false;
    this.resetAllWsSubscriptions();

    await this.initialize();
  }

  private resetAllWsSubscriptions() {
    const currentSubscriptions = this.leagueWs?.subscriptions;
    [...(currentSubscriptions?.keys() || [])].forEach((key) =>
      this.leagueWs?.unsubscribe(key)
    );
  }

  getFullInitialized() {
    return this.fullInitialized;
  }

  private async initializeCredentials() {
    this.credentials = await authenticate({
      awaitConnection: true,
      pollInterval: 5000,
    });
  }

  private async initLeagueWS() {
    this.leagueWs = await createWebSocketConnection({
      authenticationOptions: {
        awaitConnection: true,
      },
      pollInterval: 1000,
      maxRetries: 10,
    });
  }

  public createLobbyHandler() {
    return new LobbyLCUHandler({
      credentials: this.credentials!,
      leagueWS: this.leagueWs!,
    });
  }

  public createHeadHandler() {
    return new HeadLCUHandler({
      credentials: this.credentials!,
      leagueWS: this.leagueWs!,
    });
  }

  public createChampSelectHandler() {
    return new ChampSelectLCUHandler({
      credentials: this.credentials!,
      leagueWS: this.leagueWs!,
    });
  }

  public createSocialHandler() {
    return new SocialLCUHandler({
      credentials: this.credentials!,
      leagueWS: this.leagueWs!,
    });
  }
}

export const lcuHandlerFactory = new LCUHandlersFactory();
