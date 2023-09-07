import React, { useContext } from "react";
import { LCUContext, SwitchTeamParam } from "@lcu";
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
  const { lobbyLCUHandler } = useContext(LCUContext);
  if (lengthLobbyMembers < maxTeamSize) {
    return (
      <InfoButton
        text="Join"
        on={{
          clicked: () => {
            lobbyLCUHandler?.switchTeamsInLobby(changeToTeam);
          },
        }}
      />
    );
  }

  return null;
}
