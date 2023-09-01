import { View } from "@nodegui/react-nodegui";
import React, { useContext } from "react";
import { LCUContext } from "../../LCU/lcucontext";
import { lobbysStylesheet } from "./stylesheet";
import { LobbyActions } from "./lobby-actions";
import { LobbysList } from "./lobbys-list";

export function Lobbys() {
  const {
    lobbyData,
    options: {
      minSize: { width, height },
    },
  } = useContext(LCUContext);

  return (
    <View
      id="eligible-lobbys-wrapper"
      styleSheet={lobbysStylesheet(width, height)}
    >
      {lobbyData ? <LobbyActions /> : <LobbysList />}
    </View>
  );
}
