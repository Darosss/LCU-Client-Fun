import { BaseLCUHandler } from "./base-lcu-handler";
import {
  ActionsChampSelectSessionData,
  BaseLCUHandlerOpts,
  BaseLCUHandlerWsOnArgs,
  ChampSelectActionArgs,
  ChampSelectActionBody,
  ChampSelectSessionDataRequired,
  ChampSelectSessionDataRequiredWithActionsFlat,
  ChampSelectSessionTimerResponse,
  ChampSelectSummonerData,
  ChampionData,
  ChangeSummonersSpellsBody,
  GetChampionsIdsForChampSelectActions,
} from "./types";

interface ChampSelectLCUHandlerOpts extends BaseLCUHandlerOpts {}

export class ChampSelectLCUHandler extends BaseLCUHandler {
  constructor({ credentials, leagueWS }: ChampSelectLCUHandlerOpts) {
    super({ credentials, leagueWS });
  }

  public async champSelectAction({
    championId,
    actionId,
    completed,
  }: ChampSelectActionArgs): Promise<void> {
    const body: ChampSelectActionBody = { championId: championId };
    if (completed) body.completed = completed;

    await this.makeAHttp1Request({
      url: `/lol-champ-select/v1/session/actions/${actionId.toString().trim()}`,
      method: "PATCH",
      body: body,
    });
  }

  public async changeSummonerSpells({
    spell1Id,
    spell2Id,
  }: ChangeSummonersSpellsBody): Promise<void> {
    const body: ChangeSummonersSpellsBody = {};

    if (spell1Id) body.spell1Id = spell1Id;
    if (spell2Id) body.spell2Id = spell2Id;

    await this.makeAHttp1Request({
      url: "/lol-champ-select/v1/session/my-selection",
      method: "PATCH",
      body: body,
    });
  }

  public async getChampSelectSessionTimer(): Promise<ChampSelectSessionTimerResponse> {
    const response = await this.makeAHttp1Request({
      url: "/lol-champ-select/v1/session/timer",
      method: "GET",
    });

    return response.json() as ChampSelectSessionTimerResponse;
  }

    public async getChampionsIdsForChampSelect(
    action: GetChampionsIdsForChampSelectActions
  ): Promise<number[]> {
    const response = await this.makeAHttp1Request({
      method: "GET",
      url: `/lol-champ-select/v1/${action}`,
    });

    return response.json() as number[];
  }

  // Websocket subscriptions
  public async wsOnChampionSelectSummoner(
    summonerCellId: number,
    cb: BaseLCUHandlerWsOnArgs<ChampSelectSummonerData>["cb"]
  ) {
    this.wsOn<ChampSelectSummonerData>({
      path: `/lol-champ-select/v1/summoners/${summonerCellId}`,
      cb,
    });
  }

  public unsubscribeOnChampionSelectSummoner(summonerCellId: number) {
    this.wsUnsubsribe(`/lol-champ-select/v1/summoners/${summonerCellId}`);
  }

  public async wsOnChampionSelectPhase(
    cb: BaseLCUHandlerWsOnArgs<ChampSelectSessionDataRequiredWithActionsFlat>["cb"]
  ): Promise<void> {
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
            localPlayerCellId: requiredData.localPlayerCellId,
          };

        cb(null, requiredDataSession);
      },
    });
  }

  public unsubscribeOnChampionSelectPhase() {
    this.wsUnsubsribe("/lol-champ-select/v1/session");
  }

  //   helpers
  private filterActionsToBansPicks(actions: ActionsChampSelectSessionData[]) {
    const separateActions: ChampSelectSessionDataRequiredWithActionsFlat["actions"] =
      {
        pickActions: [],
        banActions: [],
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
