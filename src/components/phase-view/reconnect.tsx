import React from "react";
import { InfoButton, InfoText } from "@components";
import { lcuClientHandlerObj } from "@lcu";
import { View } from "@nodegui/react-nodegui";

export function Reconnect() {
  return (
    <View id="reconnect-wrapper">
      <InfoText text="Summoner in game..." />
      <InfoButton
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
    </View>
  );
}
