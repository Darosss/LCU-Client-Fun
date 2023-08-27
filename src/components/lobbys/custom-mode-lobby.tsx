import { Button } from "@nodegui/react-nodegui";
import React from "react";
import { lcuClientHandlerObj } from "../../LCU/LCUClientHandler";
import { CreateCustomLobbyOpts } from "../../LCU/types/custom-mode";

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
      <Button
        text={lobbyName}
        on={{
          clicked: () => {
            lcuClientHandlerObj
              .createCustomLobby(customLobbyOpts)
              .catch((err) =>
                console.log(
                  "Error occured while trying to search the match",
                  err
                )
              );
          },
        }}
      ></Button>
    </>
  );
}
