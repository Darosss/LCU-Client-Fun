import React, { useContext, useMemo } from "react";
import { View } from "@nodegui/react-nodegui";
import { LCUContext } from "@lcu";
import { getPercentFromValue } from "@helpers";
import { ChampionSelectContextProvider, ChampSelect } from "@components";
import { ReadyCheck } from "./readycheck";
import { MenuClient } from "./menu-client";
import { Matchmaking } from "./matchmaking";
import { WaitingForStats } from "./waiting-for-stats";
import { Reconnect } from "./reconnect";
import { GameStart } from "./game-start";
import { InProgress } from "./in-progress";
import { phaseViewStylesheet } from "./stylesheet";
import { Sidebar } from "./sidebar";

interface PhaseViewProps {}
export function PhaseView({}: PhaseViewProps) {
  const {
    currentPhase,
    options: {
      minSize: { width },
    },
  } = useContext(LCUContext);
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

  const { contentWidth, sidebarWidth } = useMemo<{
    contentWidth: number;
    sidebarWidth: number;
  }>(() => {
    const contentWidth = getPercentFromValue(width, 70);
    const sidebarWidth = getPercentFromValue(width, 25);
    return { contentWidth, sidebarWidth };
  }, [width]);

  return (
    <View>
      <View
        id="phases-wrapper"
        styleSheet={
          phaseViewStylesheet +
          `#phases-wrapper QWidget {
                font-size:${~~(contentWidth / 70)}px;
          }`
        }
      >
        <View
          id="content-wrapper"
          style={`min-width:${contentWidth}px; max-width:${contentWidth};`}
        >
          <MenuClient />
          {renderDependsOnPhase()}
        </View>
        <View
          id="sidebar-wrapper"
          style={`min-width:${sidebarWidth}px; max-width:${sidebarWidth};`}
        >
          <Sidebar />
        </View>
      </View>
    </View>
  );
}
