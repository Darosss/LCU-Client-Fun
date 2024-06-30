"use client";

import React from "react";
import { LobbyActions } from "./lobby-actions";
import { LobbysList } from "./lobbys-list";
import { useHeadContext } from "../lcu";
import styles from "./lobbys.module.scss";

export function Lobbys() {
  const {
    lobbyDataState: [lobbyData],
  } = useHeadContext();

  return (
    <div className={styles.lobbysWrapper}>
      {lobbyData ? <LobbyActions /> : <LobbysList />}
    </div>
  );
}
