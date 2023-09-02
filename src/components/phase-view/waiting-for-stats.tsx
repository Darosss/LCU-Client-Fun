import React from "react";
import { Button, Text, View } from "@nodegui/react-nodegui";
import { lcuClientHandlerObj } from "@lcu";

export function WaitingForStats() {
  return (
    <View id="waiting-for-stats-wrapper">
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
    </View>
  );
}
