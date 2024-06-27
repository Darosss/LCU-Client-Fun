import React from "react";
import { LeaveLobbyBtn } from "./leave-lobby-btn";
import { DefaultQueue } from "./default-queue";
import { LobbysList } from "./lobbys-list";
import { CustomLobby } from "./custom-lobby";
import { CustomLobbyContextProvider } from "./custom-lobby";
import { useHeadContext } from "../lcu";

export function LobbyActions() {
  const {
    lobbyDataState: [lobbyData],
    queuesData,
  } = useHeadContext();
  if (!lobbyData) return null;

  function currentLobbyNameText() {
    return `Lobby:${
      queuesData.find(
        ({ queueId }) => queueId === lobbyData?.gameConfig.queueId
      )?.description || `${lobbyData?.gameConfig.gameMode}`
    }`;
  }
  return (
    <div id="lobby-actions">
      <div id="lobby-actions-manage">
        {currentLobbyNameText()}
        <LeaveLobbyBtn />

        {lobbyData.localMember.isLeader ? (
          <LobbysList textOnShow="Change mode" />
        ) : null}
      </div>
      <div id="lobby-actions-members">
        {lobbyData.gameConfig.isCustom ? (
          <CustomLobbyContextProvider>
            <CustomLobby />
          </CustomLobbyContextProvider>
        ) : (
          <DefaultQueue />
        )}
      </div>
    </div>
  );
}
