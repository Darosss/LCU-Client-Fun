import React, { useContext } from "react";
import { View } from "@nodegui/react-nodegui";
import {
  TeamsIds,
  BotDifficulty,
  CustomTeamIds,
  LCUContext,
  lcuClientHandlerObj,
} from "@lcu";
import { randomElement } from "@helpers";
import { CustomLobbyContext } from "./custom-lobby-context";
import { FillLobbyByBotsBtn } from "./fill-bot-lobby";
import { ListOfTeamMembers } from "./list-of-team-members";
import { JoinTeamButton } from "./join-team-btn";
import {
  DangerButton,
  PrimaryButton,
  PrimaryText,
  SuccessButton,
} from "@components";

export function LobbyTeamsView() {
  const { lobbyData } = useContext(LCUContext);
  const { championBots, currentBotDifficulty, setCurrentBotDifficulty } =
    useContext(CustomLobbyContext);

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
      <PrimaryButton
        on={{
          clicked: () => {
            lcuClientHandlerObj
              .addBotsToCustomLobby({
                botDifficulty: currentBotDifficulty,
                teamId: team,
                championId: randomElement(championBots).id,
              })

              .catch((err) => console.log(err));
          },
        }}
        text="Add bot"
      />
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
    <View id="custom-lobby-teams-view">
      {lobbyData?.localMember.isLeader ? (
        <View id="custom-lobby-teams-options">
          <PrimaryText text="Difficulty" />
          {currentBotDifficulty === BotDifficulty.EASY ? (
            <SuccessButton
              text={`${currentBotDifficulty}`}
              on={{
                clicked: () => changeNewBotsDifficulty(),
              }}
            />
          ) : (
            <DangerButton
              text={`${currentBotDifficulty}`}
              on={{
                clicked: () => changeNewBotsDifficulty(),
              }}
            />
          )}
        </View>
      ) : null}
      <View id="custom-lobby-teams-view-team">
        <FillLobbyByBotsBtn teamId={TeamsIds.first} />
        <PrimaryText text="Team 1" />
        {addBotButton(TeamsIds.first)}
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
        <PrimaryText text="Team 2" />
        {addBotButton(TeamsIds.second)}
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
      </View>
    </View>
  );
}
