import { View } from "@nodegui/react-nodegui";
import React, { useContext } from "react";
import { ReadyCheck } from "./readycheck";
import { LCUContext } from "../../LCU/lcucontext";
import { MenuClient } from "../menuclient";
import { ChampSelect } from "../champion-select";
import { ChampionSelectContextProvider } from "../champion-select";
import { Matchmaking } from "./matchmaking";
import { WaitingForStats } from "./waiting-for-stats";
import { Reconnect } from "./reconnect";
import { GameStart } from "./game-start";
import { InProgress } from "./in-progress";
import { phaseViewStylesheet } from "./stylesheet";

interface PhaseViewProps {}
export function PhaseView({}: PhaseViewProps) {
  const { currentPhase } = useContext(LCUContext);
  console.log(new Date(), "PHASEVIEW => ", currentPhase);
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
      <MenuClient />
      <View id="phases-wrapper" styleSheet={phaseViewStylesheet}>
        {renderDependsOnPhase()}
      </View>
    </View>
  );
}
