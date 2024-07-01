"use client";

import React, { useMemo } from "react";
import { Button, useHeadContext } from "@/components";
import { useSocketEventsContext } from "@/socket";
import { useCustomLobbyContext } from "./custom-lobby-context";
import { toast } from "react-toastify";
import styles from "./custom-lobby-leader-actions.module.scss";
import { changeBotDifficulty, getBotDifficultyBtnColor } from "./helpers";

export function CustomLobbyLeaderActions() {
  const {
    lobbyDataState: [lobbyData],
  } = useHeadContext();
  const { emits } = useSocketEventsContext();
  const { currentBotDifficulty, setCurrentBotDifficulty } =
    useCustomLobbyContext();

  function changeNewBotsDifficulty() {
    setCurrentBotDifficulty(changeBotDifficulty(currentBotDifficulty));
  }

  function handleOnStartCustomBtn() {
    emits.startCustomChampSelect((error) => {
      if (error) toast.error(error);
    });
  }

  const botDifficultyBtnColor = useMemo(
    () => getBotDifficultyBtnColor(currentBotDifficulty),
    [currentBotDifficulty]
  );
  return lobbyData?.localMember.isLeader ? (
    <div className={styles.customLobbyLeaderActionsWrapper}>
      <div>
        <Button defaultButtonType="success" onClick={handleOnStartCustomBtn}>
          Start custom
        </Button>
      </div>
      <div className={styles.customBotDificultyWrapper}>
        <div>Default bot difficulty</div>
        <Button
          defaultButtonType={botDifficultyBtnColor}
          onClick={changeNewBotsDifficulty}
        >
          {currentBotDifficulty}
        </Button>
      </div>
    </div>
  ) : null;
}
