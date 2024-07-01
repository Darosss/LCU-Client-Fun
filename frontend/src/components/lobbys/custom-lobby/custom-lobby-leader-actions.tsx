"use client";

import React from "react";
import { Button, useHeadContext } from "@/components";
import { useSocketEventsContext } from "@/socket";
import { useCustomLobbyContext } from "./custom-lobby-context";
import { BotDifficulty } from "@/shared";
import { toast } from "react-toastify";
import styles from "./custom-lobby-leader-actions.module.scss";

export function CustomLobbyLeaderActions() {
  const {
    lobbyDataState: [lobbyData],
  } = useHeadContext();
  const { emits } = useSocketEventsContext();
  const { currentBotDifficulty, setCurrentBotDifficulty } =
    useCustomLobbyContext();
  function changeNewBotsDifficulty() {
    if (currentBotDifficulty === BotDifficulty.EASY)
      return setCurrentBotDifficulty(BotDifficulty.MEDIUM);
    return setCurrentBotDifficulty(BotDifficulty.EASY);
  }
  function handleOnStartCustomBtn() {
    emits.startCustomChampSelect((error) => {
      if (error) toast.error(error);
    });
  }
  return lobbyData?.localMember.isLeader ? (
    <div className={styles.customLobbyLeaderActionsWrapper}>
      <div>
        <Button defaultButtonType="success" onClick={handleOnStartCustomBtn}>
          Start custom
        </Button>
      </div>
      <div className={styles.customBotDificultyWrapper}>
        <div>Default bot difficulty</div>
        <Button defaultButtonType={"info"} onClick={changeNewBotsDifficulty}>
          {currentBotDifficulty}
        </Button>
      </div>
    </div>
  ) : null;
}
