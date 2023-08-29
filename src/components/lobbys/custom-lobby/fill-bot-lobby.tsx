import React from "react";
import { useContext } from "react";
import { lcuClientHandlerObj } from "../../../LCU/LCUClientHandler";
import { LCUContext } from "../../../LCU/lcucontext";
import { TeamsIds } from "../../../LCU/types/custom-mode";
import { Button } from "@nodegui/react-nodegui";
import { CustomLobbyContext } from "./custom-lobby-context";

interface FillLobbyByBotsBtnProps {
  teamId: TeamsIds;
}

export function FillLobbyByBotsBtn({ teamId }: FillLobbyByBotsBtnProps) {
  const { lobbyData } = useContext(LCUContext);
  const { championBots, currentBotDifficulty } = useContext(CustomLobbyContext);

  function fillBots() {
    if (!lobbyData) return;

    const { maxTeamSize, customTeam100, customTeam200 } = lobbyData.gameConfig;
    let numberBotsToTeam = 0;

    switch (teamId) {
      case TeamsIds.first:
        numberBotsToTeam = maxTeamSize - customTeam100.length;
        break;
      case TeamsIds.second:
        numberBotsToTeam = maxTeamSize - customTeam200.length;
        break;
    }

    const randomlyBotsArray = championBots.sort(() => 0.5 - Math.random());
    for (let i = 0; i < numberBotsToTeam; i++) {
      lcuClientHandlerObj.addBotsToCustomLobby({
        botDifficulty: currentBotDifficulty,
        teamId: teamId,
        championId: randomlyBotsArray[i].id,
      });
    }
  }

  if (!lobbyData?.localMember.isLeader) return null;

  return <Button text="Fill bots" on={{ clicked: () => fillBots() }} />;
}
