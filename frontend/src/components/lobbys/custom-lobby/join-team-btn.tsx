import React from "react";
import { useSocketEventsContext } from "@/socket";
import { SwitchTeamParam } from "@/shared";
import { Button } from "@/components";

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
  const {} = useSocketEventsContext;
  if (lengthLobbyMembers < maxTeamSize) {
    return (
      <Button
        onClick={() => {
          //TODO: add join team
          // lobbyLCUHandler?.switchTeamsInLobby(changeToTeam);
        }}
      >
        Join
      </Button>
    );
  }

  return null;
}
