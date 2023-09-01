import { Text, View } from "@nodegui/react-nodegui";
import React, { useContext } from "react";
import { LCUContext } from "../../../LCU/lcucontext";
import { PositionsPreferences } from "../../../LCU/types";
import { LeaderMemberManageActions } from "./leader-member-manage-actions";

export function LobbyMembers() {
  const { lobbyData } = useContext(LCUContext);

  if (!lobbyData) return null;
  return (
    <View id="lobby-members-wrapper">
      {lobbyData.members.map((member, idx) => (
        <View key={idx} id="lobby-one-member-wrapper">
          <Text> {member.summonerName} </Text>
          {lobbyData.localMember.isLeader &&
          member.summonerId !== lobbyData.localMember.summonerId ? (
            <LeaderMemberManageActions member={member} />
          ) : null}
          <View id="lobby-one-member-position-preferences-wrapper">
            <Text> {member.firstPositionPreference}</Text>
            {member.firstPositionPreference !== PositionsPreferences.FILL ? (
              <Text> {member.secondPositionPreference}</Text>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
}
