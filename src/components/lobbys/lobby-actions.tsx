import React, { useContext, useState } from "react";
import { Button, Text, View } from "@nodegui/react-nodegui";
import { LCUContext, queues } from "@lcu";
import { LeaveLobbyBtn } from "./leave-lobby-btn";
import { DefaultQueue } from "./default-queue";
import { textStyle } from "./styles";
import { LobbysList } from "./lobbys-list";
import { CustomLobby } from "./custom-lobby";

export function LobbyActions() {
  const { lobbyData } = useContext(LCUContext);
  const [showLobbyActions, setShowLobbyActions] = useState(true);
  if (!lobbyData) return null;

  function currentLobbyNameText() {
    return (
      <Text style={textStyle}>
        Lobby:
        {queues.find(({ queueId }) => queueId === lobbyData?.gameConfig.queueId)
          ?.description || `${lobbyData?.gameConfig.gameMode}`}
      </Text>
    );
  }

  return showLobbyActions ? (
    <View id="lobby-actions">
      <View id="lobby-actions-manage">
        <Button
          text="Hide lobby"
          on={{ clicked: () => setShowLobbyActions(false) }}
        />
        {currentLobbyNameText()}
        <LeaveLobbyBtn />

        {lobbyData.localMember.isLeader ? (
          <LobbysList textOnShow="Change mode" />
        ) : null}
      </View>
      <View id="lobby-actions-members">
        {lobbyData.gameConfig.isCustom ? <CustomLobby /> : <DefaultQueue />}
      </View>
    </View>
  ) : (
    <View id="lobby-hidden">
      <Button
        text="Lobby"
        on={{
          clicked: () => {
            setShowLobbyActions(true);
          },
        }}
      />
      {currentLobbyNameText()}
    </View>
  );
}
