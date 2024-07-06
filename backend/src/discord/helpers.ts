import {
  ActionsChampSelectSessionData,
  shuffleArrayRandomly,
  TeamChampSelectSessionData
} from "@/shared";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from "discord.js";
import { dragonChampionsData, findChampionById } from "../helpers";
import { ButtonInterractionsList, ChampionSelectActions } from "./enums";

export const SEPARATOR_CUSTOM_ID_BUTTON = ":::";

export const createChampSelectEmbed = (
  team: "ENEMY" | "SUMMONER",
  data: TeamChampSelectSessionData[],
  banActions: ActionsChampSelectSessionData[]
) => {
  if (data.length === 0) return;
  const bansList = banActions.map((action) => {
    if (team === "SUMMONER" && action.isAllyAction)
      return `${findChampionById(dragonChampionsData, action.championId)?.name || action.championId || "-"}`;
    else if (team === "ENEMY" && !action.isAllyAction)
      return `${findChampionById(dragonChampionsData, action.championId)?.name || action.championId || "-"}`;
    else return "";
  });
  const embed = new EmbedBuilder()
    .setTitle(`Champion select ${team}`)
    .setColor(team === "SUMMONER" ? "Blue" : "Red")
    .addFields([
      {
        name: "BANS",
        value: bansList.join(" - ") || "No bans",
        inline: true
      },
      ...data.map((team) => ({
        name: `Summoner: ${team.cellId}`,
        value: `${findChampionById(dragonChampionsData, team.championId)?.name || team.championId || "-"} 

        `
      }))
    ]);

  return embed;
};

export const createChampionSelectActionButton = (
  currentSummonerAction: "pick" | "ban" | "none"
) => {
  if (currentSummonerAction === "none") return;

  let button: ButtonBuilder;
  if (currentSummonerAction === "ban") {
    button = new ButtonBuilder()
      .setCustomId(
        `${ButtonInterractionsList.CHAMPION_SELECT_ACTION}${SEPARATOR_CUSTOM_ID_BUTTON}${ChampionSelectActions.ban}`
      )
      .setLabel("Click to open ban champion modal")
      .setStyle(ButtonStyle.Danger);
  } else {
    button = new ButtonBuilder()
      .setCustomId(
        `${ButtonInterractionsList.CHAMPION_SELECT_ACTION}${SEPARATOR_CUSTOM_ID_BUTTON}${ChampionSelectActions.pick}`
      )
      .setLabel("Click to open pick champion modal")
      .setStyle(ButtonStyle.Primary);
  }

  return new ActionRowBuilder<ButtonBuilder>().addComponents(button);
};

export const messageChooseChampionSelectAction = (
  championFilter: string,
  currentAction: ChampionSelectActions
) => {
  const foundChamps = dragonChampionsData.filter((champ) =>
    champ.name.toLowerCase().includes(championFilter.toLowerCase())
  );

  if (foundChamps.length === 0)
    foundChamps.push(...shuffleArrayRandomly(dragonChampionsData));

  const buttonComponents = foundChamps.slice(0, 5).map((champ) =>
    new ButtonBuilder()
      .setCustomId(
        `${ButtonInterractionsList.CHAMPION_SELECT_CHOOSE_CHAMPION}${SEPARATOR_CUSTOM_ID_BUTTON}${currentAction}${SEPARATOR_CUSTOM_ID_BUTTON}${champ.id}`
      )
      .setLabel(champ.name || `Pick ${champ.id}`)
      .setStyle(
        currentAction === ChampionSelectActions.pick
          ? ButtonStyle.Primary
          : ButtonStyle.Danger
      )
  );
  const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
    buttonComponents
  );
  return {
    content: `Choose champion to ${currentAction} `,
    actionRow
  };
};
