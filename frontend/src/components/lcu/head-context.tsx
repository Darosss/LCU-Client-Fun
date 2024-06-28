"use client";

import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ClientOptions,
  CurrentSummonerData,
  DataDragonChampionsJsonFileData,
  GameFlowPhaseData,
  LobbyGameDataResponse,
  QueueData,
  configsDefaults,
} from "@/shared";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";

export enum CurrentView {
  LOBBY = "Lobby",
  CURRENT_PHASE = "Current phase",
  RUNES = "Runes",
  OPTIONS = "Options",
}

type HeadContextProviderProps = { children: React.ReactNode };

type HeadContextType = {
  currentPhase: GameFlowPhaseData;
  lobbyDataState: [
    LobbyGameDataResponse | null,
    Dispatch<SetStateAction<LobbyGameDataResponse | null>>
  ];
  options: ClientOptions;
  changeClientOptions: (updateData: Partial<ClientOptions>) => void;
  currentSummonerState: [
    CurrentSummonerData | null,
    Dispatch<SetStateAction<CurrentSummonerData | null>>
  ];
  queuesData: QueueData[];
  championsData: DataDragonChampionsJsonFileData[];
  currentViewState: [CurrentView, Dispatch<SetStateAction<CurrentView>>];
};

export const HeadContext = createContext<HeadContextType | null>(null);

export const HeadContextProvider: FC<HeadContextProviderProps> = ({
  children,
}) => {
  const [currentPhase, setCurrentPhase] =
    useState<HeadContextType["currentPhase"]>("None");
  const [currentView, setCurrentView] = useState<CurrentView>(
    CurrentView.LOBBY
  );
  const [lobbyData, setLobbyData] =
    useState<HeadContextType["lobbyDataState"][0]>(null);
  const [currentSummoner, setCurrentSummoner] =
    useState<HeadContextType["currentSummonerState"][0]>(null);
  const [options, setOptions] =
    useState<HeadContextType["options"]>(configsDefaults);
  const [queuesData, setQueuesData] = useState<HeadContextType["queuesData"]>(
    []
  );
  const [championsData, setChampionsData] = useState<
    HeadContextType["championsData"]
  >([]);

  const { events, emits } = useSocketEventsContext();

  useEffect(() => {
    events.gameflowPhase.on((data) => {
      setCurrentPhase(data);
      switch (data) {
        case "ReadyCheck":
        case "ChampSelect":
        case "Reconnect":
        case "WaitingForStats":
        case "PreEndOfGame":
        case "EndOfGame":
          setCurrentView(CurrentView.CURRENT_PHASE);
      }
    });
    events.lobbyData.on((data) => {
      setLobbyData(data);
    });
    events.currentSummoner.on((data) => {
      setCurrentSummoner(data);
    });
    events.clientOptions.on((data) => {
      setOptions(data);
    });

    return () => {
      events.gameflowPhase.off();
      events.lobbyData.off();
      events.currentSummoner.off();
      events.clientOptions.off();
    };
  }, [events]);

  useEffect(() => {
    emits.getQueuesData((error, data) => {
      if (error || !data)
        return toast.error(error || "Coldn't get queues data from backend");

      setQueuesData(data);
    });

    emits.getChampionsData((error, data) => {
      if (error || !data)
        return toast.error(error || "Coldn't get champions data from backend");

      setChampionsData(data);
    });
  }, [emits]);

  const emitChangeClientOptions = useCallback(
    (updateData: Partial<ClientOptions>) => {
      emits.changeClientOptions(updateData, (error, data) => {
        if (error || !data)
          return toast.error(error || "Couldn't udpate client configs");
      });
    },
    [emits]
  );

  return (
    <HeadContext.Provider
      value={{
        currentPhase,
        lobbyDataState: [lobbyData, setLobbyData],
        currentSummonerState: [currentSummoner, setCurrentSummoner],
        options: options as HeadContextType["options"],
        changeClientOptions: emitChangeClientOptions,
        queuesData,
        championsData,
        currentViewState: [currentView, setCurrentView],
      }}
    >
      {children}
    </HeadContext.Provider>
  );
};

export const useHeadContext = (): Required<HeadContextType> => {
  const headContext = useContext(HeadContext);
  if (!headContext) {
    throw new Error("useHeadContext must be used within a HeadContextProvider");
  }
  return headContext as HeadContextType;
};
