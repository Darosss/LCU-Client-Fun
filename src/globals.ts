export const CURRENT_LOL_VERSION = "13.17.1";
//TODO: move to env later or sth
export function ddragonLeagueOfLegendsBaseLink(
  suffixUrl: string,
  ver = CURRENT_LOL_VERSION,
  lang = "en_US"
) {
  return `http://ddragon.leagueoflegends.com/cdn/${ver}/data/${lang}/${suffixUrl}`;
}
