import React from "react";
import { Button } from "@nodegui/react-nodegui";
import { lcuClientHandlerObj, SwitchTeamParam } from "@lcu";

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
  if (lengthLobbyMembers < maxTeamSize) {
    return (
      <Button
        text="Join"
        on={{
          clicked: () => {
            lcuClientHandlerObj.switchTeamsInLobby(changeToTeam);
          },
        }}
      ></Button>
    );
  }

  return null;
}
