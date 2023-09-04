import React from "react";
import { CreateCustomLobbyOpts, lcuClientHandlerObj } from "@lcu";
import { SecondaryButton } from "@components";

interface CustomModeLobbyProps {
  lobbyName: string;
  customLobbyOpts: CreateCustomLobbyOpts;
}

export function CustomModeLobby({
  lobbyName,
  customLobbyOpts,
}: CustomModeLobbyProps) {
  return (
    <>
      <SecondaryButton
        text={lobbyName}
        on={{
          clicked: () => {
            lcuClientHandlerObj
              .createCustomLobby(customLobbyOpts)
              .catch((err) =>
                console.log(
                  //FIXME: add proper console log
                  "Error occured while trying to search the match",
                  err
                )
              );
          },
        }}
      />
    </>
  );
}
