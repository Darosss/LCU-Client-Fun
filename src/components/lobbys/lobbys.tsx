import React, { useContext } from "react";
import { View } from "@nodegui/react-nodegui";
import { LCUContext } from "@lcu";
import { LobbyActions } from "./lobby-actions";
import { LobbysList } from "./lobbys-list";

export function Lobbys() {
  const { lobbyData } = useContext(LCUContext);

  return (
    <View id="eligible-lobbys-wrapper">
      {lobbyData ? <LobbyActions /> : <LobbysList />}
    </View>
  );
}
