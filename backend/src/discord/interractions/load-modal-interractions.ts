import path from "path";
import fs from "fs";

import { Collection } from "discord.js";
import {
  ModalInteractionFileReturnType,
  ClientWithCustomInterractions
} from "../types";

const MODAL_INTERRACTIONS_PATH_FOLDER = path.join(__dirname, "modals");

export const loadModalInteractions = async (
  client: ClientWithCustomInterractions
) => {
  client.modalInteractions = new Collection();
  const commandFiles = fs
    .readdirSync(MODAL_INTERRACTIONS_PATH_FOLDER)
    .filter((fileName) => fileName.endsWith(".js"));
  for await (const cmdFile of commandFiles) {
    const command = (await import(
      path.join(MODAL_INTERRACTIONS_PATH_FOLDER, cmdFile)
    )) as ModalInteractionFileReturnType;

    if ("execute" in command && "customIdPrefix" in command) {
      const interractionsDataAsserted =
        command as ModalInteractionFileReturnType;

      client.modalInteractions.set(interractionsDataAsserted.customIdPrefix, {
        execute: interractionsDataAsserted.execute,
        executeOpts: {}
      });
      console.log(
        `Modal interraction added ${interractionsDataAsserted.customIdPrefix}`
      );
    }
  }
};
