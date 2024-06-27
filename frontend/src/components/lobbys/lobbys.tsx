import React from "react";
import { LobbyActions } from "./lobby-actions";
import { LobbysList } from "./lobbys-list";
import { useHeadContext } from "../lcu";

export function Lobbys() {
  const {
    lobbyDataState: [lobbyData],
  } = useHeadContext();

  return (
    <div id="eligible-lobbys-wrapper">
      {lobbyData ? <LobbyActions /> : <LobbysList />}
    </div>
  );
}
