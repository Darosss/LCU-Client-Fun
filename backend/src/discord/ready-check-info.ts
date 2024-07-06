import { DiscordManager } from "./client";
import { Message } from "discord.js";
import { createReadyCheckActionsButtons } from "./helpers";

class ReadyCheckInfoHandler {
  private readyCheckMessageInstance: Message | null = null;
  constructor() {}

  public async sendReadyCheckMessage() {
    await this.removeReadyCheckMessage();

    const discordManager = await DiscordManager.getInstance();
    this.readyCheckMessageInstance =
      (await discordManager.sendMessage({
        content: "Ready check",
        components: [createReadyCheckActionsButtons()]
      })) || null;
  }

  public async removeReadyCheckMessage() {
    if (this.readyCheckMessageInstance?.deletable)
      await this.readyCheckMessageInstance.delete();
  }
}

const readyCheckInfoHandler = new ReadyCheckInfoHandler();
export { readyCheckInfoHandler };
