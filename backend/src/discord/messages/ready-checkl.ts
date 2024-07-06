import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from "discord.js";
import { ButtonInterractionsList } from "../enums";
import { SEPARATOR_CUSTOM_ID_BUTTON } from "../helpers";

export const createReadyCheckMessageData = () => {
  const embed = new EmbedBuilder()
    .setTitle("Ready check")
    .setDescription("Accept or decline a ready check");

  const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents([
    new ButtonBuilder()
      .setCustomId(
        `${ButtonInterractionsList.READY_CHECK}${SEPARATOR_CUSTOM_ID_BUTTON}accept`
      )
      .setLabel("Accept")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(
        `${ButtonInterractionsList.READY_CHECK}${SEPARATOR_CUSTOM_ID_BUTTON}decline`
      )
      .setLabel("Decline")
      .setStyle(ButtonStyle.Danger)
  ]);

  return { embed, buttons };
};
