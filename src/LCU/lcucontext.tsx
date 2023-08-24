import React, { useState } from "react";
import {
  ClientOptions,
  CurrentSummonerData,
  GameFlowPhaseData,
  LobbyGameConfig,
} from "./types/";
import { lcuClientHandlerObj } from "./LCUClientHandler";
import {
  readLocalStorageData,
  writeLocalStorageData,
} from "./pseudoLocalStorage";

interface LCUContext {
  options: ClientOptions;
  changeOptions: (value: ClientOptions) => void;
  currentSummoner?: CurrentSummonerData;
  currentPhase: GameFlowPhaseData;
  setCurrentSummoner: React.Dispatch<
    React.SetStateAction<CurrentSummonerData | undefined>
  >;
  setCurrentPhase: React.Dispatch<React.SetStateAction<GameFlowPhaseData>>;
  currentLobbyConfig?: LobbyGameConfig;
  changeCurrentLobbyConfig: (value: LobbyGameConfig) => void;
}

export const initialLCUContextValue: LCUContext = {
  options: {
    autoAccept: false,
  },
  changeOptions: () => {},
  currentPhase: "ChampSelect",
  setCurrentSummoner: () => {},
  setCurrentPhase: () => {},
  changeCurrentLobbyConfig: () => {},
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
  const [options, setOptions] = useState<ClientOptions>({
    autoAccept: false,
  });
  const [currentLobbyConfig, setCurrentLobbyConfig] =
    useState<LobbyGameConfig>();

  function changeOptions(value: ClientOptions) {
    setOptions((prevOpts) => ({ ...prevOpts, ...value }));
    writeLocalStorageData(value);
  }

  function changeCurrentLobbyConfig(value: LobbyGameConfig) {
    setCurrentLobbyConfig((prevOpts) => ({ ...prevOpts, ...value }));
  }

  React.useEffect(() => {
    const data = readLocalStorageData();
    setOptions(data);

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
      });
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
        currentLobbyConfig,
        changeCurrentLobbyConfig,
      }}
    >
      {children}
    </LCUContext.Provider>
  );
}
