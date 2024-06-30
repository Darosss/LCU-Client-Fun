import React from "react";
import { useCustomLobbyContext } from "./custom-lobby-context";
import { LeaderBotsActions } from "./leader-bots-actions";
import { SummonerInLobby } from "./summoner-in-lobby";
import { Button, useHeadContext } from "@/components";
import { LobbyMember } from "@/shared";
import styles from "./list-of-team-members.module.scss";

interface ListOfTeamMembersProps {
  lobbyMembers?: LobbyMember[];
}

export function ListOfTeamMembers({ lobbyMembers }: ListOfTeamMembersProps) {
  const { championBots } = useCustomLobbyContext();
  const {
    lobbyDataState: [lobbyData],
  } = useHeadContext();
  return (
    <div className={styles.listOfTeamMembersWrapper}>
      {lobbyMembers?.map((member, idx) => {
        const foundChampionData = championBots.find(
          ({ id }) => id === member.botChampionId
        );

        return (
          <div key={idx} className={styles.teamMemberContent}>
            {member.isBot && lobbyData?.localMember.isLeader ? (
              <LeaderBotsActions
                championData={foundChampionData}
                member={member}
                currentAddedBotsIds={lobbyMembers.map(
                  ({ botChampionId }) => botChampionId
                )}
              />
            ) : member.isBot ? (
              <Button>
                {`${foundChampionData?.name ?? member.botChampionId}`}
              </Button>
            ) : member.summonerName ? (
              <SummonerInLobby summoner={member} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
