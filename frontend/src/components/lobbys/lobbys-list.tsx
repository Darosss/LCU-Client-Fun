"use client";
import React, { useCallback, useEffect, useState } from "react";
import { CustomModeLobby } from "./custom-mode-lobby";
import { Button, useHeadContext } from "@/components";
import { useSocketEventsContext } from "@/socket";
import { EligibileLobbyAndQueueData } from "@/shared";
import { toast } from "react-toastify";
import styles from "./lobbys.module.scss";
import { ToggleLobbysButton } from "./toggle-lobbys-btn";

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

  const emitAndSetShowEligibleLobbys = useCallback(() => {
    emits.showEligibleLobbys((error, data) => {
      if (error) return toast.error(error);
      const lobbysWithQueueData = data!.map((eligibleLobby) => {
        const queueData = queuesData.find(
          (queue) => queue.queueId === eligibleLobby.queueId
        );
        return { ...eligibleLobby, ...queueData };
      });
      setLobbys(lobbysWithQueueData);
    });
  }, [emits, queuesData]);

  function handleOnCreateLobby(queueId: number) {
    emits.createLobby({ queueId }, (error, data) => {
      if (error) return toast.error(error);

      setLobbyData(data!);
      setShowLobbys(false);
    });
  }

  useEffect(() => {
    if (!showLobbys) return;

    emitAndSetShowEligibleLobbys();
  }, [emitAndSetShowEligibleLobbys, showLobbys]);

  return (
    <div className={styles.lobbysListWrapper}>
      {showLobbys ? (
        <>
          <ToggleLobbysButton
            showLobbys={showLobbys}
            onClickButton={() => setShowLobbys(!showLobbys)}
          />

          <div className={styles.lobbysContentWrapper}>
            <div className={styles.filterWrapper}>
              <span>Filter modes </span>
              <input
                onChange={(e) => setLobbysFilter(e.target.value.toLowerCase())}
                value={lobbysFilter || ""}
              />
            </div>
            <div className={styles.lobbysContent}>
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
                      defaultButtonType={"primary"}
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
          </div>
        </>
      ) : (
        <div className={styles.toggleLobbysButtonWrapper}>
          <Button
            defaultButtonType="info"
            onClick={() => setShowLobbys(!showLobbys)}
          >
            {textOnShow}
          </Button>
        </div>
      )}
    </div>
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
