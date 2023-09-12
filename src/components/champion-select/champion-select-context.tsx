import React, { useState } from "react";
import {
  ChampSelectSessionDataRequiredWithActionsFlat,
  ChampSelectSessionTimerResponse,
  ChampSelectSummonerData,
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
  summonersData: Map<string, ChampSelectSummonerData>;
  updateSummonersDataByCellId: (
    cellId: string,
    data: ChampSelectSummonerData
  ) => void;
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
  summonersData: new Map(),
  updateSummonersDataByCellId: () => {},
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
  const [summonersData, setSummonersData] = useState(
    initialChampionSelectContextValue.summonersData
  );

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

  function updateSummonersDataByCellId(
    cellId: string,
    data: ChampSelectSummonerData
  ) {
    setSummonersData((prevData) => {
      prevData.set(cellId, data);
      return prevData;
    });
  }

  return (
    <ChampionSelectContext.Provider
      value={{
        champSelectLCUHandler,
        availableChamps,
        setAvailableChamps,
        champSelectSessionData,
        champSelectSessionTimer,
        summonersData,
        updateSummonersDataByCellId,
      }}
    >
      {children}
    </ChampionSelectContext.Provider>
  );
}
