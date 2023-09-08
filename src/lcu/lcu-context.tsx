import React, { useState } from "react";
import {
  ClientOptions,
  CurrentSummonerData,
  GameFlowPhaseData,
  LobbyLCUHandler,
  LobbyGameDataResponse,
} from "./";

import {
  readLocalStorageData,
  writeLocalStorageData,
} from "./pseudo-local-storage";
import { lcuHandlerFactory } from "./lcu-handlers-factory";
import { HeadLCUHandler } from "./head-lcu-handler";

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
  headLCUHandler: HeadLCUHandler | null;
  lobbyLCUHandler: LobbyLCUHandler | null;
}

export const initialLCUContextValue: LCUContext = {
  options: readLocalStorageData(),
  changeOptions: () => {},
  currentPhase: "None",
  setCurrentSummoner: () => {},
  setCurrentPhase: () => {},
  lobbyData: null,
  headLCUHandler: null,
  lobbyLCUHandler: null,
};

export const LCUContext = React.createContext<LCUContext>(
  initialLCUContextValue
);

export function LCUContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headLCUHandler, setHeadLCUHandler] = useState<HeadLCUHandler | null>(
    null
  );
  const [lobbyLCUHandler, setLobbyLCUHandler] =
    useState<LobbyLCUHandler | null>(null);

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

  function changeOptions(value: Partial<ClientOptions>) {
    setOptions((prevOpts) => ({ ...prevOpts, ...value }));

    writeLocalStorageData({ ...options, ...value });
  }

  React.useEffect(() => {
    async function initHeadHandlerAndRequiredMethods() {
      const headHandlerObj = lcuHandlerFactory.createHeadHandler();

      headHandlerObj.wsOnGameflowPhaseChange((err, state) => {
        if (err || !state) return;
        setCurrentPhase(state);
      });

      const currentSummoner = await headHandlerObj.getCurrentSummoner();
      setCurrentSummoner(currentSummoner);
      return headHandlerObj;
    }

    async function initLobbyHandlerAndRequiredMethods() {
      const lobbyHandlerObj = lcuHandlerFactory.createLobbyHandler();

      lobbyHandlerObj.wsOnLobbyGet((err, lobbyData) => {
        if (err) return;
        setLobbyData(lobbyData);
      });
      return lobbyHandlerObj;
    }

    async function initalizeHandlers() {
      await lcuHandlerFactory.initialize();

      const lobbyHandlerObj = await initLobbyHandlerAndRequiredMethods();
      setLobbyLCUHandler(lobbyHandlerObj);

      const headHandlerObj = await initHeadHandlerAndRequiredMethods();
      setHeadLCUHandler(headHandlerObj);
    }
    initalizeHandlers();

    return () => {
      lobbyLCUHandler?.unsubsribeOnLobbyGet();
      headLCUHandler?.unsubscribeOnGameflowPhaseChange();
    };
  }, [lcuHandlerFactory]);

  return (
    <LCUContext.Provider
      value={{
        headLCUHandler,
        lobbyLCUHandler,
        options,
        changeOptions,
        currentPhase,
        setCurrentPhase,
        setCurrentSummoner,
        currentSummoner,
        lobbyData,
      }}
    >
      {children}
    </LCUContext.Provider>
  );
}
