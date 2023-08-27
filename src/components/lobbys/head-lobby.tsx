import { Text, View } from "@nodegui/react-nodegui";
import React from "react";
import { Lobbys } from "./lobbys";
import { headLobbyStyleSheet } from "./stylesheet";

export function HeadLobby() {
  return (
    <View id="head-lobby" styleSheet={headLobbyStyleSheet}>
      <Text id="head-lobby-header"> Lobby </Text>
    </View>
  );
}
