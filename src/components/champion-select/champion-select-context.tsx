import React, { useState } from "react";
import {
  ChampSelectSessionDataRequiredWithActionsFlat,
  ChampSelectSessionTimerResponse,
  ChampionData,
  lcuClientHandlerObj,
} from "@lcu";

interface ChampionSelectContext {
  champSelectSessionData: ChampSelectSessionDataRequiredWithActionsFlat;
  champSelectSessionTimer: ChampSelectSessionTimerResponse | null;
  availableChamps: ChampionData[];
  setAvailableChamps: React.Dispatch<React.SetStateAction<ChampionData[]>>;
}

export const initialChampionSelectContextValue: ChampionSelectContext = {
  champSelectSessionData: {
    myTeam: [],
    actions: {
      pickActions: [],
      banActions: [],
    },
    theirTeam: [],
    bans: {
      myTeamBans: [],
      numBans: 0,
      theirTeamBans: [],
    },
    localPlayerCellId: -1,
  },
  champSelectSessionTimer: null,
  availableChamps: [],
  setAvailableChamps: () => {},
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

  const [availableChamps, setAvailableChamps] = useState<ChampionData[]>([]);

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
    if (champSelectSessionData.myTeam.length <= 0) return;
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
        availableChamps,
        setAvailableChamps,
        champSelectSessionData,
        champSelectSessionTimer,
      }}
    >
      {children}
    </ChampionSelectContext.Provider>
  );
}
