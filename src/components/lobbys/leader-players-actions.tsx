import React, { useContext } from "react";
import { DangerButton, SuccessButton } from "@components";
import { LCUContext } from "@lcu";

interface LeaderPlayersActionsProps {
  summonerId: number;
  allowedInviteOthers: boolean;
}

export function LeaderPlayersActions({
  summonerId,
  allowedInviteOthers,
}: LeaderPlayersActionsProps) {
  const { lobbyLCUHandler } = useContext(LCUContext);
  return (
    <>
      <DangerButton
        text="x"
        on={{
          clicked: () => {
            lobbyLCUHandler?.managePlayerInLobby({
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
            lobbyLCUHandler?.managePlayerInLobby({
              managePlayerId: summonerId,
              action: allowedInviteOthers ? "revoke-invite" : "grant-invite",
            });
          },
        }}
      />
    </>
  );
}
