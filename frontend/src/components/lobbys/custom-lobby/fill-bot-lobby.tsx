import React from "react";
import { useCustomLobbyContext } from "./custom-lobby-context";
import { Button, useHeadContext } from "@/components";
import { TeamsIds } from "@/shared";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";

interface FillLobbyByBotsBtnProps {
  teamId: TeamsIds;
}

export function FillLobbyByBotsBtn({ teamId }: FillLobbyByBotsBtnProps) {
  const {
    lobbyDataState: [lobbyData],
  } = useHeadContext();
  const { championBots, currentBotDifficulty } = useCustomLobbyContext();
  const { emits } = useSocketEventsContext();
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
      emits.addBotToCustomLobby(
        {
          botDifficulty: currentBotDifficulty,
          teamId: teamId,
          championId: randomlyBotsArray[i].id,
        },
        (error, data) => {
          if (error) return toast.error(error);
        }
      );
    }
  }

  if (!lobbyData?.localMember.isLeader) return null;

  return <Button onClick={fillBots}>Fill bots</Button>;
}
