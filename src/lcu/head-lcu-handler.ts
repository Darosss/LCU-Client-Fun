import { loggerWsEvents } from "../logger";
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

    this.leagueWS.on("message", (data) => {
      try {
        const parsedData = JSON.parse(data.toString())[2] as {
          data: any;
          eventType: string;
          uri: string;
        };
        // console.log(parsedData.uri);
        return;
        loggerWsEvents.info(parsedData.uri);
        loggerWsEvents.info(parsedData.data);
        loggerWsEvents.info(parsedData.eventType);
        loggerWsEvents.info(
          "----------------------------------------------------------------------------"
        );
      } catch (err) {}
    });
  }

  public async killUx(): Promise<void> {
    await this.makeAHttp1Request({
      url: "/riotclient/kill-ux",
      method: "POST",
    });
  }
  public async launchUx(): Promise<void> {
    await this.makeAHttp1Request({
      url: "/riotclient/launch-ux",
      method: "POST",
    });
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

  //TODO: rename to getAllChamps?
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

    return allChamps;
  }

  // Websocket subscriptions

  //FIXME: temporary way to prevent client ux to turn on
  public preventClientUXToTurnOn() {
    this.wsOn({
      path: "/riotclient/ux-state/request",
      cb: async (error, data: any) => {
        if (error) return;
        if (data.state !== "HideAll" && data.state !== "Quit") {
          setTimeout(async () => {
            await this.killUx();
          }, 300);
        }
      },
    });
  }

  public async unsusbcribePreventClientUXToTurnOn() {
    this.wsUnsubsribe("/riotclient/ux-state/request");
  }

  public async wsOnGameflowPhaseChange(
    cb: BaseLCUHandlerWsOnArgs<GameFlowPhaseData>["cb"]
  ): Promise<void> {
    this.wsOn<GameFlowPhaseData>({
      path: "/lol-gameflow/v1/gameflow-phase",
      cb: cb,
    });
  }

  public async unsubscribeOnGameflowPhaseChange() {
    this.wsUnsubsribe("/lol-gameflow/v1/gameflow-phase");
  }
}
