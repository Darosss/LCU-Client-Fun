import { BaseLCUHandler } from "./base-lcu-handler";
import {
  AddBotToLobbyBody,
  BaseLCUHandlerOpts,
  BaseLCUHandlerWsOnArgs,
  ChampionBotsData,
  CreateCustomLobbyOpts,
  EligibileLobby,
  InvitePlayerToLobbyBody,
  LobbyGameDataResponse,
  ManageBotInCustomLobbyOpts,
  ManagePlayerInLobbyOpts,
  ReceivedInvitationData,
  SwitchTeamParam,
  ChangePositionPreferenceBody,
  ManageInvitationArgs,
  ManageReadyCheckMatchActions,
} from "./types";

interface LobbyLCUHandlerOpts extends BaseLCUHandlerOpts {}

export class LobbyLCUHandler extends BaseLCUHandler {
  constructor({ credentials, leagueWS }: LobbyLCUHandlerOpts) {
    super({ credentials, leagueWS });
  }

  public async invitePlayerToLobby(
    body: InvitePlayerToLobbyBody[]
  ): Promise<void> {
    await this.makeAHttp1Request({
      url: "/lol-lobby/v2/lobby/invitations",
      method: "POST",
      body: body,
    });
  }

  public async manageInvitation({
    action,
    invitationId,
  }: ManageInvitationArgs): Promise<void> {
    await this.makeAHttp1Request({
      url: `/lol-lobby/v2/received-invitations/${invitationId}/${action}`,
      method: "POST",
    });
  }

  public async showEligibleLobbys(): Promise<EligibileLobby[]> {
    const response = await this.makeAHttp1Request({
      url: "/lol-lobby/v2/eligibility/party",
      method: "POST",
    });

    const eligibleLobbysJson = response.json() as EligibileLobby[];

    const onlyEligiglbeLobbys = eligibleLobbysJson.filter(
      ({ eligible }) => eligible
    );
    return onlyEligiglbeLobbys;
  }

  public async createLobby(queueId: number): Promise<LobbyGameDataResponse> {
    const response = await this.makeAHttp1Request({
      url: "/lol-lobby/v2/lobby",
      method: "POST",
      body: { queueId: queueId },
    });

    const lobbyGameDataResponse = response.json() as LobbyGameDataResponse;
    return lobbyGameDataResponse;
  }

  public async changePositionPreferences(
    body: ChangePositionPreferenceBody
  ): Promise<void> {
    await this.makeAHttp1Request({
      url: "/lol-lobby/v1/lobby/members/localMember/position-preferences",
      method: "PUT",
      body: body,
    });
  }

  public async leaveLobby(): Promise<void> {
    await this.makeAHttp1Request({
      url: "/lol-lobby/v2/lobby",
      method: "DELETE",
    });
  }

  public async searchMatch(cancel = false): Promise<void> {
    await this.makeAHttp1Request({
      method: cancel ? "DELETE" : "POST",
      url: "lol-lobby/v2/lobby/matchmaking/search",
    });
  }

  // Manage queues (search, cancel search, accept)

  public async manageMatchReadyCheck(
    action: ManageReadyCheckMatchActions
  ): Promise<void> {
    await this.makeAHttp1Request({
      url: `/lol-matchmaking/v1/ready-check/${action}`,
      method: "POST",
    });
  }

  // CUSTOM LOBBYS
  public async createCustomLobby({
    gameMode,
    mapId,
    mutators,
    teamSize,
    specatatorPolicy,
    password = null,
    name = "Custom lobby",
  }: CreateCustomLobbyOpts): Promise<LobbyGameDataResponse> {
    const response = await this.makeAHttp1Request({
      url: "/lol-lobby/v2/lobby",
      method: "POST",
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
    });

    const lobbyGameDataResponse = response.json() as LobbyGameDataResponse;
    return lobbyGameDataResponse;
  }

  public async startCustomChampSelect(): Promise<void> {
    await this.makeAHttp1Request({
      url: "/lol-lobby/v1/lobby/custom/start-champ-select",
      method: "POST",
    });
  }

  public async cancelCustomChampSelect(): Promise<void> {
    await this.makeAHttp1Request({
      url: "/lol-lobby/v1/lobby/custom/cancel-champ-select",
      method: "POST",
    });
  }

  public async addBotsToCustomLobby(body: AddBotToLobbyBody): Promise<void> {
    await this.makeAHttp1Request({
      url: "/lol-lobby/v1/lobby/custom/bots",
      method: "POST",
      body: body,
    });
  }

  public async editExistingBotInCustomLobby(
    { botName, teamId }: ManageBotInCustomLobbyOpts,
    body: AddBotToLobbyBody
  ): Promise<void> {
    await this.makeAHttp1Request({
      url: `/lol-lobby/v1/lobby/custom/bots/bot_${botName}_${teamId}`,
      method: "POST",
      body: body,
    });
  }

  public async removeExistingBotFromCustomLobby({
    botName,
    teamId,
  }: ManageBotInCustomLobbyOpts): Promise<void> {
    await this.makeAHttp1Request({
      method: "DELETE",
      url: `/lol-lobby/v1/lobby/custom/bots/bot_${botName}_${teamId}`,
    });
  }

  public async getAvailableChampionsBots(): Promise<ChampionBotsData[]> {
    const response = await this.makeAHttp1Request({
      method: "GET",
      url: "/lol-lobby/v2/lobby/custom/available-bots",
    });

    const championBotsJson = response.json() as ChampionBotsData[];
    return championBotsJson;
  }

  public async switchTeamsInLobby(
    switchTeamParam: SwitchTeamParam
  ): Promise<void> {
    await this.makeAHttp1Request({
      method: "POST",
      url: `lol-lobby/v1/lobby/custom/switch-teams?team=${switchTeamParam}`,
    });
  }

  public async managePlayerInLobby({
    managePlayerId,
    action,
  }: ManagePlayerInLobbyOpts): Promise<void> {
    await this.makeAHttp1Request({
      method: "POST",
      url: `/lol-lobby/v2/lobby/members/${managePlayerId}/${action}`,
    });
  }

  public async getLobbyData(): Promise<LobbyGameDataResponse> {
    const response = await this.makeAHttp1Request({
      method: "GET",
      url: "/lol-lobby/v2/lobby",
    });

    return response.json() as LobbyGameDataResponse;
  }

  //   Websocket subscriptions

  public async wsOnReceiveInvitation(
    cb: BaseLCUHandlerWsOnArgs<ReceivedInvitationData[]>["cb"]
  ): Promise<void> {
    this.wsOn<ReceivedInvitationData[]>({
      path: "/lol-lobby/v2/received-invitations",
      cb: cb,
    });
  }

  public async wsOnLobbyGet(
    cb: BaseLCUHandlerWsOnArgs<LobbyGameDataResponse>["cb"]
  ): Promise<void> {
    this.wsOn<LobbyGameDataResponse>({
      path: "/lol-lobby/v2/lobby",
      cb: cb,
    });
  }

  public async unsubsribeOnReceiveInvitation() {
    this.wsUnsubsribe("/lol-lobby/v2/received-invitations");
  }

  public async unsubsribeOnLobbyGet() {
    this.wsUnsubsribe("/lol-lobby/v2/lobby");
  }
}
