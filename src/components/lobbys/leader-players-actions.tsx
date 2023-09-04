import React from "react";
import { lcuClientHandlerObj } from "@lcu";
import { DangerButton, SuccessButton } from "@components";

interface LeaderPlayersActionsProps {
  summonerId: number;
  allowedInviteOthers: boolean;
}

export function LeaderPlayersActions({
  summonerId,
  allowedInviteOthers,
}: LeaderPlayersActionsProps) {
  return (
    <>
      <DangerButton
        text="x"
        on={{
          clicked: () => {
            lcuClientHandlerObj.managePlayerInLobby({
              managePlayerId: summonerId,
              action: "kick",
            });
          },
        }}
      />
      <SuccessButton
        text={`Invite ${allowedInviteOthers ? "on" : "off"}`}
        on={{
          clicked: () => {
            lcuClientHandlerObj.managePlayerInLobby({
              managePlayerId: summonerId,
              action: allowedInviteOthers ? "revoke-invite" : "grant-invite",
            });
          },
        }}
      />
    </>
  );
}
