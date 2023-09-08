import { BaseLCUHandler } from "./base-lcu-handler";
import { BaseLCUHandlerOpts, FriendsListData } from "./types";

interface SocialLCUHandlerOpts extends BaseLCUHandlerOpts {}

export class SocialLCUHandler extends BaseLCUHandler {
  constructor({ credentials, leagueWS }: SocialLCUHandlerOpts) {
    super({ credentials, leagueWS });
  }

  public async getCurrentFriendsList(): Promise<FriendsListData[]> {
    const response = await this.makeAHttp1Request({
      url: "/lol-chat/v1/friends",
      method: "GET",
    });

    const friendList = response.json() as FriendsListData[];
    return friendList;
  }
}
