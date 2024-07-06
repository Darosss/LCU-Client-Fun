import {
  ButtonInteraction,
  Client,
  Collection,
  ModalSubmitInteraction
} from "discord.js";
import { ButtonInterractionsList } from "./enums";

type ButtonInteractionExecute = (interaction: ButtonInteraction) => unknown;
type ModalInteractionExecute = (interaction: ModalSubmitInteraction) => unknown;

export type BaseExecuteOptions = unknown;

export type CollectionData<ExecuteType> = {
  execute: ExecuteType;
  executeOpts?: BaseExecuteOptions;
};

type ClientButtonInteractionCollectionData =
  CollectionData<ButtonInteractionExecute>;

type ClientModalInteractionCollectionData =
  CollectionData<ModalInteractionExecute>;

export type ClientWithCustomInterractions = Client & {
  buttonInteractions: Collection<string, ClientButtonInteractionCollectionData>;
  modalInteractions: Collection<string, ClientModalInteractionCollectionData>;
};

export type BaseInteractionFileReturnType<ExecuteType> = {
  execute: ExecuteType;
  customIdPrefix: ButtonInterractionsList;
};

export type ButtonInteractionFileReturnType =
  BaseInteractionFileReturnType<ButtonInteractionExecute>;
export type ModalInteractionFileReturnType =
  BaseInteractionFileReturnType<ModalInteractionExecute>;
