import {
  ActionsChampSelectSessionData,
  ChampSelectActionParams,
  ChampSelectActionBody,
  ChampSelectSessionDataRequired,
  ChampSelectSessionDataRequiredWithActionsFlat,
  ChampSelectSessionTimerResponse,
  ChampSelectSummonerData,
  ChangeSummonersSpellsBody,
  GetChampionsIdsForChampSelectActions
} from "@/shared";
import { BaseLCUHandler } from "./base-lcu-handler";
import { BaseLCUHandlerOpts } from "./types";
import { SocketHandler } from "../socket";

interface ChampSelectLCUHandlerOpts extends BaseLCUHandlerOpts {}

export class ChampSelectLCUHandler extends BaseLCUHandler {
  constructor({ credentials, leagueWS }: ChampSelectLCUHandlerOpts) {
    super({ credentials, leagueWS });

    this.wsOnChampionSelectPhase();
    this.wsOnChampSelectImplementationActive();
  }

  public async champSelectAction({
    championId,
    actionId,
    completed
  }: ChampSelectActionParams): Promise<void> {
    const body: ChampSelectActionBody = { championId: championId };
    if (completed) body.completed = completed;

    await this.makeAHttp1Request({
      url: `/lol-champ-select/v1/session/actions/${actionId.toString().trim()}`,
      method: "PATCH",
      body: body
    });
  }

  public async changeSummonerSpells({
    spell1Id,
    spell2Id
  }: ChangeSummonersSpellsBody): Promise<void> {
    const body: ChangeSummonersSpellsBody = {};

    if (spell1Id) body.spell1Id = spell1Id;
    if (spell2Id) body.spell2Id = spell2Id;

    await this.makeAHttp1Request({
      url: "/lol-champ-select/v1/session/my-selection",
      method: "PATCH",
      body: body
    });
  }

  public async getChampSelectSessionTimer(): Promise<ChampSelectSessionTimerResponse> {
    const response = await this.makeAHttp1Request({
      url: "/lol-champ-select/v1/session/timer",
      method: "GET"
    });

    return response.json() as ChampSelectSessionTimerResponse;
  }

  public async getChampionsIdsForChampSelect(
    action: GetChampionsIdsForChampSelectActions
  ): Promise<number[]> {
    const response = await this.makeAHttp1Request<number[]>({
      method: "GET",
      url: `/lol-champ-select/v1/${action}`
    });
    return response.json() as number[];
  }
  public async getChampionSelectPhaseData(): Promise<ChampSelectSessionDataRequiredWithActionsFlat> {
    const response = await this.makeAHttp1Request({
      method: "GET",
      url: "/lol-champ-select/v1/session"
    });

    //TODO: make a helper for DRY
    const requiredData = response.json() as ChampSelectSessionDataRequired;

    const requiredDataSession: ChampSelectSessionDataRequiredWithActionsFlat = {
      myTeam: requiredData.myTeam,
      actions: this.filterActionsToBansPicks(requiredData.actions.flat()),
      theirTeam: requiredData.theirTeam,
      bans: requiredData.bans,
      localPlayerCellId: requiredData.localPlayerCellId
    };

    return requiredDataSession;
  }

  public async getChampionSelectSummonerCellId(
    summonerCellId: number
  ): Promise<ChampSelectSummonerData> {
    const response = await this.makeAHttp1Request({
      method: "GET",
      url: `/lol-champ-select/v1/summoners/${summonerCellId}`
    });

    return response.json() as ChampSelectSummonerData;
  }

  // Websocket subscriptions
  public wsOnChampionSelectSummoner(summonerCellId: number): void {
    this.wsOn<ChampSelectSummonerData>({
      path: `/lol-champ-select/v1/summoners/${summonerCellId}`,
      cb: (error, data) => {
        if (error || !data) return;

        SocketHandler.getInstance()
          .getIO()
          .emit("championSelectSummonerData", { summonerCellId, data });
      }
    });
  }

  private unsubscribeAllChampionSelectSummoner() {
    const foundSubscriptions = [...this.leagueWS.subscriptions].filter(
      ([key]) => key.includes("/lol-champ-select/v1/summoners")
    );

    for (const subscription of foundSubscriptions) {
      this.wsUnsubsribe(subscription[0]);
    }
  }

  public wsOnChampionSelectPhase(): void {
    this.wsOn<ChampSelectSessionDataRequired>({
      path: "/lol-champ-select/v1/session",
      cb: (error, data) => {
        if (error || !data) return;
        const requiredData = data as ChampSelectSessionDataRequired;

        const requiredDataSession: ChampSelectSessionDataRequiredWithActionsFlat =
          {
            myTeam: requiredData.myTeam,
            actions: this.filterActionsToBansPicks(requiredData.actions.flat()),
            theirTeam: requiredData.theirTeam,
            bans: requiredData.bans,
            localPlayerCellId: requiredData.localPlayerCellId
          };

        SocketHandler.getInstance()
          .getIO()
          .emit("championSelectPhase", requiredDataSession);
      }
    });
  }
  public wsOnChampSelectImplementationActive(): void {
    this.wsOn<ChampSelectSessionDataRequired>({
      path: "/lol-champ-select-legacy/v1/implementation-active",
      cb: async (error, data) => {
        if (error || !data) {
          return this.unsubscribeAllChampionSelectSummoner();
        }

        const sessionData = await this.getChampionSelectPhaseData();
        const sessionPlayers = [
          ...sessionData.myTeam,
          ...sessionData.theirTeam
        ];

        for (const player of sessionPlayers) {
          this.wsOnChampionSelectSummoner(player.cellId);
        }
      }
    });
  }

  public unsubscribeOnChampionSelectPhase(): void {
    this.wsUnsubsribe("/lol-champ-select/v1/session");
  }

  //   helpers
  private filterActionsToBansPicks(
    actions: ActionsChampSelectSessionData[]
  ): ChampSelectSessionDataRequiredWithActionsFlat["actions"] {
    const separateActions: ChampSelectSessionDataRequiredWithActionsFlat["actions"] =
      {
        pickActions: [],
        banActions: []
      };

    for (const action of actions) {
      if (action.type === "pick") {
        separateActions.pickActions.push(action);
      } else if (action.type === "ban") {
        separateActions.banActions.push(action);
      }
    }

    return separateActions;
  }
}
