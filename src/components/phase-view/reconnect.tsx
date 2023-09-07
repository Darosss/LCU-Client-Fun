import React, { useContext } from "react";
import { InfoButton, InfoText } from "@components";
import { View } from "@nodegui/react-nodegui";
import { LCUContext } from "@lcu";

export function Reconnect() {
  const { headLCUHandler } = useContext(LCUContext);
  return (
    <View id="reconnect-wrapper">
      <InfoText text="Summoner in game..." />
      <InfoButton
        text="Reconnect"
        on={{
          clicked: () =>
            headLCUHandler
              ?.reconnectToCurrentMatch()
              .catch((err) =>
                console.log(
                  `Error occured while trying to recconect to match`,
                  err
                )
              ),
        }}
      />
    </View>
  );
}
