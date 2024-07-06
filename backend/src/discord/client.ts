import {
  Client,
  Events,
  MessageCreateOptions,
  MessagePayload,
  TextBasedChannel
} from "discord.js";
import { ClientWithCustomInterractions } from "./types";
import { SEPARATOR_CUSTOM_ID_BUTTON } from "./helpers";
import { intents } from "./intents";
import { readLocalStorageData } from "../lcu";
import { loadButtonInteractions } from "./interractions/load-button-interractions";
import { loadModalInteractions } from "./interractions/load-modal-interractions";

//TODO: add option.discordOn ? login : null

class DiscordManager {
  private static instance: DiscordManager;
  private client: ClientWithCustomInterractions;
  private messageChannel: TextBasedChannel | null = null;
  private constructor() {
    this.client = new Client({ intents }) as ClientWithCustomInterractions;
    this.initClientOnEvents();
  }

  public static async getInstance() {
    if (!DiscordManager.instance) {
      DiscordManager.instance = new DiscordManager();
      await DiscordManager.instance.login();
    }
    return DiscordManager.instance;
  }

  public updateMessageChannel() {
    this.setMessageChannel();
  }

  private setMessageChannel() {
    this.messageChannel = this.getMessageChannelById() || null;
  }

  private initClientOnEvents() {
    this.client.once("ready", () => {
      console.log(`Logged in as ${this.client.user?.tag}`);
      this.setMessageChannel();
      loadButtonInteractions(this.client);
      loadModalInteractions(this.client);
    });

    this.client.on(Events.InteractionCreate, async (interaction) => {
      if (interaction.isButton()) {
        const customIdKey = interaction.customId
          .split(SEPARATOR_CUSTOM_ID_BUTTON)
          .at(0);

        if (!customIdKey) return;
        const buttonInterraction = (
          interaction.client as ClientWithCustomInterractions
        ).buttonInteractions.get(customIdKey);
        buttonInterraction?.execute(interaction);
      } else if (interaction.isModalSubmit()) {
        const customIdKey = interaction.customId
          .split(SEPARATOR_CUSTOM_ID_BUTTON)
          .at(0);

        if (!customIdKey) return;
        const modalInterraction = (
          interaction.client as ClientWithCustomInterractions
        ).modalInteractions.get(customIdKey);
        modalInterraction?.execute(interaction);
      }
    });
  }

  private async login() {
    await this.client.login(process.env.BOT_TOKEN);
  }

  private getMessageChannelById() {
    const messagesChannelId =
      readLocalStorageData().discord.channelIDForMessages;
    if (!messagesChannelId)
      return console.error("Channel ID not provided / Incorrect");
    const commandsChannel = this.client.channels.cache.get(messagesChannelId);
    if (!commandsChannel)
      return console.error(
        "I do not have sight to see this channel / Wrong id?"
      );
    else if (commandsChannel.isTextBased()) return commandsChannel;
    else console.error("Provided commands channel is not text based");
  }

  public async sendMessage(
    message: string | MessagePayload | MessageCreateOptions
  ) {
    try {
      return await this.messageChannel?.send(message);
    } catch (error) {
      console.error("Occured in sendMessage method", error);
    }
  }
}

export { DiscordManager };
