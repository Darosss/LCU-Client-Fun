//   const currentActionName = splitCustomIdInput.at(-1);

import { ButtonInteraction } from "discord.js";
import { ButtonInterractionsList, ChampionSelectActions } from "../../enums";
import { champSelectInfoHandler } from "../../champ-select-info";
import { SEPARATOR_CUSTOM_ID_BUTTON } from "../../helpers";
import { lcuHandlerFactory } from "@/src/lcu";
const BUTTON_CUSTOM_ID_PREFIX =
  ButtonInterractionsList.CHAMPION_SELECT_CHOOSE_CHAMPION;
const execute = async (interaction: ButtonInteraction) => {
  const customIdSplit = interaction.customId.split(
    SEPARATOR_CUSTOM_ID_BUTTON
  ) as [string, ChampionSelectActions, number];

  const champSelectHandler = lcuHandlerFactory.getChampionSelectHandler();
  if (!champSelectHandler) {
    return console.log("No champ select handler");
  }

  const [, currentAction, championId] = customIdSplit;

  const { actions, localPlayerCellId } =
    await champSelectHandler.getChampionSelectPhaseData();

  const actionData =
    currentAction === "pick"
      ? actions.pickActions.find(
          (action) =>
            action.actorCellId === localPlayerCellId && action.isInProgress
        )
      : actions.banActions.find(
          (action) =>
            action.actorCellId === localPlayerCellId && action.isInProgress
        );

  if (!actionData)
    return interaction.reply(
      "No current action. Either you're too late to choose / bad action (pick/ban) or something went wrong"
    );

  champSelectHandler.champSelectAction({
    championId,
    completed: true,
    actionId: actionData.id
  });

  await champSelectInfoHandler.removeChooseChampionButtons();

  interaction
    .reply({ content: "All good", fetchReply: true })
    .then((message) => {
      message.deletable ? message.delete() : null;
    })
    .catch(console.error);
};

export { execute, BUTTON_CUSTOM_ID_PREFIX as customIdPrefix };
