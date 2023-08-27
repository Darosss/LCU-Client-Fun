import { Button } from "@nodegui/react-nodegui";
import React from "react";
import { lcuClientHandlerObj } from "../../../LCU/LCUClientHandler";

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
      <Button
        text="x"
        on={{
          clicked: () => {
            lcuClientHandlerObj.managePlayerInLobby({
              managePlayerId: summonerId,
              action: "kick",
            });
          },
        }}
      ></Button>
      <Button
        text={`Invite ${allowedInviteOthers ? "on" : "off"}`}
        on={{
          clicked: () => {
            lcuClientHandlerObj.managePlayerInLobby({
              managePlayerId: summonerId,
              action: allowedInviteOthers ? "revoke-invite" : "grant-invite",
            });
          },
        }}
      ></Button>
    </>
  );
}
