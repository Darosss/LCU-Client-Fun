import React from "react";
import { useCustomLobbyContext } from "./custom-lobby-context";
import { FillLobbyByBotsBtn } from "./fill-bot-lobby";
import { ListOfTeamMembers } from "./list-of-team-members";
import { JoinTeamButton } from "./join-team-btn";
import { Button, useHeadContext } from "@/components";
import {
  BotDifficulty,
  CustomTeamIds,
  TeamsIds,
  randomElement,
} from "@/shared";
import { useSocketEventsContext } from "@/socket";

import { toast } from "react-toastify";

export function LobbyTeamsView() {
  const {
    lobbyDataState: [lobbyData, setLobbyData],
  } = useHeadContext();

  const { emits } = useSocketEventsContext();
  const { championBots, currentBotDifficulty, setCurrentBotDifficulty } =
    useCustomLobbyContext();
  function addBotButton(team: TeamsIds) {
    let canAddBot = true;
    if (customLobbyProperties) {
      switch (team) {
        case TeamsIds.first:
          canAddBot =
            customLobbyProperties.customTeam100.length <
            customLobbyProperties.maxTeamSize;
          break;
        case TeamsIds.second:
          canAddBot =
            customLobbyProperties.customTeam200.length <
            customLobbyProperties.maxTeamSize;
          break;
      }
    }
    if (!lobbyData?.localMember.isLeader || !canAddBot) return null;

    return (
      <Button
        onClick={() => {
          emits.addBotToCustomLobby(
            {
              botDifficulty: currentBotDifficulty,
              teamId: team,
              championId: randomElement(championBots)?.id,
            },
            (error, data) => {
              if (error) return toast.error(error);
            }
          );
        }}
      >
        Add bot
      </Button>
    );
  }
  const customLobbyProperties = React.useMemo(() => {
    if (!lobbyData) return;
    const { customTeam100, customTeam200, maxTeamSize } = lobbyData.gameConfig;
    return { customTeam100, customTeam200, maxTeamSize };
  }, [lobbyData]);

  function changeNewBotsDifficulty() {
    if (currentBotDifficulty === BotDifficulty.EASY)
      return setCurrentBotDifficulty(BotDifficulty.MEDIUM);
    return setCurrentBotDifficulty(BotDifficulty.EASY);
  }

  return (
    <div id="custom-lobby-teams-view">
      {lobbyData?.localMember.isLeader ? (
        <div id="custom-lobby-teams-options">
          Difficulty
          {currentBotDifficulty === BotDifficulty.EASY ? (
            <Button onClick={changeNewBotsDifficulty}>
              {currentBotDifficulty}
            </Button>
          ) : (
            <Button onClick={changeNewBotsDifficulty}>
              {currentBotDifficulty}
            </Button>
          )}
        </div>
      ) : null}
      <div id="custom-lobby-teams-view-team">
        <FillLobbyByBotsBtn teamId={TeamsIds.first} />
        Team 1{addBotButton(TeamsIds.first)}
        <ListOfTeamMembers
          lobbyMembers={customLobbyProperties?.customTeam100}
        />
        {lobbyData?.localMember.teamId !== CustomTeamIds.one ? (
          <JoinTeamButton
            lengthLobbyMembers={
              customLobbyProperties?.customTeam100.length || 0
            }
            maxTeamSize={customLobbyProperties?.maxTeamSize || 0}
            changeToTeam="one"
          />
        ) : null}
        <FillLobbyByBotsBtn teamId={TeamsIds.second} />
        Team 2{addBotButton(TeamsIds.second)}
        <ListOfTeamMembers
          lobbyMembers={customLobbyProperties?.customTeam200}
        />
        {lobbyData?.localMember.teamId !== CustomTeamIds.two ? (
          <JoinTeamButton
            lengthLobbyMembers={
              customLobbyProperties?.customTeam200.length || 0
            }
            maxTeamSize={customLobbyProperties?.maxTeamSize || 0}
            changeToTeam="two"
          />
        ) : null}
      </div>
    </div>
  );
}
