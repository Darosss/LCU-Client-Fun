"use client";

import React, { useContext, useEffect } from "react";
import { LobbyTeamsView } from "./lobby-teams-view";
import { Button, useHeadContext } from "@/components";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";
import { useCustomLobbyContext } from "./custom-lobby-context";

export function CustomLobby() {
  const {
    lobbyDataState: [lobbyData],
  } = useHeadContext();
  const { emits } = useSocketEventsContext();
  const { setChampionBots } = useCustomLobbyContext();

  useEffect(() => {
    emits.getAvailableChampionsBots((error, data) => {
      if (error) toast.error(error);

      setChampionBots(data!);
    });
  }, [emits]);

  function handleOnStartCustomBtn() {
    emits.startCustomChampSelect((error) => {
      if (error) toast.error(error);
    });
  }
  return (
    <div id="custom-lobby">
      <div>
        {lobbyData?.localMember.isLeader ? (
          <Button onClick={handleOnStartCustomBtn}>Start custom</Button>
        ) : null}
      </div>
      <div>
        <LobbyTeamsView />
      </div>
    </div>
  );
}
