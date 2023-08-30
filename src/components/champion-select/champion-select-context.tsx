import React, { useState } from "react";
import {
  ChampSelectSessionDataRequiredWithActionsFlat,
  ChampSelectSessionTimerResponse,
} from "../../LCU/types";
import { lcuClientHandlerObj } from "../../LCU/LCUClientHandler";

interface ChampionSelectContext {
  champSelectSessionData: ChampSelectSessionDataRequiredWithActionsFlat;
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
    localPlayerCellId: -1,
  },
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

  return (
    <ChampionSelectContext.Provider
      value={{
        champSelectSessionData,
        champSelectSessionTimer,
      }}
    >
      {children}
    </ChampionSelectContext.Provider>
  );
}
