import React, { useContext, useEffect, useRef } from "react";
import { TabItem, Tabs, View } from "@nodegui/react-nodegui";
import { LCUContext } from "@lcu";
import {
  ChampionSelectContextProvider,
  ChampSelect,
  Lobbys,
} from "@components";
import { ReadyCheck } from "./readycheck";
import { Matchmaking } from "./matchmaking";
import { WaitingForStats } from "./waiting-for-stats";
import { Reconnect } from "./reconnect";
import { GameStart } from "./game-start";
import { InProgress } from "./in-progress";
import { Sidebar } from "./sidebar";
import { QTabWidget } from "@nodegui/nodegui";

enum TabsIndex {
  LOBBY,
  CHAMP_SELECT,
  IN_POST_GAME,
}

interface PhaseViewProps {}
export function PhaseView({}: PhaseViewProps) {
  const { currentPhase } = useContext(LCUContext);
  console.log(new Date(), "PHASEVIEW => ", currentPhase);

  const tabsRef = useRef<QTabWidget>(null);

  useEffect(() => {
    if (!tabsRef.current) return;
    const { current } = tabsRef;

    switch (currentPhase) {
      case "ChampSelect":
        current.setCurrentIndex(TabsIndex.CHAMP_SELECT);
        break;

      case "ReadyCheck":
      case "Matchmaking":
        current.setCurrentIndex(TabsIndex.LOBBY);

        break;
      case "InProgress":
      case "GameStart":
      case "Reconnect":
      case "WaitingForStats":
        current.setCurrentIndex(TabsIndex.IN_POST_GAME);
        break;
    }

    if (currentPhase === "ChampSelect") {
      //FIXME: for now index 1 === champ select. Change to dynamical
      current.setCurrentIndex(TabsIndex.CHAMP_SELECT);
    } else if (
      currentPhase === "ReadyCheck" ||
      currentPhase === "Matchmaking"
    ) {
      current.setCurrentIndex(TabsIndex.LOBBY);
    } else if (currentPhase === "InProgress" || currentPhase) {
    }
  }, [currentPhase]);
  return (
    <View>
      <View id="phases-wrapper">
        <View id="content-wrapper">
          <Tabs ref={tabsRef}>
            <TabItem title="lobby">
              <View id="phase-view-tab-item-wrapper">
                <Lobbys />
                {currentPhase === "Matchmaking" ? (
                  <Matchmaking />
                ) : currentPhase === "ReadyCheck" ? (
                  <ReadyCheck />
                ) : null}
              </View>
            </TabItem>
            <TabItem title="Champ select">
              <View id="phase-view-tab-item-wrapper">
                {currentPhase === "ChampSelect" ? (
                  <ChampionSelectContextProvider>
                    <ChampSelect />
                  </ChampionSelectContextProvider>
                ) : null}
              </View>
            </TabItem>
            <TabItem title="In game / After game">
              <View id="phase-view-tab-item-wrapper">
                {currentPhase === "GameStart" ? (
                  <GameStart />
                ) : currentPhase === "InProgress" ? (
                  <InProgress />
                ) : currentPhase === "Reconnect" ? (
                  <Reconnect />
                ) : currentPhase === "WaitingForStats" ? (
                  <WaitingForStats />
                ) : null}
              </View>
            </TabItem>
          </Tabs>
        </View>
        <View id="sidebar-wrapper">
          <Sidebar />
        </View>
      </View>
    </View>
  );
}
