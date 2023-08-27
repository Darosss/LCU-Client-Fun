import { Button } from "@nodegui/react-nodegui";
import React from "react";
import { lcuClientHandlerObj } from "../../../LCU/LCUClientHandler";
import { SwitchTeamParam } from "../../../LCU/types/custom-mode";

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
