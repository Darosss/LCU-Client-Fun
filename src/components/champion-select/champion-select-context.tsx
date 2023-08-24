import React, { useState } from "react";
import {
  ChampSelectSessionDataRequiredWithActionsFlat,
  DataDragonChampionsJsonFileData,
  DataDragonSpellsJsonFileData,
} from "../../LCU/types";
import { readDragonChampionsData } from "../../helpers";
import { readDragonSpellsData } from "../../helpers/spellsfetch";
import { lcuClientHandlerObj } from "../../LCU/LCUClientHandler";

interface ChampionSelectContext {
  dataDragonChampions: DataDragonChampionsJsonFileData[];
  dataDragonSpells: DataDragonSpellsJsonFileData[];
  findSummonerSpellById(spellId: number): string;
  findChampionById(spellId: number): string;

  champSelectSessionData: ChampSelectSessionDataRequiredWithActionsFlat;
}

export const initialChampionSelectContextValue: ChampionSelectContext = {
  dataDragonChampions: [],
  dataDragonSpells: [],
  findSummonerSpellById: () => {
    return "";
  },
  findChampionById: () => {
    return "";
  },
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
};

export const ChampionSelectContext = React.createContext<ChampionSelectContext>(
  initialChampionSelectContextValue
);

export function ChampionSelectContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dataDragonChampions, setDragonDataChampions] = useState<
    DataDragonChampionsJsonFileData[]
  >([]);
  const [dataDragonSpells, setDataDragonSpells] = useState<
    DataDragonSpellsJsonFileData[]
  >([]);

  const [champSelectSessionData, setChampSelectSessionData] =
    useState<ChampSelectSessionDataRequiredWithActionsFlat>(
      initialChampionSelectContextValue.champSelectSessionData
    );

  function findSummonerSpellById(spellId: number) {
    return (
      dataDragonSpells.find(({ id }) => id === spellId)?.name || String(spellId)
    );
  }
  function findChampionById(championId: number) {
    return (
      dataDragonChampions.find(({ id }) => id === championId)?.name ||
      String(championId)
    );
  }

  React.useEffect(() => {
    readDragonChampionsData().then((championsData) =>
      setDragonDataChampions(championsData)
    );

    readDragonSpellsData().then((spellsData) =>
      setDataDragonSpells(spellsData)
    );

    lcuClientHandlerObj
      .wsOnChampionSelectPhase((data) => {
        setChampSelectSessionData(data);
      })
      .catch((err) =>
        console.log(`Error occured while getting session champ select`, err)
      );
  }, []);

  return (
    <ChampionSelectContext.Provider
      value={{
        dataDragonChampions,
        dataDragonSpells,
        findSummonerSpellById,
        findChampionById,
        champSelectSessionData,
      }}
    >
      {children}
    </ChampionSelectContext.Provider>
  );
}
