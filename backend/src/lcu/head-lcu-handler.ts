import {
  downloadRunesPngs,
  ifDataDragonHeadRunesDoesNotExist,
  ifDataDragonRunesDoesNotExist,
  writeDragonHeadRunesData,
  writeDragonRunesData
} from "@/helpers";
import { BaseLCUHandler } from "./base-lcu-handler";

import {
  ChampionData,
  CreateRunePageBody,
  CurrentSummonerData,
  GameFlowPhaseData,
  GetRecommendedPagesByChampIdPositionAndMapIdParams,
  HeadRuneData,
  OwnedRunePageCountData,
  RecommendedRunesData,
  RunePageData,
  RunesData
} from "@/shared";
import { BaseLCUHandlerOpts } from "./types";
import { SocketHandler } from "../socket";

interface HeadLCUHandlerOpts extends BaseLCUHandlerOpts {}

/**
 *
 * - Class responsible for handling most 'common' endpoints
 * that are no sesnse to make other separated handlers fe.
 * because there is only few endpoints stricte connected
 */
export class HeadLCUHandler extends BaseLCUHandler {
  private preventingToCloseUX: boolean = false;
  constructor({ credentials, leagueWS }: HeadLCUHandlerOpts) {
    super({ credentials, leagueWS });

    this.initalizeHeadRunesData();
    this.initializeRunesData();
    this.wsOnGameflowPhaseChange();
  }

  public async killUx(): Promise<void> {
    await this.makeAHttp1Request({
      url: "/riotclient/kill-ux",
      method: "POST"
    });
  }
  public async launchUx(): Promise<void> {
    await this.makeAHttp1Request({
      url: "/riotclient/launch-ux",
      method: "POST"
    });
  }

  public async getCurrentSummoner(): Promise<CurrentSummonerData> {
    const response = await this.makeAHttp1Request({
      url: "/lol-summoner/v1/current-summoner",
      method: "GET"
    });

    const summoner = response.json() as CurrentSummonerData;
    return summoner;
  }
  public async reconnectToCurrentMatch(): Promise<void> {
    await this.makeAHttp1Request({
      url: `/lol-gameflow/v1/reconnect`,
      method: "POST"
    });
  }

  public async dismissStatsAfterMatch(): Promise<void> {
    await this.makeAHttp1Request({
      url: `/lol-end-of-game/v1/state/dismiss-stats`,
      method: "POST"
    });
  }

  //TODO: rename to getAllChamps?
  public async getAvailableChampsBySummonerId(
    summonerId: number
  ): Promise<ChampionData[]> {
    const response = await this.makeAHttp1Request({
      url: `lol-champions/v1/inventories/${summonerId}/champions-minimal`,
      method: "GET"
    });

    const allChamps = response.json() as ChampionData[];

    const availableChamps = allChamps.filter(
      ({ ownership: { owned } }) => owned
    );

    return allChamps;
  }

  /* Runes */

  private async initalizeHeadRunesData(): Promise<void> {
    if (!ifDataDragonHeadRunesDoesNotExist()) {
      return;
    }
    const response = await this.makeAHttp1Request({
      method: "GET",
      url: `/lol-perks/v1/styles`
    });
    const headRuneData = response.json() as HeadRuneData[];
    downloadRunesPngs(headRuneData);
    writeDragonHeadRunesData(headRuneData);
  }

  private async initializeRunesData(): Promise<void> {
    if (!ifDataDragonRunesDoesNotExist()) {
      return;
    }

    const response = await this.makeAHttp1Request({
      method: "GET",
      url: `/lol-perks/v1/perks`
    });
    const runesData = response.json() as RunesData[];
    downloadRunesPngs(runesData);
    writeDragonRunesData(runesData);
  }

  public async getRunePages(): Promise<RunePageData[]> {
    const response = await this.makeAHttp1Request({
      method: "GET",
      url: `/lol-perks/v1/pages`
    });
    const runePages = response.json() as RunePageData[];

    return runePages;
  }

  public async setCurrentPage(pageId: number): Promise<void> {
    await this.makeAHttp1Request({
      method: "PUT",
      url: `/lol-perks/v1/currentpage`,
      body: pageId
    });
  }

  public async getCurrentPage(): Promise<RunePageData> {
    const response = await this.makeAHttp1Request({
      method: "GET",
      url: `/lol-perks/v1/currentpage`
    });

    return response.json() as RunePageData;
  }

  public async editRunePageById(
    pageId: number,
    updateData: RunePageData
  ): Promise<void> {
    await this.makeAHttp1Request({
      method: "PUT",
      url: `/lol-perks/v1/pages/${pageId}`,
      body: updateData
    });
  }

  public async deleteRunePageById(pageId: number): Promise<void> {
    await this.makeAHttp1Request({
      method: "DELETE",
      url: `/lol-perks/v1/pages/${pageId}`
    });
  }

  public async createRunePage(body: CreateRunePageBody): Promise<RunePageData> {
    const response = await this.makeAHttp1Request({
      method: "POST",
      url: `/lol-perks/v1/pages/`,
      body: body
    });

    return response.json() as RunePageData;
  }

  public async getOwnedRunePageCount(): Promise<OwnedRunePageCountData> {
    const response = await this.makeAHttp1Request({
      method: "GET",
      url: `/lol-perks/v1/inventory`
    });

    return response.json() as OwnedRunePageCountData;
  }

  public async getRecommendedPagesByChampIdPositionAndMapId(
    data: GetRecommendedPagesByChampIdPositionAndMapIdParams
  ): Promise<RecommendedRunesData[]> {
    const { champId, position, mapId } = data;
    const response = await this.makeAHttp1Request({
      method: "GET",
      url: `/lol-perks/v1/recommended-pages/champion/${champId}/position/${position}/map/${mapId}`
    });
    return response.json() as RecommendedRunesData[];
  }

  public async getGameflowPhase(): Promise<GameFlowPhaseData> {
    const response = await this.makeAHttp1Request({
      method: "GET",
      url: `/lol-gameflow/v1/gameflow-phase`
    });
    return response.json() as GameFlowPhaseData;
  }

  // Websocket subscriptions

  //FIXME: temporary way to prevent client ux to turn on
  public preventClientUXToTurnOn(): void {
    if (this.preventingToCloseUX) return;

    this.wsOn({
      path: "/riotclient/ux-state/request",
      cb: async (error: unknown, data: any) => {
        if (error) return;
        if (data.state !== "HideAll" && data.state !== "Quit") {
          setTimeout(async () => {
            await this.killUx();
          }, 300);
        }
      }
    });
  }

  public unsusbcribePreventClientUXToTurnOn(): void {
    this.wsUnsubsribe("/riotclient/ux-state/request");
  }

  public wsOnGameflowPhaseChange(): void {
    this.wsOn<GameFlowPhaseData>({
      path: "/lol-gameflow/v1/gameflow-phase",
      cb: (error, data) => {
        if (error || !data) return;
        const socketIOInstance = SocketHandler.getInstance().getIO();
        socketIOInstance.emit("gameflowPhase", data);
        if (data !== "None") {
          return;
        }

        socketIOInstance.emit("lobbyData", null);
      }
    });
  }

  public unsubscribeOnGameflowPhaseChange() {
    this.wsUnsubsribe("/lol-gameflow/v1/gameflow-phase");
  }
}
