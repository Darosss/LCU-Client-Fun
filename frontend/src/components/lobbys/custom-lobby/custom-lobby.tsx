"use client";

import React, { useEffect } from "react";
import { LobbyTeamsView } from "./lobby-teams-view";
import { useHeadContext } from "@/components";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";
import { useCustomLobbyContext } from "./custom-lobby-context";
import styles from "./custom-lobby.module.scss";
import { CustomLobbyLeaderActions } from "./custom-lobby-leader-actions";

export function CustomLobby() {
  const {
    lobbyDataState: [lobbyData],
  } = useHeadContext();
  const { emits } = useSocketEventsContext();
  const { setChampionBots, currentBotDifficulty, setCurrentBotDifficulty } =
    useCustomLobbyContext();

  useEffect(() => {
    emits.getAvailableChampionsBots((error, data) => {
      if (error) toast.error(error);
      setChampionBots(data!);
    });
  }, [emits]);

  return (
    <div className={styles.customLobbyWrapper}>
      <div className={styles.customLobbyActions}>
        <CustomLobbyLeaderActions />
      </div>
      <div className={styles.customLobbyTeams}>
        <LobbyTeamsView />
      </div>
    </div>
  );
}
