"use client";
import styles from "./current-stage-phase.module.scss";
import {
  Button,
  ChampSelect,
  ChampionSelectContextProvider,
  Lobbys,
  useHeadContext,
} from "@/components";
import { Matchmaking } from "./matchmaking";
import { ReadyCheck } from "./readycheck";
import { InProgress } from "./in-progress";
import { Reconnect } from "./reconnect";
import { WaitingForStats } from "./waiting-for-stats";
import { GameStart } from "./game-start";
import { useState } from "react";

function CurrentPhaseTab() {
  const { currentPhase } = useHeadContext();

  switch (currentPhase) {
    case "ReadyCheck":
      return <ReadyCheck />;
    case "ChampSelect":
      return (
        <ChampionSelectContextProvider>
          <ChampSelect />
        </ChampionSelectContextProvider>
      );
    case "InProgress":
      return <InProgress />;
    case "Matchmaking":
      return <Matchmaking />;
    case "GameStart":
      return <GameStart />;
    case "Reconnect":
      <Reconnect />;
    case "WaitingForStats":
      return <WaitingForStats />;
    case "TerminatedInError":
    case "Lobby":
    case "PreEndOfGame":
    case "EndOfGame":
    case "None":
      return <></>;
  }

  return (
    <div>
      {currentPhase === "Matchmaking" ? (
        <Matchmaking />
      ) : currentPhase === "ReadyCheck" ? (
        <ReadyCheck />
      ) : null}
      {currentPhase === "ChampSelect" ? (
        <ChampionSelectContextProvider>
          <ChampSelect />
        </ChampionSelectContextProvider>
      ) : null}
      {currentPhase === "GameStart" ? (
        <GameStart />
      ) : currentPhase === "InProgress" ? (
        <InProgress />
      ) : currentPhase === "Reconnect" ? (
        <Reconnect />
      ) : currentPhase === "WaitingForStats" ? (
        <WaitingForStats />
      ) : null}
    </div>
  );
}

type CurrentViewComponentProps = {
  currentView: CurrentView;
};

function CurrentViewComponent({ currentView }: CurrentViewComponentProps) {
  switch (currentView) {
    case CurrentView.CURRENT_PHASE:
      return <CurrentPhaseTab />;
    case CurrentView.RUNES:
      return <>Runes</>;
    case CurrentView.LOBBY:
    default:
      return <Lobbys />;
  }
}

enum CurrentView {
  LOBBY = "Lobby",
  CURRENT_PHASE = "Current phase",
  RUNES = "Runes",
}

export function CurrentPhaseStage() {
  const { currentPhase } = useHeadContext();
  const [currentView, setCurrentView] = useState<CurrentView>(
    currentPhase === "None" ? CurrentView.LOBBY : CurrentView.CURRENT_PHASE
  );
  return (
    <div className={styles.currentStagePhaseWrapper}>
      <div className={styles.clientNavigationWrapper}>
        <ul className={styles.clientNavigation}>
          {Object.entries(CurrentView).map((view) => (
            <li key={view[0]}>
              <Button
                defaultButtonType={
                  view[1] === currentView ? "primary" : "secondary"
                }
                onClick={() => setCurrentView(view[1])}
              >
                {view[1]}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.clientContent}>
        <CurrentViewComponent currentView={currentView} />
      </div>
    </div>
  );
}
