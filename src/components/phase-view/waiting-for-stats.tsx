import React from "react";
import { lcuClientHandlerObj } from "@lcu";
import { InfoButton, InfoText } from "@components";
import { View } from "@nodegui/react-nodegui";

export function WaitingForStats() {
  return (
    <View id="waiting-for-stats-wrapper">
      <InfoText text="Waiting for stats" />
      <InfoButton
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
