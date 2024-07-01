"use client";

import { BotDifficulty, ChampionBotsData } from "@/shared";
import React, { useContext, useState } from "react";

interface CustomLobbyContextType {
  championBots: ChampionBotsData[];
  setChampionBots: React.Dispatch<React.SetStateAction<ChampionBotsData[]>>;
  currentBotDifficulty: BotDifficulty;
  setCurrentBotDifficulty: React.Dispatch<React.SetStateAction<BotDifficulty>>;
}

export const initialCustomLobbyContextValue: CustomLobbyContextType = {
  championBots: [],
  setChampionBots: () => {},
  currentBotDifficulty: BotDifficulty.RSBEGINNER,
  setCurrentBotDifficulty: () => {},
};

export const CustomLobbyContext = React.createContext<CustomLobbyContextType>(
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

export const useCustomLobbyContext = (): Required<CustomLobbyContextType> => {
  const customLobbyContext = useContext(CustomLobbyContext);
  if (!customLobbyContext) {
    throw new Error(
      "useCustomLobbyContext must be used within a CustomLobbyContextProvider"
    );
  }
  return customLobbyContext as CustomLobbyContextType;
};
