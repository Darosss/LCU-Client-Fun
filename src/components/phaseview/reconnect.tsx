import { Button } from "@nodegui/react-nodegui";
import React from "react";
import { lcuClientHandlerObj } from "../../LCU/LCUClientHandler";

export function Reconnect() {
  return (
    <Button
      text="Reconnect"
      on={{
        clicked: () =>
          lcuClientHandlerObj
            .reconnectToCurrentMatch()
            .catch((err) =>
              console.log(
                `Error occured while trying to recconect to match`,
                err
              )
            ),
      }}
    />
  );
}
