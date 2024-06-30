import {
  Credentials,
  LeagueWebSocket,
  authenticate,
  createWebSocketConnection
} from "league-connect";
import { LobbyLCUHandler } from "./lobby-lcu-handler";
import { HeadLCUHandler } from "./head-lcu-handler";
import { ChampSelectLCUHandler } from "./champ-select-lcu-handler";
import { SocialLCUHandler } from "./social-lcu-handler";
import { SocketHandler } from "../socket";
import { readLocalStorageData } from "./pseudo-local-storage";

class LCUHandlersFactory {
  private credentials?: Credentials;
  private leagueWs?: LeagueWebSocket;
  private fullInitialized: boolean = false;
  private lobbyHandler: LobbyLCUHandler | null = null;
  private headHandler: HeadLCUHandler | null = null;
  private championSelectHandler: ChampSelectLCUHandler | null = null;
  private socialHandler: SocialLCUHandler | null = null;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    this.fullInitialized = false;
    await this.initializeCredentials();
    await this.initLeagueWS();

    this.lobbyHandler = this.createLobbyHandler();

    this.headHandler = this.createHeadHandler();
    this.championSelectHandler = this.createChampSelectHandler();

    if (readLocalStorageData().preventRiotClientToTurnOn)
      this.headHandler.preventClientUXToTurnOn();
    else this.headHandler.unsusbcribePreventClientUXToTurnOn();

    this.socialHandler = this.createSocialHandler();

    const socketIOInstance = SocketHandler.getInstance().getIO();

    socketIOInstance.emit("forceRefresh");

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

  private async initializeCredentials() {
    this.credentials = await authenticate({
      awaitConnection: true,
      pollInterval: 5000
    });
  }

  public getFullInitialized() {
    return this.fullInitialized;
  }

  private async initLeagueWS() {
    this.leagueWs = await createWebSocketConnection({
      authenticationOptions: {
        awaitConnection: true
      },
      pollInterval: 1000,
      maxRetries: 10
    });
  }

  public getLobbyHandler() {
    return this.lobbyHandler;
  }

  public getHeadHandler() {
    return this.headHandler;
  }
  public getChampionSelectHandler() {
    return this.championSelectHandler;
  }

  public getSocialHandler() {
    return this.socialHandler;
  }

  private createLobbyHandler() {
    const lobbyHandler = new LobbyLCUHandler({
      credentials: this.credentials!,
      leagueWS: this.leagueWs!
    });

    this.lobbyHandler = lobbyHandler;
    return this.lobbyHandler;
  }

  private createHeadHandler() {
    const headHandler = new HeadLCUHandler({
      credentials: this.credentials!,
      leagueWS: this.leagueWs!
    });

    this.headHandler = headHandler;
    return this.headHandler;
  }

  private createChampSelectHandler() {
    return new ChampSelectLCUHandler({
      credentials: this.credentials!,
      leagueWS: this.leagueWs!
    });
  }

  private createSocialHandler() {
    return new SocialLCUHandler({
      credentials: this.credentials!,
      leagueWS: this.leagueWs!
    });
  }
}

export const lcuHandlerFactory = new LCUHandlersFactory();
