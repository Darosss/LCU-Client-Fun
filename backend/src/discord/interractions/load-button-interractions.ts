import path from "path";
import fs from "fs";

import { Collection } from "discord.js";
import {
  ButtonInteractionFileReturnType,
  ClientWithCustomInterractions
} from "../types";

const BUTTON_INTERRACTIONS_PATH_FOLDER = path.join(__dirname, "buttons");

export const loadButtonInteractions = async (
  client: ClientWithCustomInterractions
) => {
  client.buttonInteractions = new Collection();
  const commandFiles = fs
    .readdirSync(BUTTON_INTERRACTIONS_PATH_FOLDER)
    .filter((fileName) => fileName.endsWith(".js"));
  for await (const cmdFile of commandFiles) {
    const command = (await import(
      path.join(BUTTON_INTERRACTIONS_PATH_FOLDER, cmdFile)
    )) as ButtonInteractionFileReturnType;

    if ("execute" in command && "customIdPrefix" in command) {
      const interractionsDataAsserted =
        command as ButtonInteractionFileReturnType;

      client.buttonInteractions.set(interractionsDataAsserted.customIdPrefix, {
        execute: interractionsDataAsserted.execute,
        executeOpts: {}
      });
      console.log(
        `Button interraction added ${interractionsDataAsserted.customIdPrefix}`
      );
    }
  }
};
