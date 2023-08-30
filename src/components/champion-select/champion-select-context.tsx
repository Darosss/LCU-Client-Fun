import React, { useState } from "react";
import {
  ChampSelectSessionDataRequiredWithActionsFlat,
  ChampSelectSessionTimerResponse,
} from "../../LCU/types";
import { lcuClientHandlerObj } from "../../LCU/LCUClientHandler";

interface ChampionSelectContext {
  champSelectSessionData: ChampSelectSessionDataRequiredWithActionsFlat;
  currentSummonerCellId: number;
  changeCurrentSummonerCellId: (value: number) => void;
  champSelectSessionTimer: ChampSelectSessionTimerResponse | null;
}

export const initialChampionSelectContextValue: ChampionSelectContext = {
  champSelectSessionData: {
    myTeam: [],
    actions: [],
    theirTeam: [],
    bans: {
      myTeamBans: [],
      numBans: 0,
      theirTeamBans: [],
    },
  },
  currentSummonerCellId: -1,
  changeCurrentSummonerCellId: () => {},
  champSelectSessionTimer: null,
};

export const ChampionSelectContext = React.createContext<ChampionSelectContext>(
  initialChampionSelectContextValue
);

export function ChampionSelectContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [champSelectSessionData, setChampSelectSessionData] =
    useState<ChampSelectSessionDataRequiredWithActionsFlat>(
      initialChampionSelectContextValue.champSelectSessionData
    );
  const [currentSummonerCellId, setCurrentSummonerCellId] = useState(-1);

  const [champSelectSessionTimer, setChampSelectSessionTimer] =
    useState<ChampSelectSessionTimerResponse | null>(null);

  React.useEffect(() => {
    lcuClientHandlerObj
      .wsOnChampionSelectPhase((data) => {
        setChampSelectSessionData(data);
      })
      .catch((err) =>
        console.log(`Error occured while getting session champ select`, err)
      );
  }, []);

  React.useEffect(() => {
    if (champSelectSessionData.actions.length <= 0) return;

    lcuClientHandlerObj
      .getChampSelectSessionTimer()
      .then((timerSessionData) => {
        if (
          champSelectSessionTimer === null ||
          champSelectSessionTimer.internalNowInEpochMs !==
            timerSessionData.internalNowInEpochMs
        ) {
          setChampSelectSessionTimer(timerSessionData);
        }
      })
      .catch((err) =>
        console.log(`Error occured while getting session champ select`, err)
      );
  }, [champSelectSessionData]);

  function changeCurrentSummonerCellId(value: number) {
    setCurrentSummonerCellId(value);
  }

  return (
    <ChampionSelectContext.Provider
      value={{
        champSelectSessionData,
        currentSummonerCellId,
        changeCurrentSummonerCellId,
        champSelectSessionTimer,
      }}
    >
      {children}
    </ChampionSelectContext.Provider>
  );
}
