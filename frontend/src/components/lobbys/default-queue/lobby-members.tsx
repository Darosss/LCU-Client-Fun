import React from "react";
import { LeaderMemberManageActions } from "./leader-member-manage-actions";
import { Button, useHeadContext } from "@/components";
import { PositionsPreferences } from "@/shared";

export function LobbyMembers() {
  const {
    lobbyDataState: [lobbyData],
  } = useHeadContext();

  if (!lobbyData) return null;
  return (
    <div id="lobby-members-wrapper">
      {lobbyData.members.map((member, idx) => (
        <div key={idx} id="lobby-one-member-wrapper">
          <Button defaultButtonType="primary">{member.summonerName}</Button>
          {lobbyData.localMember.isLeader &&
          member.summonerId !== lobbyData.localMember.summonerId ? (
            <LeaderMemberManageActions member={member} />
          ) : null}
          <div id="lobby-one-member-position-preferences-wrapper">
            <Button defaultButtonType="success">
              {member.firstPositionPreference}
            </Button>
            {member.firstPositionPreference !== PositionsPreferences.FILL ? (
              <Button defaultButtonType="secondary">
                {member.secondPositionPreference}
              </Button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
