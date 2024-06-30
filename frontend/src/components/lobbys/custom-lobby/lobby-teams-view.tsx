import React from "react";
import { useCustomLobbyContext } from "./custom-lobby-context";
import { FillLobbyByBotsBtn } from "./fill-bot-lobby";
import { ListOfTeamMembers } from "./list-of-team-members";
import { JoinTeamButton } from "./join-team-btn";
import { Button, useHeadContext } from "@/components";
import { CustomTeamIds, TeamsIds, randomElement } from "@/shared";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";
import styles from "./lobby-teams-view.module.scss";

export function LobbyTeamsView() {
  const {
    lobbyDataState: [lobbyData],
  } = useHeadContext();

  const { emits } = useSocketEventsContext();
  const { championBots, currentBotDifficulty } = useCustomLobbyContext();
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
        defaultButtonType="info"
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

  return (
    <div className={styles.customLobbyTeamsView}>
      <div className={styles.teamsViewMembersWrapper}>
        <div className={styles.teamsViewMemberContent}>
          <div className={styles.teamActions}>
            Team 1{addBotButton(TeamsIds.first)}
            <FillLobbyByBotsBtn teamId={TeamsIds.first} />
          </div>
          <div className={styles.lobbyMembers}>
            <ListOfTeamMembers
              lobbyMembers={customLobbyProperties?.customTeam100}
            />
          </div>
          {lobbyData?.localMember.teamId !== CustomTeamIds.one ? (
            <JoinTeamButton
              lengthLobbyMembers={
                customLobbyProperties?.customTeam100.length || 0
              }
              maxTeamSize={customLobbyProperties?.maxTeamSize || 0}
              changeToTeam="one"
            />
          ) : null}
        </div>
        <div className={styles.teamsViewMemberContent}>
          <div className={styles.teamActions}>
            Team 2{addBotButton(TeamsIds.second)}
            <FillLobbyByBotsBtn teamId={TeamsIds.second} />
          </div>
          <div className={styles.lobbyMembers}>
            <ListOfTeamMembers
              lobbyMembers={customLobbyProperties?.customTeam200}
            />
          </div>
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
    </div>
  );
}
