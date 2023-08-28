import { Button, Text, View } from "@nodegui/react-nodegui";
import React, { useContext, useState } from "react";
import { LCUContext } from "../../LCU/lcucontext";
import { queues } from "../../LCU/queues";
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
      <Button
        text="Hide lobby"
        on={{ clicked: () => setShowLobbyActions(false) }}
      />
      {currentLobbyNameText()}
      {lobbyData.gameConfig.isCustom ? <CustomLobby /> : <DefaultQueue />}
      <LeaveLobbyBtn />

      {lobbyData.localMember.isLeader ? (
        <LobbysList textOnShow="Change mode" />
      ) : null}
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
