import { ModalSubmitInteraction } from "discord.js";
import { ChampionSelectActions, ModalInterractionsList } from "../../enums";
import {
  messageChooseChampionSelectAction,
  SEPARATOR_CUSTOM_ID_BUTTON
} from "../../helpers";
import { champSelectInfoHandler } from "../../champ-select-info";

const MODAL_CUSTOM_ID_PREFIX =
  ModalInterractionsList.CHAMPION_SELECT_FIND_CHAMPION_MODAL;

const execute = async (interaction: ModalSubmitInteraction) => {
  const foundInput = [...interaction.fields.fields.entries()].find(([key]) =>
    key
      .toLowerCase()
      .includes(
        ModalInterractionsList.CHAMPION_SELECT_FIND_CHAMPION_MODAL_INPUT.toLowerCase()
      )
  );
  if (!foundInput)
    throw new Error(
      `You need to provide input with customID containing ${ModalInterractionsList.CHAMPION_SELECT_FIND_CHAMPION_MODAL_INPUT}`
    );

  const splitCustomIdInput = foundInput[0].split(SEPARATOR_CUSTOM_ID_BUTTON);

  const championName = foundInput[1].value;
  const currentAction = splitCustomIdInput.at(-1) as ChampionSelectActions;

  const { content, actionRow } = messageChooseChampionSelectAction(
    championName,
    currentAction
  );

  interaction
    .reply({ content: "All good", fetchReply: true })
    .then((message) => {
      message.deletable ? message.delete() : null;
    })
    .catch(console.error);

  champSelectInfoHandler.sendAsChooseChampionButtons({
    content,
    components: [actionRow]
  });
};

export { execute, MODAL_CUSTOM_ID_PREFIX as customIdPrefix };
