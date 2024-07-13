import React from "react";
import { useSocketEventsContext } from "@/socket";
import { SwitchTeamParam } from "@/shared";
import { Button } from "@/components";
import { toast } from "react-toastify";

interface JoinTeamButtonProps {
  lengthLobbyMembers: number;
  maxTeamSize: number;
  changeToTeam: SwitchTeamParam;
}

export function JoinTeamButton({
  lengthLobbyMembers,
  maxTeamSize,
  changeToTeam,
}: JoinTeamButtonProps) {
  const {emits} = useSocketEventsContext();


  if (lengthLobbyMembers < maxTeamSize) {
    return (
      <Button
        defaultButtonType="info"
        onClick={() => {
          emits.switchTeamsInLobby(changeToTeam, (error,data)=>{
            if(error ||!data) return toast.error(error || "Couldn't join teams")
          })
        }}
      >
        Joinxd
      </Button>
    );
  }

  return null;
}
