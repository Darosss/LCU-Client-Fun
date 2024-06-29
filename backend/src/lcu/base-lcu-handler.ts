import {
  Credentials,
  Http1Response,
  LeagueWebSocket,
  createHttp1Request
} from "league-connect";
import { BaseLCUHandlerOpts } from "./types";
import { BaseLCUHandlerWsOnParams } from "@/shared";

interface MakeAHttp1RequestParams<T = unknown> {
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

  protected wsUnsubsribe(path: string): void {
    this.leagueWS.unsubscribe(path);
  }

  protected wsOn<T = unknown>({ path, cb }: BaseLCUHandlerWsOnParams<T>): void {
    try {
      this.leagueWS?.subscribe(path, async (data) => cb(null, data as T));
    } catch (err) {
      cb(err, null);
    }
  }

  protected async makeAHttp1Request<T = unknown>({
    method,
    url,
    body
  }: MakeAHttp1RequestParams<T>): Promise<Http1Response> {
    try {
      const response = await createHttp1Request(
        {
          method: method,
          url: url,
          body: body
        },
        this.credentials
      );

      return response;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("ECONNREFUSED")) {
          throw new Error(
            "Couldn't connect to the LOL client. Please refresh user details and/or restart the LOL client. Note: The LOL client must be running for this to work."
          );
        }
        throw Error(error.message);
      }
      throw Error("An unknown error occured");
    }
  }
}
