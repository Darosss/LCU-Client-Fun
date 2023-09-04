import React, { useContext } from "react";
import { View } from "@nodegui/react-nodegui";
import { PositionsPreferences, LCUContext } from "@lcu";
import { LeaderMemberManageActions } from "./leader-member-manage-actions";
import { PrimaryText, SecondaryText } from "@components";

export function LobbyMembers() {
  const { lobbyData } = useContext(LCUContext);

  if (!lobbyData) return null;
  return (
    <View id="lobby-members-wrapper">
      {lobbyData.members.map((member, idx) => (
        <View key={idx} id="lobby-one-member-wrapper">
          <PrimaryText text={member.summonerName} />
          {lobbyData.localMember.isLeader &&
          member.summonerId !== lobbyData.localMember.summonerId ? (
            <LeaderMemberManageActions member={member} />
          ) : null}
          <View id="lobby-one-member-position-preferences-wrapper">
            <SecondaryText text={member.firstPositionPreference} />
            {member.firstPositionPreference !== PositionsPreferences.FILL ? (
              <SecondaryText text={member.secondPositionPreference} />
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
}
