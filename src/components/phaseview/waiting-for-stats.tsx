import { Button, Text } from "@nodegui/react-nodegui";
import React from "react";
import { lcuClientHandlerObj } from "../../LCU/LCUClientHandler";

export function WaitingForStats() {
  return (
    <>
      <Text> Waiting for stats</Text>
      <Button
        text="Skip waiting"
        on={{
          clicked: () =>
            lcuClientHandlerObj
              .dismissStatsAfterMatch()
              .catch((err) =>
                console.log(
                  `Error occured while trying to skip stats after match`,
                  err
                )
              ),
        }}
      />
    </>
  );
}
