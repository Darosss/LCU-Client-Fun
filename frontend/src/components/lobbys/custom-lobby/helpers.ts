import { BotDifficulty } from "@/shared";

export const getBotDifficultyBtnColor = (currentDifficulty: BotDifficulty) => {
  switch (currentDifficulty) {
    case BotDifficulty.RSINTRO:
      return "success";
    case BotDifficulty.RSBEGINNER:
      return "info";
    case BotDifficulty.RSINTERMEDIATE:
      return "danger";
  }
};

export const changeBotDifficulty = (currentDifficulty: BotDifficulty) => {
  switch (currentDifficulty) {
    case BotDifficulty.RSINTRO:
      return BotDifficulty.RSBEGINNER;
    case BotDifficulty.RSBEGINNER:
      return BotDifficulty.RSINTERMEDIATE;
    case BotDifficulty.RSINTERMEDIATE:
      return BotDifficulty.RSINTRO;
  }
};
