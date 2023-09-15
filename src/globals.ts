export const CURRENT_LOL_VERSION = "13.17.1";
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
