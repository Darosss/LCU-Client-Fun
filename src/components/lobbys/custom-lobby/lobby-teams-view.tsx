import React, { useContext } from "react";
import { Button, View, Text } from "@nodegui/react-nodegui";
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
      <Button
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

  return (
    <View id="custom-lobby-teams-view">
      {lobbyData?.localMember.isLeader ? (
        <View id="custom-lobby-teams-options">
          <Text>Difficulty</Text>
          <Button
            text={`${currentBotDifficulty}`}
            on={{
              clicked: () => {
                if (currentBotDifficulty === BotDifficulty.EASY)
                  return setCurrentBotDifficulty(BotDifficulty.MEDIUM);
                return setCurrentBotDifficulty(BotDifficulty.EASY);
              },
            }}
          />
        </View>
      ) : null}
      <View id="custom-lobby-teams-view-team">
        <FillLobbyByBotsBtn teamId={TeamsIds.first} />
        <Text>Team 1</Text>
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
        <Text>Team 2</Text>
        {addBotButton(TeamsIds.second)}
        <ListOfTeamMembers
          lobbyMembers={customLobbyProperties?.customTeam200}
        />
        {lobbyData?.localMember.teamId !== CustomTeamIds.two ? (
          <JoinTeamButton
            lengthLobbyMembers={
              customLobbyProperties?.customTeam100.length || 0
            }
            maxTeamSize={customLobbyProperties?.maxTeamSize || 0}
            changeToTeam="one"
          />
        ) : null}
      </View>
    </View>
  );
}
