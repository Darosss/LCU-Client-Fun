import React, { useContext } from "react";
import { LCUContext } from "@lcu";
import { InfoButton, InfoText } from "@components";
import { View } from "@nodegui/react-nodegui";

export function WaitingForStats() {
  const { headLCUHandler } = useContext(LCUContext);
  return (
    <View id="waiting-for-stats-wrapper">
      <InfoText text="Waiting for stats" />
      <InfoButton
        text="Skip waiting"
        on={{
          clicked: () =>
            headLCUHandler
              ?.dismissStatsAfterMatch()
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
