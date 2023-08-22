import { Text, View } from "@nodegui/react-nodegui";
import React, { useContext } from "react";
import { ReadyCheck } from "./readycheck";
import { LCUContext } from "../../LCU/lcucontext";
import { MenuClient } from "../menuclient";
import { ChampSelect } from "../champselect/champselect";

interface PhaseViewProps {}
export function PhaseView({}: PhaseViewProps) {
  const { currentPhase } = useContext(LCUContext);
  console.log(new Date(), "PHASEVIEW => ", currentPhase);
  function renderDependsOnPhase() {
    switch (currentPhase) {
      case "ChampSelect":
        return <ChampSelect />;
      case "InProgress":
        break;
      case "ReadyCheck":
        return (
          <>
            <MenuClient />
            <ReadyCheck />
          </>
        );
      case "Matchmaking":
      case "Lobby":
      case "None":
        return <MenuClient />;
    }
  }

  return <View>{renderDependsOnPhase()}</View>;
}
