import React from "react";
import { Button } from "@nodegui/react-nodegui";
import { CreateCustomLobbyOpts, lcuClientHandlerObj } from "@lcu";

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
                  //FIXME: add proper console log
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
