import React from "react";
import { Button, Text, View } from "@nodegui/react-nodegui";
import { lcuClientHandlerObj } from "@lcu";

export function Reconnect() {
  return (
    <View id="reconnect-wrapper">
      <Text>Summoner in game...</Text>
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
    </View>
  );
}
