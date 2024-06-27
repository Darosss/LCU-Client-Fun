import styles from "./current-stage-phase.module.scss";
import {
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

export function CurrentPhaseStage() {
  const { currentPhase } = useHeadContext();
  return (
    <div className={styles.currentStagePhaseWrapper}>
      <div>
        <Lobbys />
        {currentPhase === "Matchmaking" ? (
          <Matchmaking />
        ) : currentPhase === "ReadyCheck" ? (
          <ReadyCheck />
        ) : null}
      </div>
      <div>
        {currentPhase === "ChampSelect" ? (
          <ChampionSelectContextProvider>
            <ChampSelect />
          </ChampionSelectContextProvider>
        ) : null}
      </div>
      <div>
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
    </div>
  );
}
