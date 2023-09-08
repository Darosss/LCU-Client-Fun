import React, { useContext } from "react";
import { CreateCustomLobbyOpts, LCUContext } from "@lcu";
import { SecondaryButton } from "@components";

interface CustomModeLobbyProps {
  lobbyName: string;
  customLobbyOpts: CreateCustomLobbyOpts;
}

export function CustomModeLobby({
  lobbyName,
  customLobbyOpts,
}: CustomModeLobbyProps) {
  const { lobbyLCUHandler } = useContext(LCUContext);
  return (
    <>
      <SecondaryButton
        text={lobbyName}
        on={{
          clicked: () => {
            lobbyLCUHandler
              ?.createCustomLobby(customLobbyOpts)
              .catch((err) =>
                console.log(
                  "Error occured while trying to create custom lobby",
                  err
                )
              );
          },
        }}
      />
    </>
  );
}
