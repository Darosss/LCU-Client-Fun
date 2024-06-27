"use client";
import React, { useState } from "react";
import { CustomModeLobby } from "./custom-mode-lobby";
import { Button, useHeadContext } from "@/components";
import { useSocketEventsContext } from "@/socket";
import { EligibileLobbyAndQueueData } from "@/shared";
import { toast } from "react-toastify";

interface ShowLobbysProps {
  textOnShow?: string;
}

export function LobbysList({ textOnShow = "Show lobbys" }: ShowLobbysProps) {
  const { emits } = useSocketEventsContext();
  const [showLobbys, setShowLobbys] = useState(false);
  const [lobbysFilter, setLobbysFilter] = useState<string | null>(null);
  const [lobbys, setLobbys] = useState<EligibileLobbyAndQueueData[]>([]);
  const {
    lobbyDataState: [, setLobbyData],
    queuesData,
  } = useHeadContext();
  React.useEffect(() => {
    emits.showEligibleLobbys((error, data) => {
      if (error) return toast.error(error);
      const lobbysWithQueueData = data!.map((eligibleLobby) => {
        const queueData = queuesData.find(
          (queue) => queue.queueId === eligibleLobby.queueId
        );
        return { ...queueData, ...eligibleLobby };
      });
      setLobbys(lobbysWithQueueData);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleOnCreateLobby(queueId: number) {
    emits.createLobby(
      {
        queueId,
      },
      (error, data) => {
        if (error) return toast.error(error);

        setLobbyData(data!);
        setShowLobbys(false);
      }
    );
  }

  return (
    <>
      {showLobbys ? (
        <>
          <Button
            defaultButtonType="danger"
            onClick={() => setShowLobbys(!showLobbys)}
          >
            Hide lobbys
          </Button>
          <div id="eligible-lobbys-filter-wrapper">
            Filter modes
            <input
              onChange={(e) => setLobbysFilter(e.target.value.toLowerCase())}
              value={lobbysFilter || ""}
            />
          </div>
          <div id="lobbys-list">
            <StaticCustomModeLobbys />
            {lobbys
              .filter(({ description, map }) => {
                if (!lobbysFilter) return true;
                return (
                  description?.toLowerCase().includes(lobbysFilter) ||
                  map?.toLowerCase().includes(lobbysFilter)
                );
              })
              .map(({ queueId: eligibleQueueId, description }, idx) => {
                return (
                  <Button
                    key={idx}
                    onClick={() => {
                      if (!eligibleQueueId) return;
                      handleOnCreateLobby(eligibleQueueId);
                    }}
                  >
                    {`${description || eligibleQueueId}`}
                  </Button>
                );
              })}
          </div>
        </>
      ) : (
        <Button
          defaultButtonType="info"
          onClick={() => setShowLobbys(!showLobbys)}
        >
          {textOnShow}
        </Button>
      )}
    </>
  );
}

//TODO: later add possibility for user to change options.
function StaticCustomModeLobbys() {
  return (
    <>
      <CustomModeLobby
        lobbyName="Practice tool, 10bots - blind"
        customLobbyOpts={{
          gameMode: "PRACTICETOOL",
          mapId: 11,
          mutators: { id: 1 },
          teamSize: 5,
          specatatorPolicy: "AllAllowed",
        }}
      />
      <CustomModeLobby
        lobbyName="Practice tool, 10bots - draft"
        customLobbyOpts={{
          gameMode: "PRACTICETOOL",
          mapId: 11,
          mutators: { id: 2 },
          teamSize: 5,
          specatatorPolicy: "AllAllowed",
        }}
      />
      <CustomModeLobby
        lobbyName="Custom - blind"
        customLobbyOpts={{
          gameMode: "CLASSIC",
          mapId: 11,
          mutators: { id: 1 },
          teamSize: 5,
          specatatorPolicy: "AllAllowed",
        }}
      />
      <CustomModeLobby
        lobbyName="Custom - draft"
        customLobbyOpts={{
          gameMode: "CLASSIC",
          mapId: 11,
          mutators: { id: 2 },
          teamSize: 5,
          specatatorPolicy: "AllAllowed",
        }}
      />
      <CustomModeLobby
        lobbyName="Howling abys custom"
        customLobbyOpts={{
          gameMode: "CLASSIC",
          mapId: 12,
          mutators: { id: 1 },
          teamSize: 5,
          specatatorPolicy: "AllAllowed",
        }}
      />
    </>
  );
}
