import { Text, View } from "@nodegui/react-nodegui";
import React, { useContext } from "react";
import { LCUContext } from "../../LCU/lcucontext";
import { queues } from "../../LCU/queues";
import { LeaveLobbyBtn } from "./leave-lobby-btn";
import { DefaultQueue } from "./default-queue";
import { textStyle } from "./styles";
import { LobbysList } from "./lobbys-list";
import { CustomLobby } from "./custom-lobby";

export function LobbyActions() {
  const { lobbyData } = useContext(LCUContext);

  if (!lobbyData) return null;

  return (
    <View id="lobby-actions">
      <Text style={textStyle}>
        Lobby:
        {queues.find(({ queueId }) => queueId === lobbyData.gameConfig.queueId)
          ?.description || `${lobbyData.gameConfig.gameMode}`}
      </Text>
      {lobbyData.gameConfig.isCustom ? <CustomLobby /> : <DefaultQueue />}
      <LeaveLobbyBtn />

      {lobbyData.localMember.isLeader ? (
        <LobbysList textOnShow="Change mode" />
      ) : null}
    </View>
  );
}
