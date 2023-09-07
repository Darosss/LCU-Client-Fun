import { BaseLCUHandler } from "./base-lcu-handler";
import {
  BaseLCUHandlerOpts,
  BaseLCUHandlerWsOnArgs,
  ChampionData,
  CurrentSummonerData,
  GameFlowPhaseData,
} from "./types";

interface HeadLCUHandlerOpts extends BaseLCUHandlerOpts {}

/**
 *
 * - Class responsible for handling most 'common' endpoints
 * that are no sesnse to make other separated handlers fe.
 * because there is only few endpoints stricte connected
 */
export class HeadLCUHandler extends BaseLCUHandler {
  constructor({ credentials, leagueWS }: HeadLCUHandlerOpts) {
    super({ credentials, leagueWS });
  }

  public async getCurrentSummoner(): Promise<CurrentSummonerData> {
    const response = await this.makeAHttp1Request({
      url: "/lol-summoner/v1/current-summoner",
      method: "GET",
    });

    const summoner = response.json() as CurrentSummonerData;
    return summoner;
  }
  public async reconnectToCurrentMatch(): Promise<void> {
    await this.makeAHttp1Request({
      url: `/lol-gameflow/v1/reconnect`,
      method: "POST",
    });
  }

  public async dismissStatsAfterMatch(): Promise<void> {
    await this.makeAHttp1Request({
      url: `/lol-end-of-game/v1/state/dismiss-stats`,
      method: "POST",
    });
  }

  public async getAvailableChampsBySummonerId(
    summonerId: number
  ): Promise<ChampionData[]> {
    const response = await this.makeAHttp1Request({
      url: `lol-champions/v1/inventories/${summonerId}/champions-minimal`,
      method: "GET",
    });

    const allChamps = response.json() as ChampionData[];

    const availableChamps = allChamps.filter(
      ({ ownership: { owned } }) => owned
    );

    return availableChamps;
  }

  // Websocket subscriptions

  public async wsOnGameflowPhaseChange(
    cb: BaseLCUHandlerWsOnArgs<GameFlowPhaseData>["cb"]
  ): Promise<void> {
    this.wsOn<GameFlowPhaseData>({
      path: "/lol-gameflow/v1/gameflow-phase",
      cb: cb,
    });
  }
}
