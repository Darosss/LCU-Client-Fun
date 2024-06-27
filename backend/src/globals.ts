import path from "path";

export const CURRENT_LOL_VERSION = "13.18.1";
//TODO: move to env later or sth
export function ddragonLeagueOfLegendsBaseLink(
  suffixUrl: string,
  ver = CURRENT_LOL_VERSION,
  lang = "en_US"
) {
  return `http://ddragon.leagueoflegends.com/cdn/${ver}/data/${lang}/${suffixUrl}`;
}

export const BASE_RAW_COMMUNITY_DRAGON_GAME_DATA =
  "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default";

export const FOLDER_NAME_DOWNLODED_CONENT = "downloaded";
export const FOLDER_PATH_DOWNLOADED_CONTENT = path.join(
  __dirname,
  FOLDER_NAME_DOWNLODED_CONENT
);
