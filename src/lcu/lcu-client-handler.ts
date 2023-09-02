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
  ChangeSummonersSpellsBody,
  CurrentSummonerData,
  EligibileLobby,
  GameFlowPhaseData,
  LobbyGameDataResponse,
  ChampSelectSessionTimerResponse,
  ChangePositionPreferenceBody,
  AddBotToLobbyBody,
  ChampionBotsData,
  CreateCustomLobbyOpts,
  ManageBotInCustomLobbyOpts,
  ManagePlayerInLobbyOpts,
  SwitchTeamParam,
} from "./";
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

  public async reconnectToCurrentMatch() {
    await createHttp1Request(
      {
        method: "POST",
        url: `/lol-gameflow/v1/reconnect`,
      },
      this.credentials!
    );
  }

  public async dismissStatsAfterMatch() {
    await createHttp1Request(
      {
        method: "POST",
        url: `/lol-end-of-game/v1/state/dismiss-stats`,
      },
      this.credentials!
    );
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
            localPlayerCellId: requiredData.localPlayerCellId,
          };

        cb(requiredDataSession);
      }
    );
  }

  /* Champions */

  public async changeSummonerSpells({
    spell1Id,
    spell2Id,
  }: ChangeSummonersSpellsBody) {
    const body: ChangeSummonersSpellsBody = {};

    if (spell1Id) body.spell1Id = spell1Id;
    if (spell2Id) body.spell2Id = spell2Id;

    const response = await createHttp1Request(
      {
        method: "PATCH",
        url: "/lol-champ-select/v1/session/my-selection",
        body: body,
      },
      this.credentials!
    );
    return response;
  }

  public async wsOnLobbyGet(cb: (lobbyData: LobbyGameDataResponse) => void) {
    {
      this.leagueWS?.subscribe("/lol-lobby/v2/lobby", async (data) => {
        const lobbyData = data as LobbyGameDataResponse;
        cb(lobbyData);
      });
    }
  }

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

  /* CUSTOM LOBBY */
  public async createCustomLobby({
    gameMode,
    mapId,
    mutators,
    teamSize,
    specatatorPolicy,
    password = null,
    name = "Custom lobby",
  }: CreateCustomLobbyOpts) {
    //I'd ratheer want to keep it separate to normal queues and custom
    const lobbyData = await createHttp1Request(
      {
        method: "POST",
        url: "/lol-lobby/v2/lobby",
        body: {
          customGameLobby: {
            configuration: {
              gameMode: gameMode,
              gameMutator: "",
              gameServerRegion: "",
              mapId: mapId,
              mutators: mutators,
              spectatorPolicy: specatatorPolicy,
              teamSize: teamSize,
            },
            lobbyName: name,
            lobbyPassword: password,
          },
          isCustom: true,
        },
      },
      this.credentials!
    );

    const lobbyGameDataResponse = lobbyData.json() as LobbyGameDataResponse;
    return lobbyGameDataResponse.gameConfig;
  }

  public async getChampSelectSessionTimer() {
    const sessionChampSelectTimer = await createHttp1Request(
      {
        method: "GET",
        url: "/lol-champ-select/v1/session/timer",
      },
      this.credentials!
    );

    return sessionChampSelectTimer.json() as ChampSelectSessionTimerResponse;
  }

  public async startCustomChampSelect() {
    const xd = await createHttp1Request(
      {
        method: "POST",
        url: "/lol-lobby/v1/lobby/custom/start-champ-select",
      },
      this.credentials!
    );
  }
  public async cancelCustomChampSelect() {
    await createHttp1Request(
      {
        method: "POST",
        url: "/lol-lobby/v1/lobby/custom/cancel-champ-select",
      },
      this.credentials!
    );
  }
  public async addBotsToCustomLobby(body: AddBotToLobbyBody) {
    await createHttp1Request(
      {
        method: "POST",
        url: "/lol-lobby/v1/lobby/custom/bots",
        body: body,
      },
      this.credentials!
    );
  }

  public async editExistingBotInCustomLobby(
    { botName, teamId }: ManageBotInCustomLobbyOpts,
    body: AddBotToLobbyBody
  ) {
    await createHttp1Request(
      {
        method: "POST",
        url: `/lol-lobby/v1/lobby/custom/bots/bot_${botName}_${teamId}`,
        body: body,
      },
      this.credentials!
    );
  }

  public async removeExistingBotFromCustomLobby({
    botName,
    teamId,
  }: ManageBotInCustomLobbyOpts) {
    await createHttp1Request(
      {
        method: "DELETE",
        url: `/lol-lobby/v1/lobby/custom/bots/bot_${botName}_${teamId}`,
      },
      this.credentials!
    );
  }

  public async getAvailableChampionsBots() {
    const championBots = await createHttp1Request(
      {
        method: "GET",
        url: "/lol-lobby/v2/lobby/custom/available-bots",
      },
      this.credentials!
    );
    const championBotsJson = championBots.json() as ChampionBotsData[];
    return championBotsJson;
  }

  public async switchTeamsInLobby(switchTeamParam: SwitchTeamParam) {
    await createHttp1Request(
      {
        method: "POST",
        url: `lol-lobby/v1/lobby/custom/switch-teams?team=${switchTeamParam}`,
      },
      this.credentials!
    );
  }

  public async managePlayerInLobby({
    managePlayerId,
    action,
  }: ManagePlayerInLobbyOpts) {
    await createHttp1Request(
      {
        method: "POST",
        url: `/lol-lobby/v2/lobby/members/${managePlayerId}/${action}`,
      },
      this.credentials!
    );
  }

  /* CUSTOM LOBBY */

  public async changePositionPreferences(body: ChangePositionPreferenceBody) {
    await createHttp1Request(
      {
        method: "PUT",
        url: "/lol-lobby/v1/lobby/members/localMember/position-preferences",
        body: body,
      },
      this.credentials!
    );
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

  public async searchMatch(cancel = false) {
    await createHttp1Request(
      {
        method: cancel ? "DELETE" : "POST",
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
