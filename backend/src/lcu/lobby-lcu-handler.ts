import { BaseLCUHandler } from "./base-lcu-handler";
import {
  AddBotToLobbyBody,
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
  MatchmakingSearchData
} from "@/shared";
import { BaseLCUHandlerOpts } from "./types";
import { SocketHandler } from "../socket";

interface LobbyLCUHandlerOpts extends BaseLCUHandlerOpts {}

export class LobbyLCUHandler extends BaseLCUHandler {
  constructor({ credentials, leagueWS }: LobbyLCUHandlerOpts) {
    super({ credentials, leagueWS });
    this.wsOnLobbyGet();
    this.wsOnReceiveInvitation();
  }

  public async invitePlayerToLobby(
    body: InvitePlayerToLobbyBody[]
  ): Promise<void> {
    await this.makeAHttp1Request({
      url: "/lol-lobby/v2/lobby/invitations",
      method: "POST",
      body: body
    });
  }

  public async manageInvitation({
    action,
    invitationId
  }: ManageInvitationArgs): Promise<void> {
    await this.makeAHttp1Request({
      url: `/lol-lobby/v2/received-invitations/${invitationId}/${action}`,
      method: "POST"
    });
  }

  public async showEligibleLobbys(): Promise<EligibileLobby[]> {
    const response = await this.makeAHttp1Request({
      url: "/lol-lobby/v2/eligibility/party",
      method: "POST"
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
      body: { queueId: queueId }
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
      body: body
    });
  }

  public async leaveLobby(): Promise<void> {
    await this.makeAHttp1Request({
      url: "/lol-lobby/v2/lobby",
      method: "DELETE"
    });
  }

  public async searchMatch(cancel = false): Promise<void> {
    await this.makeAHttp1Request({
      method: cancel ? "DELETE" : "POST",
      url: "lol-lobby/v2/lobby/matchmaking/search"
    });
  }

  // Manage queues (search, cancel search, accept)

  public async manageMatchReadyCheck(
    action: ManageReadyCheckMatchActions
  ): Promise<void> {
    await this.makeAHttp1Request({
      url: `/lol-matchmaking/v1/ready-check/${action}`,
      method: "POST"
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
    name = "Custom lobby"
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
            teamSize: teamSize
          },
          lobbyName: name,
          lobbyPassword: password
        },
        isCustom: true
      }
    });

    const lobbyGameDataResponse = response.json() as LobbyGameDataResponse;
    return lobbyGameDataResponse;
  }

  public async startCustomChampSelect(): Promise<void> {
    await this.makeAHttp1Request({
      url: "/lol-lobby/v1/lobby/custom/start-champ-select",
      method: "POST"
    });
  }

  public async cancelCustomChampSelect(): Promise<void> {
    await this.makeAHttp1Request({
      url: "/lol-lobby/v1/lobby/custom/cancel-champ-select",
      method: "POST"
    });
  }

  public async addBotsToCustomLobby(body: AddBotToLobbyBody): Promise<void> {
    await this.makeAHttp1Request({
      url: "/lol-lobby/v1/lobby/custom/bots",
      method: "POST",
      body: body
    });
  }

  public async editExistingBotInCustomLobby(
    { botName, teamId }: ManageBotInCustomLobbyOpts,
    body: AddBotToLobbyBody
  ): Promise<void> {
    await this.makeAHttp1Request({
      url: `/lol-lobby/v1/lobby/custom/bots/bot_${botName}_${teamId}`,
      method: "POST",
      body: body
    });
  }

  public async removeExistingBotFromCustomLobby({
    botName,
    teamId
  }: ManageBotInCustomLobbyOpts): Promise<void> {
    await this.makeAHttp1Request({
      method: "DELETE",
      url: `/lol-lobby/v1/lobby/custom/bots/bot_${botName}_${teamId}`
    });
  }

  public async getAvailableChampionsBots(): Promise<ChampionBotsData[]> {
    const response = await this.makeAHttp1Request({
      method: "GET",
      url: "/lol-lobby/v2/lobby/custom/available-bots"
    });

    const championBotsJson = response.json() as ChampionBotsData[];
    return championBotsJson;
  }

  public async switchTeamsInLobby(
    switchTeamParam: SwitchTeamParam
  ): Promise<void> {
    await this.makeAHttp1Request({
      method: "POST",
      url: `lol-lobby/v1/lobby/custom/switch-teams?team=${switchTeamParam}`
    });
  }

  public async managePlayerInLobby({
    managePlayerId,
    action
  }: ManagePlayerInLobbyOpts): Promise<void> {
    await this.makeAHttp1Request({
      method: "POST",
      url: `/lol-lobby/v2/lobby/members/${managePlayerId}/${action}`
    });
  }

  public async getLobbyData(): Promise<LobbyGameDataResponse> {
    const response = await this.makeAHttp1Request({
      method: "GET",
      url: "/lol-lobby/v2/lobby"
    });

    return response.json() as LobbyGameDataResponse;
  }

  //   Websocket subscriptions

  public wsOnReceiveInvitation(): void {
    this.wsOn<ReceivedInvitationData[]>({
      path: "/lol-lobby/v2/received-invitations",
      cb: (error, data) => {
        if (error || !data) return;
        SocketHandler.getInstance().getIO().emit("receivedInvitation", data);
      }
    });
  }

  // public wsOnMatchmakingSearch(
  //   cb: BaseLCUHandlerWsOnArgs<MatchmakingSearchData>["cb"]
  // ): void {
  //   this.wsOn<MatchmakingSearchData>({
  //     path: "/lol-matchmaking/v1/search",
  //     cb: cb
  //   });
  // }
  public wsOnMatchmakingSearch(): void {
    this.wsOn<MatchmakingSearchData>({
      path: "/lol-matchmaking/v1/search",
      cb: (error, data) => {
        if (error || !data) return;
        // SocketHandler.getInstance().getIO().emit("lobbyData", data);
      }
    });
  }

  // public wsOnLobbyGet(
  //   cb: BaseLCUHandlerWsOnArgs<LobbyGameDataResponse>["cb"]
  // ): void {
  //   this.wsOn<LobbyGameDataResponse>({
  //     path: "/lol-lobby/v2/lobby",
  //     cb: cb
  //   });
  // }
  public wsOnLobbyGet(): void {
    this.wsOn<LobbyGameDataResponse>({
      path: "/lol-lobby/v2/lobby",
      cb: (error, data) => {
        if (error || !data) return;
        SocketHandler.getInstance().getIO().emit("lobbyData", data);
      }
    });
  }

  public unsubsribeOnMatchmakingSearch(): void {
    this.wsUnsubsribe("/lol-matchmaking/v1/search");
  }

  public unsubsribeOnReceiveInvitation(): void {
    this.wsUnsubsribe("/lol-lobby/v2/received-invitations");
  }

  public unsubsribeOnLobbyGet(): void {
    this.wsUnsubsribe("/lol-lobby/v2/lobby");
  }
}
