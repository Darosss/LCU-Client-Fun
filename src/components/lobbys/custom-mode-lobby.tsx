import { Button, useEventHandler } from "@nodegui/react-nodegui";
import React from "react";
import { lcuClientHandlerObj } from "../../LCU/LCUClientHandler";
import { eligibleLobbysBtn } from "./styles";

export function CustomModeLobby() {
  return (
    <Button
      on={{
        clicked: () => {
          lcuClientHandlerObj
            .createCustomLobby()
            .then((lobbyData) => {})
            .catch((err) =>
              console.log("Error occured while trying to search the match", err)
            );
        },
      }}
    >
      Custom lobby
    </Button>
  );
}
