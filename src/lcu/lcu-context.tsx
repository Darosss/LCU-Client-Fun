import React, { useState } from "react";
import {
  AllRequiredDataDragon,
  ClientOptions,
  CurrentSummonerData,
  GameFlowPhaseData,
  LobbyGameDataResponse,
  lcuClientHandlerObj,
} from "./";

import { readDragonChampionsData, readDragonSpellsData } from "@helpers";
import {
  readLocalStorageData,
  writeLocalStorageData,
} from "./pseudo-local-storage";

interface LCUContext {
  options: ClientOptions;
  changeOptions: (value: Partial<ClientOptions>) => void;
  currentSummoner?: CurrentSummonerData;
  currentPhase: GameFlowPhaseData;
  setCurrentSummoner: React.Dispatch<
    React.SetStateAction<CurrentSummonerData | undefined>
  >;
  setCurrentPhase: React.Dispatch<React.SetStateAction<GameFlowPhaseData>>;
  lobbyData: LobbyGameDataResponse | null;
  lolDataDragon: AllRequiredDataDragon;
}

export const initialLCUContextValue: LCUContext = {
  options: readLocalStorageData(),
  changeOptions: () => {},
  currentPhase: "None",
  setCurrentSummoner: () => {},
  setCurrentPhase: () => {},
  lobbyData: null,
  lolDataDragon: { dataDragonChampions: [], dataDragonSpells: [] },
};

export const LCUContext = React.createContext<LCUContext>(
  initialLCUContextValue
);

export function LCUContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentSummoner, setCurrentSummoner] = useState<CurrentSummonerData>();
  const [currentPhase, setCurrentPhase] = useState<GameFlowPhaseData>(
    initialLCUContextValue.currentPhase
  );
  const [options, setOptions] = useState<ClientOptions>(
    initialLCUContextValue.options
  );

  const [lobbyData, setLobbyData] = useState<LobbyGameDataResponse | null>(
    null
  );
  const [lolDataDragon, setLolDataDragon] = useState<AllRequiredDataDragon>(
    initialLCUContextValue.lolDataDragon
  );

  function changeOptions(value: Partial<ClientOptions>) {
    setOptions((prevOpts) => ({ ...prevOpts, ...value }));

    writeLocalStorageData({ ...options, ...value });
  }

  React.useEffect(() => {
    lcuClientHandlerObj.init().then(() => {
      lcuClientHandlerObj
        .getCurrentSummoner()
        .then((currSummonerRes) => setCurrentSummoner(currSummonerRes))
        .catch((err) =>
          console.log("Error occured while getting current summoner data", err)
        );

      lcuClientHandlerObj.initLeagueWS().then(() => {
        lcuClientHandlerObj.wsOnGameflowPhaseChange((state) => {
          setCurrentPhase(state);
        });

        lcuClientHandlerObj
          .wsOnLobbyGet((lobbyData) => {
            setLobbyData(lobbyData);
          })
          .catch((err) =>
            console.log(`Error occured while get lobby with ws`, err)
          );
      });

      readDragonChampionsData().then((championsData) => {
        setLolDataDragon((prevState) => ({
          ...prevState,
          dataDragonChampions: championsData,
        }));
      });

      readDragonSpellsData().then((spellsData) =>
        setLolDataDragon((prevState) => ({
          ...prevState,
          dataDragonSpells: spellsData,
        }))
      );
    });
  }, []);

  return (
    <LCUContext.Provider
      value={{
        options,
        changeOptions,
        currentPhase,
        setCurrentPhase,
        setCurrentSummoner,
        currentSummoner,
        lobbyData,
        lolDataDragon,
      }}
    >
      {children}
    </LCUContext.Provider>
  );
}
