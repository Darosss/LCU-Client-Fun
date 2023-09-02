import React, { useContext } from "react";
import { View, Button } from "@nodegui/react-nodegui";
import { LobbyMember, LCUContext } from "@lcu";
import { CustomLobbyContext } from "./custom-lobby-context";
import { LeaderBotsActions } from "./leader-bots-actions";
import { SummonerInLobby } from "./summoner-in-lobby";

interface ListOfTeamMembersProps {
  lobbyMembers?: LobbyMember[];
}

//TODO: fix botNames when data dragon will be in LCU Context

export function ListOfTeamMembers({ lobbyMembers }: ListOfTeamMembersProps) {
  const { championBots } = useContext(CustomLobbyContext);
  const { lobbyData } = useContext(LCUContext);
  return (
    <View id="list-of-team-members">
      {lobbyMembers?.map((member, idx) => {
        const foundChampionData = championBots.find(
          ({ id }) => id === member.botChampionId
        );

        return (
          <View key={idx}>
            {member.isBot && lobbyData?.localMember.isLeader ? (
              <LeaderBotsActions
                championData={foundChampionData}
                member={member}
                currentAddedBotsIds={lobbyMembers.map(
                  ({ botChampionId }) => botChampionId
                )}
              />
            ) : member.isBot ? (
              <Button
                text={`${foundChampionData?.name ?? member.botChampionId}`}
              ></Button>
            ) : member.summonerName ? (
              <SummonerInLobby summoner={member} />
            ) : null}
          </View>
        );
      })}
    </View>
  );
}
