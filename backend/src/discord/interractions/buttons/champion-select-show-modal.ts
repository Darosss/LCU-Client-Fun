import {
  ActionRowBuilder,
  ButtonInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} from "discord.js";
import {
  ButtonInterractionsList,
  ChampionSelectActions,
  ModalInterractionsList
} from "../../enums";
import { SEPARATOR_CUSTOM_ID_BUTTON } from "../../helpers";

const BUTTON_CUSTOM_ID_PREFIX = ButtonInterractionsList.CHAMPION_SELECT_ACTION;
const execute = async (interaction: ButtonInteraction) => {
  const customIDSplit = interaction.customId.split(SEPARATOR_CUSTOM_ID_BUTTON);

  const currentAction = customIDSplit.at(-1) as ChampionSelectActions;

  const modal = new ModalBuilder()
    .setCustomId(ModalInterractionsList.CHAMPION_SELECT_FIND_CHAMPION_MODAL)
    .setTitle(`${currentAction} champion`);

  const championName = new TextInputBuilder()
    .setCustomId(
      `${ModalInterractionsList.CHAMPION_SELECT_FIND_CHAMPION_MODAL_INPUT}${SEPARATOR_CUSTOM_ID_BUTTON}${currentAction}`
    )
    .setLabel("Provide champion name")
    .setStyle(TextInputStyle.Short);

  const firstActionRow = new ActionRowBuilder().addComponents(championName);

  //@ts-expect-error In documentation it says it's ok...Later check it
  modal.addComponents(firstActionRow);

  await interaction.showModal(modal);
};

export { execute, BUTTON_CUSTOM_ID_PREFIX as customIdPrefix };
