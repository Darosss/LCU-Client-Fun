import { ButtonInteraction } from "discord.js";

const execute = async (interaction: ButtonInteraction) => {
  return await interaction.reply("xd");
};

export { execute };
