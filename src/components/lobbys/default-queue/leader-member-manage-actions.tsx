import { Button, Text, View } from "@nodegui/react-nodegui";
import React from "react";
import { LobbyMember } from "../../../LCU/types";
import { lcuClientHandlerObj } from "../../../LCU/LCUClientHandler";
import { LeaderPlayersActions } from "../leader-players-actions";

interface LeaderMemberManageActionsProps {
  member: LobbyMember;
}
//TODO: add styles depends if on off button
export function LeaderMemberManageActions({
  member: { summonerId, allowedInviteOthers },
}: LeaderMemberManageActionsProps) {
  return (
    <View>
      <Button
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
