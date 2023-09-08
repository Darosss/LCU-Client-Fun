import { View } from "@nodegui/react-nodegui";
import React, { useContext } from "react";
import { LCUContext, LobbyLCUHandler, LobbyMember } from "@lcu";
import { LeaderPlayersActions } from "../leader-players-actions";
import { DangerButton } from "@components";

interface LeaderMemberManageActionsProps {
  member: LobbyMember;
}
//TODO: add styles depends if on off button
export function LeaderMemberManageActions({
  member: { summonerId, allowedInviteOthers },
}: LeaderMemberManageActionsProps) {
  const { lobbyLCUHandler } = useContext(LCUContext);
  return (
    <View>
      <DangerButton
        text={"Make party owner"}
        on={{
          clicked: () =>
            lobbyLCUHandler
              ?.managePlayerInLobby({
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
