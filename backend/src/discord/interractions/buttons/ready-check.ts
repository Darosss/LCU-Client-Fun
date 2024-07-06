import { ButtonInteraction } from "discord.js";
import { ButtonInterractionsList } from "../../enums";
import { SEPARATOR_CUSTOM_ID_BUTTON } from "../../helpers";
import { ManageReadyCheckMatchActions } from "@/shared";
import { lcuHandlerFactory } from "@/src/lcu";
import { readyCheckInfoHandler } from "../../ready-check-info";

const BUTTON_CUSTOM_ID_PREFIX = ButtonInterractionsList.READY_CHECK;
const execute = async (interaction: ButtonInteraction) => {
  const [, action] = interaction.customId.split(SEPARATOR_CUSTOM_ID_BUTTON) as [
    string,
    ManageReadyCheckMatchActions
  ];

  lcuHandlerFactory.getLobbyHandler()?.manageMatchReadyCheck(action);

  await interaction.reply(`Match: ${action}`);

  await readyCheckInfoHandler.removeReadyCheckMessage();
};

export { execute, BUTTON_CUSTOM_ID_PREFIX as customIdPrefix };
