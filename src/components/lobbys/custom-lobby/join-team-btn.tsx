import React from "react";
import { lcuClientHandlerObj, SwitchTeamParam } from "@lcu";
import { InfoButton } from "@components";

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
      <InfoButton
        text="Join"
        on={{
          clicked: () => {
            lcuClientHandlerObj.switchTeamsInLobby(changeToTeam);
          },
        }}
      />
    );
  }

  return null;
}
