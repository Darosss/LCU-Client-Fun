import React, { useContext } from "react";
import { SearchMatchBtn } from "./search-match-btn";
import { PositionSelector } from "./position-selector";
import { LobbyMembers } from "./lobby-members";
import { useHeadContext } from "../../lcu";

export function DefaultQueue() {
  const {
    lobbyDataState: [lobbyData],
  } = useHeadContext();
  if (!lobbyData) return null;
  return (
    <div id="default-queue-wrapper">
      {lobbyData.gameConfig.showPositionSelector ? <PositionSelector /> : null}
      {lobbyData.localMember.isLeader ? <SearchMatchBtn /> : null}
      <LobbyMembers />
    </div>
  );
}
