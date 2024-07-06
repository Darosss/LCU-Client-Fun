import {
  ActionsChampSelectSessionData,
  ChampSelectSessionDataRequiredWithActionsFlat
} from "@/shared";
import { DiscordManager } from "./client";
import {
  createChampionSelectActionButton,
  createChampSelectEmbed
} from "./helpers";
import {
  BaseMessageOptions,
  EmbedBuilder,
  Message,
  MessagePayload
} from "discord.js";

class ChampSelectInfoHandler {
  private currentAction: ActionsChampSelectSessionData | null = null;
  private infoMessageInstance: Message | null = null;
  private championsModalInstance: Message | null = null;
  private chooseChampionButtonsInstance: Message | null = null;
  private canSendInfo = true;
  constructor() {}

  public async doInfoLogic(
    localPlayerCellId: number,
    data: ChampSelectSessionDataRequiredWithActionsFlat
  ) {
    if (localPlayerCellId === -1) return;
    //TODO: refactor to smaller.. Not readable at all
    if (!this.canSendInfo) return console.log("Cant' sent info - return ");
    const localPlayerActionInProgress = [
      ...data.actions.banActions,
      ...data.actions.pickActions
    ].find(
      (action) =>
        action.isInProgress && action.actorCellId === localPlayerCellId
    );

    if (
      !this.currentAction ||
      this.shouldUpdateEmbed(localPlayerActionInProgress)
    ) {
      localPlayerActionInProgress
        ? (this.currentAction = localPlayerActionInProgress)
        : null;

      const discordManager = await DiscordManager.getInstance();

      const summonerTeamEmbed = createChampSelectEmbed(
        "SUMMONER",
        data.myTeam,
        data.actions.banActions
      );
      const enemyTeamEmbed = createChampSelectEmbed(
        "ENEMY",
        data.theirTeam,
        data.actions.banActions
      );

      const embeds: EmbedBuilder[] = [];
      summonerTeamEmbed ? embeds.push(summonerTeamEmbed) : null;
      enemyTeamEmbed ? embeds.push(enemyTeamEmbed) : null;

      if (
        !summonerTeamEmbed &&
        !enemyTeamEmbed &&
        this.infoMessageInstance?.deletable
      ) {
        await this.removeInfoMessage();
      }

      if (this.infoMessageInstance?.editable) {
        const champSelectButton = localPlayerActionInProgress
          ? createChampionSelectActionButton(
              localPlayerActionInProgress.type === "pick"
                ? "pick"
                : localPlayerActionInProgress.type === "ban"
                  ? "ban"
                  : "none"
            )
          : null;

        await this.infoMessageInstance.edit({
          content: `Champ select`,
          embeds
        });
        champSelectButton
          ? await this.sendAsChampionsModal(
              { components: [champSelectButton] },
              discordManager
            )
          : null;
      } else {
        this.canSendInfo = false;

        const champSelectButton = localPlayerActionInProgress
          ? createChampionSelectActionButton(
              localPlayerActionInProgress.type === "pick"
                ? "pick"
                : localPlayerActionInProgress.type === "ban"
                  ? "ban"
                  : "none"
            )
          : null;

        const newSentMessage = await discordManager.sendMessage({
          content: `Champ select`,
          embeds
        });
        champSelectButton
          ? await this.sendAsChampionsModal(
              { components: [champSelectButton] },
              discordManager
            )
          : null;

        if (newSentMessage) this.infoMessageInstance = newSentMessage;
      }
    } else {
      await this.removeChooseChampionButtons();
    }
    this.canSendInfo = true;
  }

  private shouldUpdateEmbed(
    newAction?: ActionsChampSelectSessionData
  ): boolean {
    if (
      this.currentAction?.pickTurn !== newAction?.pickTurn ||
      newAction?.isInProgress ||
      newAction?.completed
    ) {
      return true;
    }

    return false;
  }

  private async sendAsChampionsModal(
    message: string | MessagePayload | BaseMessageOptions,
    discordManager: DiscordManager
  ) {
    try {
      if (this.championsModalInstance?.editable)
        await this.championsModalInstance.edit(message);
      else {
        this.championsModalInstance =
          (await discordManager.sendMessage(message)) || null;
      }
    } catch (err) {
      console.log(err, " aha");
      this.championsModalInstance =
        (await discordManager.sendMessage(message)) || null;
    }
  }

  public async sendAsChooseChampionButtons(
    message: string | MessagePayload | BaseMessageOptions
  ) {
    if (this.chooseChampionButtonsInstance?.editable)
      return await this.chooseChampionButtonsInstance.edit(message);

    const discordManager = await DiscordManager.getInstance();
    this.chooseChampionButtonsInstance =
      (await discordManager.sendMessage(message)) || null;
  }

  public async clearMessagesInstances() {
    await Promise.all([
      this.removeChampionsModalIfDeletable(),
      this.removeChooseChampionButtons(),
      this.removeInfoMessage
    ]);
  }

  private async removeInfoMessage() {
    try {
      return await this.infoMessageInstance?.delete();
      this.infoMessageInstance = null;
    } catch (err) {
      console.log("Couldn't delete infoMessageInstance message");
    }
  }

  private async removeChampionsModalIfDeletable() {
    try {
      await this.championsModalInstance?.delete();
      this.championsModalInstance = null;
    } catch (error) {
      console.log("Couldn't delete message in removeChampionsModalIfDeletable");
    }
  }

  public async removeChooseChampionButtons() {
    try {
      await this.chooseChampionButtonsInstance?.delete();
      this.chooseChampionButtonsInstance = null;
    } catch (error) {
      console.log("Couldn't delete message in removeChooseChampionButtons");
    }
  }
}

const champSelectInfoHandler = new ChampSelectInfoHandler();
export { champSelectInfoHandler };
