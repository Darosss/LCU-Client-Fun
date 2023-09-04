import { Button, View } from "@nodegui/react-nodegui";
import React from "react";
import { LobbyMember, lcuClientHandlerObj } from "@lcu";
import { LeaderPlayersActions } from "../leader-players-actions";
import { DangerButton } from "@components";

interface LeaderMemberManageActionsProps {
  member: LobbyMember;
}
//TODO: add styles depends if on off button
export function LeaderMemberManageActions({
  member: { summonerId, allowedInviteOthers },
}: LeaderMemberManageActionsProps) {
  return (
    <View>
      <DangerButton
        text={"Make party owner"}
        on={{
          clicked: () =>
            lcuClientHandlerObj
              .managePlayerInLobby({
                managePlayerId: summonerId,
                action: "promote",
              })
              .catch((err) =>
                console.log(
                  `Error occured while trying to make user a lobby leader`,
                  err
                )
              ),
        }}
      />
      <LeaderPlayersActions
        summonerId={summonerId}
        allowedInviteOthers={allowedInviteOthers}
      />
    </View>
  );
}
