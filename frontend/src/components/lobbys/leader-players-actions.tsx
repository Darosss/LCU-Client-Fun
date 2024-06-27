import React from "react";
import { Button } from "@/components";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";

interface LeaderPlayersActionsProps {
  summonerId: number;
  allowedInviteOthers: boolean;
}

export function LeaderPlayersActions({
  summonerId,
  allowedInviteOthers,
}: LeaderPlayersActionsProps) {
  const { emits } = useSocketEventsContext();
  return (
    <>
      <Button
        onClick={() => {
          emits.managePlayerInLobby(
            {
              managePlayerId: summonerId,
              action: "kick",
            },
            (error, data) => {
              if (error) return toast.error(data);
            }
          );
        }}
      >
        X
      </Button>
      <Button
        onClick={() => {
          emits.managePlayerInLobby(
            {
              managePlayerId: summonerId,
              action: allowedInviteOthers ? "revoke-invite" : "grant-invite",
            },
            (error, data) => {
              if (error) return toast.error(data);
            }
          );
        }}
      >{`Invite ${allowedInviteOthers ? "on" : "off"}`}</Button>
    </>
  );
}
