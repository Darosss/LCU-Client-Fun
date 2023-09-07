import React, { useContext, useState } from "react";
import { View } from "@nodegui/react-nodegui";
import { LCUContext, queues } from "@lcu";
import { LeaveLobbyBtn } from "./leave-lobby-btn";
import { DefaultQueue } from "./default-queue";
import { LobbysList } from "./lobbys-list";
import { CustomLobby } from "./custom-lobby";
import { PrimaryButton, PrimaryText, SecondaryButton } from "@components";
import { CustomLobbyContextProvider } from "./custom-lobby/custom-lobby-context";

export function LobbyActions() {
  const { lobbyData } = useContext(LCUContext);
  const [showLobbyActions, setShowLobbyActions] = useState(true);
  if (!lobbyData) return null;

  function currentLobbyNameText() {
    return (
      <PrimaryText
        text={` 
        Lobby:${
          queues.find(
            ({ queueId }) => queueId === lobbyData?.gameConfig.queueId
          )?.description || `${lobbyData?.gameConfig.gameMode}`
        }`}
      />
    );
  }

  return showLobbyActions ? (
    <View id="lobby-actions">
      <View id="lobby-actions-manage">
        <SecondaryButton
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
        {lobbyData.gameConfig.isCustom ? (
          <CustomLobbyContextProvider>
            <CustomLobby />
          </CustomLobbyContextProvider>
        ) : (
          <DefaultQueue />
        )}
      </View>
    </View>
  ) : (
    <View id="lobby-hidden">
      <PrimaryButton
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
