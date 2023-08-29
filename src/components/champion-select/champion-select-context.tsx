import React, { useState } from "react";
import { ChampSelectSessionDataRequiredWithActionsFlat } from "../../LCU/types";
import { lcuClientHandlerObj } from "../../LCU/LCUClientHandler";

interface ChampionSelectContext {
  champSelectSessionData: ChampSelectSessionDataRequiredWithActionsFlat;
  currentSummonerCellId: number;
  changeCurrentSummonerCellId: (value: number) => void;
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

  React.useEffect(() => {
    lcuClientHandlerObj
      .wsOnChampionSelectPhase((data) => {
        setChampSelectSessionData(data);
      })
      .catch((err) =>
        console.log(`Error occured while getting session champ select`, err)
      );
  }, []);

  function changeCurrentSummonerCellId(value: number) {
    setCurrentSummonerCellId(value);
  }

  return (
    <ChampionSelectContext.Provider
      value={{
        champSelectSessionData,
        currentSummonerCellId,
        changeCurrentSummonerCellId,
      }}
    >
      {children}
    </ChampionSelectContext.Provider>
  );
}
