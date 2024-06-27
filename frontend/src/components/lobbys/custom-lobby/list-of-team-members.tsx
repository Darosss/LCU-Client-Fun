import React from "react";
import { useCustomLobbyContext } from "./custom-lobby-context";
import { LeaderBotsActions } from "./leader-bots-actions";
import { SummonerInLobby } from "./summoner-in-lobby";
import { Button, useHeadContext } from "@/components";
import { LobbyMember } from "@/shared";

interface ListOfTeamMembersProps {
  lobbyMembers?: LobbyMember[];
}

export function ListOfTeamMembers({ lobbyMembers }: ListOfTeamMembersProps) {
  const { championBots } = useCustomLobbyContext();
  const {
    lobbyDataState: [lobbyData],
  } = useHeadContext();
  return (
    <div id="list-of-team-members">
      {lobbyMembers?.map((member, idx) => {
        const foundChampionData = championBots.find(
          ({ id }) => id === member.botChampionId
        );

        return (
          <div key={idx}>
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
