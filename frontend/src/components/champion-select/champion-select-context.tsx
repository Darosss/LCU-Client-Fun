"use client";

import {
  ChampSelectSessionDataRequiredWithActionsFlat,
  ChampSelectSessionTimerResponse,
  ChampSelectSummonerData,
  ChampionData,
  DataDragonSpellsJsonFileData,
} from "@/shared";
import React, { useContext, useState } from "react";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";

interface ChampionSelectContext {
  champSelectSessionData: ChampSelectSessionDataRequiredWithActionsFlat;
  champSelectSessionTimer: ChampSelectSessionTimerResponse | null;
  availableChamps: ChampionData[];
  setAvailableChamps: React.Dispatch<React.SetStateAction<ChampionData[]>>;
  summonersData: Map<string, ChampSelectSummonerData>;
  updateSummonersDataByCellId: (
    cellId: string,
    data: ChampSelectSummonerData
  ) => void;
  summonerSpellsData: DataDragonSpellsJsonFileData[];
}

export const initialChampionSelectContextValue: ChampionSelectContext = {
  champSelectSessionData: {
    myTeam: [],
    actions: { pickActions: [], banActions: [] },
    theirTeam: [],
    bans: { myTeamBans: [], numBans: 0, theirTeamBans: [] },
    localPlayerCellId: -1,
  },
  champSelectSessionTimer: null,
  availableChamps: [],
  setAvailableChamps: () => {},
  summonersData: new Map(),
  updateSummonersDataByCellId: () => {},
  summonerSpellsData: [],
};

export const ChampionSelectContext = React.createContext<ChampionSelectContext>(
  initialChampionSelectContextValue
);

export function ChampionSelectContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { events, emits } = useSocketEventsContext();
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

  const [summonerSpellsData, setSummonersSpellsData] = useState<
    DataDragonSpellsJsonFileData[]
  >([]);

  const { myTeam, theirTeam } = champSelectSessionData;

  React.useEffect(() => {
    events.championSelectPhase.on((data) => {
      setChampSelectSessionData(data);
    });

    return () => {
      events.championSelectPhase.off();
    };
  }, [events]);

  React.useEffect(() => {
    emits.getChampionSelectPhaseData((error, data) => {
      if (error || !data)
        return toast.error(error || "Coulnd't find champion select phase data");

      setChampSelectSessionData(data);
    });

    if (myTeam.length <= 0) return;
    const countOfSummoners = myTeam.length + theirTeam.length;
    for (let i = 0; i < countOfSummoners; i++) {
      emits.getChampionSelectSummonerCellId(i, (error, data) => {
        if (error || !data)
          return toast.info(
            error || "No data found while trying to set summoners data"
          );
        updateSummonersDataByCellId(String(i), data);
      });
    }
  }, [emits, myTeam.length, theirTeam.length]);

  React.useEffect(() => {
    emits.getChampionSelectSessionTimer((error, data) => {
      if (error || !data)
        return toast.error(
          error || "Couldn't get champion select session timer"
        );

      setChampSelectSessionTimer(data);
    });
    emits.getSummonerSpellsData((error, data) => {
      if (error || !data)
        return toast.error(error || "Couldn't get summoner spells data");

      setSummonersSpellsData(data);
    });
  }, [emits]);

  function updateSummonersDataByCellId(
    cellId: string,
    data: ChampSelectSummonerData
  ) {
    setSummonersData((prevData) => {
      prevData.set(cellId, data);
      return new Map(prevData);
    });
  }

  return (
    <ChampionSelectContext.Provider
      value={{
        availableChamps,
        setAvailableChamps,
        champSelectSessionData,
        champSelectSessionTimer,
        summonersData,
        updateSummonersDataByCellId,
        summonerSpellsData,
      }}
    >
      {children}
    </ChampionSelectContext.Provider>
  );
}

export const useChampionSelectContext = (): Required<ChampionSelectContext> => {
  const championSelectContext = useContext(ChampionSelectContext);
  if (!championSelectContext) {
    throw new Error(
      "useHeadContext must be used within a ChampionSelectContextProvider"
    );
  }
  return championSelectContext as ChampionSelectContext;
};
