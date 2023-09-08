import {
  Credentials,
  LeagueWebSocket,
  createHttp1Request,
} from "league-connect";
import { BaseLCUHandlerOpts, BaseLCUHandlerWsOnArgs } from "./types";

interface MakeAHttp1RequestArgs<T = unknown> {
  url: string;
  method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  body?: T;
}

export class BaseLCUHandler {
  protected credentials: Credentials;
  protected leagueWS: LeagueWebSocket;

  constructor({ credentials, leagueWS }: BaseLCUHandlerOpts) {
    this.credentials = credentials;
    this.leagueWS = leagueWS;
  }

  protected wsUnsubsribe(path: string) {
    this.leagueWS.unsubscribe(path);
  }

  protected wsOn<T = unknown>({ path, cb }: BaseLCUHandlerWsOnArgs<T>) {
    try {
      this.leagueWS?.subscribe(path, async (data) => cb(null, data as T));
    } catch (err) {
      cb(err, null);
    }
  }

  protected async makeAHttp1Request<T = unknown>({
    method,
    url,
    body,
  }: MakeAHttp1RequestArgs<T>) {
    const response = await createHttp1Request(
      {
        method: method,
        url: url,
        body: body,
      },
      this.credentials
    );

    return response;
  }
}
