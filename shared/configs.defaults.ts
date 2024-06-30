import { ClientOptions } from "./lcu-types";

export const configsDefaults: ClientOptions = {
  autoAccept: true,
  autoPickChamps: {
    utility: [],
    middle: [],
    top: [],
    bottom: [],
    jungle: [],
    other: [],
  },
  autoPickChamp: false,
  preventRiotClientToTurnOn: false,
  runes: {
    swapSpells: false,
    changeSpells: true,
  },
  championSelect: {
    showImages: false,
  },
};
