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
  currentSummoner: CurrentSummonerData | null;
  currentPhase: GameFlowPhaseData;
  setCurrentSummoner: React.Dispatch<
    React.SetStateAction<CurrentSummonerData | null>
  >;
  setCurrentPhase: React.Dispatch<React.SetStateAction<GameFlowPhaseData>>;
  lobbyData: LobbyGameDataResponse | null;
  headLCUHandler: HeadLCUHandler | null;
  lobbyLCUHandler: LobbyLCUHandler | null;
  initalizeHandlers: () => void;
}

export const initialLCUContextValue: LCUContext = {
  options: readLocalStorageData(),
  changeOptions: () => {},
  currentPhase: "None",
  currentSummoner: null,
  setCurrentSummoner: () => {},
  setCurrentPhase: () => {},
  lobbyData: null,
  headLCUHandler: null,
  lobbyLCUHandler: null,
  initalizeHandlers: () => {},
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

  const [currentSummoner, setCurrentSummoner] =
    useState<CurrentSummonerData | null>(
      initialLCUContextValue.currentSummoner
    );
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

  async function initalizeHandlers() {
    await lcuHandlerFactory.initialize();

    const lobbyHandlerObj = lcuHandlerFactory.createLobbyHandler();

    setLobbyLCUHandler(lobbyHandlerObj);

    const headHandlerObj = lcuHandlerFactory.createHeadHandler();
    headHandlerObj.getGameflowPhase().then(async (state) => {
      setCurrentPhase(state);
      if (
        state === "Lobby" ||
        state === "Matchmaking" ||
        state === "ReadyCheck" ||
        state === "ChampSelect"
      )
        setLobbyData(await lobbyHandlerObj.getLobbyData());
    });
    setHeadLCUHandler(headHandlerObj);
  }

  React.useEffect(() => {
    initalizeHandlers();

    setTimeout(() => {
      // setCurrentPhase("ChampSelect");
    }, 1500);
  }, [lcuHandlerFactory]);

  React.useEffect(() => {
    if (!headLCUHandler) return;

    headLCUHandler.wsOnGameflowPhaseChange((err, state) => {
      if (err || !state) return;
      setCurrentPhase(state);
    });

    headLCUHandler
      .getCurrentSummoner()
      .then((summonerData) => setCurrentSummoner(summonerData));

    return () => {
      headLCUHandler?.unsubscribeOnGameflowPhaseChange();
    };
  }, [headLCUHandler]);

  React.useEffect(() => {
    if (!lobbyLCUHandler) return;

    lobbyLCUHandler.wsOnLobbyGet((err, lobbyData) => {
      if (err) return;
      setLobbyData(lobbyData);
    });

    return () => {
      lobbyLCUHandler?.unsubsribeOnLobbyGet();
    };
  }, [lobbyLCUHandler]);
  return (
    <LCUContext.Provider
      value={{
        initalizeHandlers,
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
