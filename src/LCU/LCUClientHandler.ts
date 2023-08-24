import {
  authenticate,
  createHttp1Request,
  createWebSocketConnection,
  Credentials,
  LeagueWebSocket,
} from "league-connect";
import {
  ChampionData,
  ChampSelectActionBody,
  ChampSelectSessionDataRequired,
  ChampSelectSessionDataRequiredWithActionsFlat,
  CurrentSummonerData,
  EligibileLobby,
  GameFlowPhaseData,
  LobbyGameDataResponse,
} from "./types/";
interface LCUClientHandlerOpts {}

export class LCUClientHandler {
  private credentials?: Credentials;
  private leagueWS?: LeagueWebSocket;
  private currentSummoner?: CurrentSummonerData;
  constructor({}: LCUClientHandlerOpts) {}

  public async init() {
    this.credentials = await authenticate({
      awaitConnection: true,
      pollInterval: 5000,
    });
  }

  async initLeagueWS() {
    this.leagueWS = await createWebSocketConnection({
      authenticationOptions: {
        awaitConnection: true,
      },
      pollInterval: 1000,
      maxRetries: 10,
    });
  }

  async showEligibleLobbys(): Promise<EligibileLobby[]> {
    const response = await createHttp1Request(
      {
        method: "POST",
        url: "/lol-lobby/v2/eligibility/party",
      },
      this.credentials!
    );
    const eligibleLobbysJson = response.json() as EligibileLobby[];

    const onlyEligiglbeLobbys = eligibleLobbysJson.filter(
      ({ eligible }) => eligible
    );
    return onlyEligiglbeLobbys;
  }

  async getCurrentSummoner() {
    const response = await createHttp1Request(
      {
        method: "GET",
        url: "/lol-summoner/v1/current-summoner",
      },
      this.credentials!
    );
    const summoner = response.json() as CurrentSummonerData;
    this.currentSummoner = summoner;
    return summoner;
  }

  /* Champions */
  async getAvailableChamps(summonerId: number) {
    const response = await createHttp1Request(
      {
        method: "GET",
        url: `lol-champions/v1/inventories/${summonerId}/champions-minimal`,
      },
      this.credentials!
    );

    const allChamps = response.json() as ChampionData[];

    const availableChamps = allChamps.filter(
      ({ ownership: { owned } }) => owned
    );

    return availableChamps;
  }

  async champSelectAction(
    championId: number,
    actionId: number,
    completed = false
  ) {
    const body: ChampSelectActionBody = { championId: championId };
    if (completed) body.completed = completed;

    await createHttp1Request(
      {
        method: "PATCH",
        url: `/lol-champ-select/v1/session/actions/${actionId
          .toString()
          .trim()}`,
        body: body,
      },
      this.credentials!
    );
  }

  public async wsOnChampionSelectPhase(
    cb: (dataSession: ChampSelectSessionDataRequiredWithActionsFlat) => void
  ) {
    this.leagueWS?.subscribe(
      "/lol-champ-select/v1/session",
      async (data, event) => {
        const requiredData = data as ChampSelectSessionDataRequired;
        const requiredDataSession: ChampSelectSessionDataRequiredWithActionsFlat =
          {
            myTeam: requiredData.myTeam,
            actions: requiredData.actions.flat(),
            theirTeam: requiredData.theirTeam,
            bans: requiredData.bans,
          };
        cb(requiredDataSession);
      }
    );
  }

  /* Champions */

  public async createLobby(queueId: number) {
    const lobbyData = await createHttp1Request(
      {
        method: "POST",
        url: "/lol-lobby/v2/lobby",
        body: { queueId: queueId },
      },
      this.credentials!
    );

    const lobbyGameDataResponse = lobbyData.json() as LobbyGameDataResponse;
    return lobbyGameDataResponse.gameConfig;
  }

  public async createCustomLobby() {
    //I'd ratheer want to keep it separate to normal queues and custom
    const lobbyData = await createHttp1Request(
      {
        method: "POST",
        url: "/lol-lobby/v2/lobby",
        body: {
          customGameLobby: {
            configuration: {
              gameMode: "PRACTICETOOL",
              gameMutator: "",
              gameServerRegion: "",
              mapId: 11,
              mutators: { id: 1 },
              spectatorPolicy: "AllAllowed",
              teamSize: 5,
            },
            lobbyName: "Name",
            lobbyPassword: null,
          },
          isCustom: true,
        },
      },
      this.credentials!
    );

    const lobbyGameDataResponse = lobbyData.json() as LobbyGameDataResponse;
    return lobbyGameDataResponse.gameConfig;
  }

  public async leaveLobby() {
    await createHttp1Request(
      {
        method: "DELETE",
        url: "/lol-lobby/v2/lobby",
      },
      this.credentials!
    );
  }

  public async searchMatch() {
    await createHttp1Request(
      {
        method: "POST",
        url: "lol-lobby/v2/lobby/matchmaking/search",
      },
      this.credentials!
    );
  }

  public async acceptMatch() {
    await createHttp1Request(
      {
        method: "POST",
        url: "/lol-matchmaking/v1/ready-check/accept",
      },
      this.credentials!
    );
  }
  public async declineMatch() {
    await createHttp1Request(
      {
        method: "POST",
        url: "/lol-matchmaking/v1/ready-check/decline",
      },
      this.credentials!
    );
  }

  public async wsOnGameflowPhaseChange(
    cb: (stateOfReadyCheck: GameFlowPhaseData) => void
  ) {
    this.leagueWS?.subscribe(
      "/lol-gameflow/v1/gameflow-phase",
      async (data) => {
        const currentPhase = data as GameFlowPhaseData;
        cb(currentPhase);
      }
    );
  }
}

export const lcuClientHandlerObj = new LCUClientHandler({});
