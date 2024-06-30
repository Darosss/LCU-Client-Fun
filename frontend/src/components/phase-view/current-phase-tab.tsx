import { ChampionSelectContextProvider, ChampSelect } from "@/components";
import { useHeadContext } from "../lcu";
import { GameStart } from "./game-start";
import { InProgress } from "./in-progress";
import { Matchmaking } from "./matchmaking";
import { ReadyCheck } from "./readycheck";
import { Reconnect } from "./reconnect";
import { WaitingForStats } from "./waiting-for-stats";

export function CurrentPhaseTab() {
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
