import React from "react";
import { LeaderPlayersActions } from "../leader-players-actions";
import { LobbyMember } from "@/shared";
import { useSocketEventsContext } from "@/socket";
import { Button } from "@/components";
import { toast } from "react-toastify";

interface LeaderMemberManageActionsProps {
  member: LobbyMember;
}
//TODO: add styles depends if on off button
export function LeaderMemberManageActions({
  member: { summonerId, allowedInviteOthers },
}: LeaderMemberManageActionsProps) {
  const { emits } = useSocketEventsContext();
  return (
    <div>
      <Button
        onClick={() => {
          emits.managePlayerInLobby(
            {
              managePlayerId: summonerId,
              action: "promote",
            },
            (error, data) => {
              if (error || !data)
                return toast.error("Couldn't make user a leader");
            }
          );
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
