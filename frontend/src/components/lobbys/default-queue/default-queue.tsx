import React from "react";
import { SearchMatchBtn } from "./search-match-btn";
import { PositionSelector } from "./position-selector";
import { LobbyMembers } from "./lobby-members";
import { CancelSearchBtn, useHeadContext } from "@/components";
import styles from "./default-queue.module.scss";

export function DefaultQueue() {
  const {
    lobbyDataState: [lobbyData],
    currentPhase,
  } = useHeadContext();

  if (!lobbyData) return null;
  return (
    <div className={styles.defaultQueueWrapper}>
      {lobbyData.gameConfig.showPositionSelector ? (
        <div className={styles.positionSelectorWrapper}>
          <PositionSelector />
        </div>
      ) : null}
      {lobbyData.localMember.isLeader ? (
        <div className={styles.searchMatchButtonWrapper}>
          {currentPhase === "Matchmaking" ? (
            <CancelSearchBtn />
          ) : (
            <SearchMatchBtn />
          )}
        </div>
      ) : null}
      <div className={styles.lobbyMembersWrapper}>
        <LobbyMembers />
      </div>
    </div>
  );
}
