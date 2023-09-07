import React, { useState } from "react";
import { BotDifficulty, ChampionBotsData } from "@lcu";

interface CustomLobbyContext {
  championBots: ChampionBotsData[];
  setChampionBots: React.Dispatch<React.SetStateAction<ChampionBotsData[]>>;
  currentBotDifficulty: BotDifficulty;
  setCurrentBotDifficulty: React.Dispatch<React.SetStateAction<BotDifficulty>>;
}

export const initialCustomLobbyContextValue: CustomLobbyContext = {
  championBots: [],
  setChampionBots: () => {},
  currentBotDifficulty: BotDifficulty.EASY,
  setCurrentBotDifficulty: () => {},
};

export const CustomLobbyContext = React.createContext<CustomLobbyContext>(
  initialCustomLobbyContextValue
);

export function CustomLobbyContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [championBots, setChampionBots] = useState<ChampionBotsData[]>(
    initialCustomLobbyContextValue.championBots
  );
  const [currentBotDifficulty, setCurrentBotDifficulty] =
    useState<BotDifficulty>(
      initialCustomLobbyContextValue.currentBotDifficulty
    );

  return (
    <CustomLobbyContext.Provider
      value={{
        championBots,
        setChampionBots,
        currentBotDifficulty,
        setCurrentBotDifficulty,
      }}
    >
      {children}
    </CustomLobbyContext.Provider>
  );
}
