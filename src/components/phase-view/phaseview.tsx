import React, { useContext } from "react";
import { View } from "@nodegui/react-nodegui";
import { LCUContext } from "@lcu";
import { ChampionSelectContextProvider, ChampSelect } from "@components";
import { ReadyCheck } from "./readycheck";
import { MenuClient } from "./menu-client";
import { Matchmaking } from "./matchmaking";
import { WaitingForStats } from "./waiting-for-stats";
import { Reconnect } from "./reconnect";
import { GameStart } from "./game-start";
import { InProgress } from "./in-progress";
import { Sidebar } from "./sidebar";
import { loggerWsEvents } from "../../logger";
interface PhaseViewProps {}
export function PhaseView({}: PhaseViewProps) {
  const { currentPhase } = useContext(LCUContext);
  console.log(new Date(), "PHASEVIEW => ", currentPhase);
  loggerWsEvents.info(` PHASE => ${currentPhase}`);
  function renderDependsOnPhase() {
    switch (currentPhase) {
      case "ChampSelect":
        return (
          <ChampionSelectContextProvider>
            <ChampSelect />
          </ChampionSelectContextProvider>
        );

      case "InProgress":
        return <InProgress />;

      case "ReadyCheck":
        return <ReadyCheck />;

      case "Matchmaking":
        return <Matchmaking />;

      case "GameStart":
        return <GameStart />;

      case "Reconnect":
        return <Reconnect />;

      case "WaitingForStats":
        return <WaitingForStats />;

      case "None":
      case "TerminatedInError":
        return <></>;
    }
  }
  return (
    <View>
      <View id="phases-wrapper">
        <View id="content-wrapper">
          <MenuClient />
          {renderDependsOnPhase()}
        </View>
        <View id="sidebar-wrapper">
          <Sidebar />
        </View>
      </View>
    </View>
  );
}
