import React from "react";
import { LeaderPlayersActions } from "../leader-players-actions";
import { LobbyMember } from "@/shared";
import { useSocketEventsContext } from "@/socket";
import { Button } from "@/components";

interface LeaderMemberManageActionsProps {
  member: LobbyMember;
}
//TODO: add styles depends if on off button
export function LeaderMemberManageActions({
  member: { summonerId, allowedInviteOthers },
}: LeaderMemberManageActionsProps) {
  const {} = useSocketEventsContext;
  return (
    <div>
      <Button
        onClick={() => {
          /**
           * lobbyLCUHandler
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
           * 
           */
        }}
      >
        Make party owner
      </Button>
      <LeaderPlayersActions
        summonerId={summonerId}
        allowedInviteOthers={allowedInviteOthers}
      />
    </div>
  );
}
