import React, { useContext } from "react";
import { View } from "@nodegui/react-nodegui";
import { LCUContext } from "@lcu";
import { SearchMatchBtn } from "./search-match-btn";
import { PositionSelector } from "./position-selector";
import { LobbyMembers } from "./lobby-members";

export function DefaultQueue() {
  const { lobbyData } = useContext(LCUContext);
  if (!lobbyData) return null;
  return (
    <View
      id="default-queue-wrapper"
      //FIXME: i don't know styles from stylesheet with display didnt work there
      // so i put inline style here
      style="display:'flex';flex-direction:'column';"
    >
      {lobbyData.gameConfig.showPositionSelector ? <PositionSelector /> : null}
      {lobbyData.localMember.isLeader ? <SearchMatchBtn /> : null}
      <LobbyMembers />
    </View>
  );
}
