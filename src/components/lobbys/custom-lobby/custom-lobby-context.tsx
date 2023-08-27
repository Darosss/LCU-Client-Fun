import React, { useState } from "react";
import {
  BotDifficulty,
  ChampionBotsData,
} from "../../../LCU/types/custom-mode";
import { lcuClientHandlerObj } from "../../../LCU/LCUClientHandler";

interface CustomLobbyContext {
  championBots: ChampionBotsData[];
  currentBotDifficulty: BotDifficulty;
  setCurrentBotDifficulty: React.Dispatch<React.SetStateAction<BotDifficulty>>;
}

export const initialCustomLobbyContextValue: CustomLobbyContext = {
  championBots: [],
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

  React.useEffect(() => {
    lcuClientHandlerObj
      .getAvailableChampionsBots()
      .then((championBots) => {
        setChampionBots(championBots);
      })
      .catch((err) =>
        console.log(`Error occured while getting available bot champions`, err)
      );
  }, []);

  return (
    <CustomLobbyContext.Provider
      value={{ championBots, currentBotDifficulty, setCurrentBotDifficulty }}
    >
      {children}
    </CustomLobbyContext.Provider>
  );
}
