import React, { useState } from "react";
import {
  ChampSelectSessionDataRequiredWithActionsFlat,
  ChampSelectSessionTimerResponse,
  ChampionData,
  lcuHandlerFactory,
} from "@lcu";
import { ChampSelectLCUHandler } from "lcu/champ-select-lcu-handler";

interface ChampionSelectContext {
  champSelectLCUHandler: ChampSelectLCUHandler | null;
  champSelectSessionData: ChampSelectSessionDataRequiredWithActionsFlat;
  champSelectSessionTimer: ChampSelectSessionTimerResponse | null;
  availableChamps: ChampionData[];
  setAvailableChamps: React.Dispatch<React.SetStateAction<ChampionData[]>>;
}

export const initialChampionSelectContextValue: ChampionSelectContext = {
  champSelectLCUHandler: null,
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
  const [champSelectLCUHandler, setChampSelectLCUHandler] =
    useState<ChampSelectLCUHandler | null>(
      initialChampionSelectContextValue.champSelectLCUHandler
    );

  const [champSelectSessionData, setChampSelectSessionData] =
    useState<ChampSelectSessionDataRequiredWithActionsFlat>(
      initialChampionSelectContextValue.champSelectSessionData
    );

  const [champSelectSessionTimer, setChampSelectSessionTimer] =
    useState<ChampSelectSessionTimerResponse | null>(null);

  const [availableChamps, setAvailableChamps] = useState<ChampionData[]>([]);

  React.useEffect(() => {
    const champSelectHandlerObj = lcuHandlerFactory.createChampSelectHandler();

    champSelectHandlerObj.wsOnChampionSelectPhase((error, data) => {
      if (error || !data) return;
      setChampSelectSessionData(data);
    });

    setChampSelectLCUHandler(champSelectHandlerObj);

    return () => {
      champSelectHandlerObj?.unsubscribeOnChampionSelectPhase();
    };
  }, [lcuHandlerFactory]);

  React.useEffect(() => {
    if (champSelectSessionData.myTeam.length <= 0 || !champSelectLCUHandler)
      return;
    champSelectLCUHandler
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
  }, [champSelectSessionData, champSelectLCUHandler]);

  return (
    <ChampionSelectContext.Provider
      value={{
        champSelectLCUHandler,
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
