import React, { useState } from "react";
import { ChampSelectSessionDataRequiredWithActionsFlat } from "../../LCU/types";
import { lcuClientHandlerObj } from "../../LCU/LCUClientHandler";

//TODO: move data dragon to lcu context
interface ChampionSelectContext {
  champSelectSessionData: ChampSelectSessionDataRequiredWithActionsFlat;
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

  React.useEffect(() => {
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
        champSelectSessionData,
      }}
    >
      {children}
    </ChampionSelectContext.Provider>
  );
}
