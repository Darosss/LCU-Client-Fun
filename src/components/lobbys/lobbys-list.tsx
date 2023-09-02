import React, { useState } from "react";
import { Button, LineEdit, Text, View } from "@nodegui/react-nodegui";
import { lcuClientHandlerObj, queues, EligibileLobbyAndQueueData } from "@lcu";
import { CustomModeLobby } from "./custom-mode-lobby";

interface ShowLobbysProps {
  textOnShow?: string;
}

export function LobbysList({ textOnShow = "Show lobbys" }: ShowLobbysProps) {
  const [showLobbys, setShowLobbys] = useState(false);
  const [lobbysFilter, setLobbysFilter] = useState<string | null>(null);
  const [lobbys, setLobbys] = useState<EligibileLobbyAndQueueData[]>([]);

  React.useEffect(() => {
    if (showLobbys) {
      lcuClientHandlerObj
        .showEligibleLobbys()
        .then((eligibleLobbys) => {
          const lobbysWithQueueData = eligibleLobbys.map((eligibleLobby) => {
            const queueData = queues.find(
              (queue) => queue.queueId === eligibleLobby.queueId
            );
            return { ...queueData, ...eligibleLobby };
          });

          setLobbys(lobbysWithQueueData);
        })
        .catch((err) =>
          console.log("Error occured while getting eligible lobbys", err)
        );
    }
  }, [showLobbys, lobbysFilter]);

  return (
    <>
      <Button
        id="show-hide-lobbys-btn"
        text={`${!showLobbys ? textOnShow : "Hide lobbys"}`}
        on={{
          clicked: () => {
            setShowLobbys(!showLobbys);
          },
        }}
      ></Button>
      {showLobbys ? (
        <>
          <View id="eligible-lobbys-filter-wrapper">
            <Text> Filter modes </Text>
            <LineEdit
              on={{
                textChanged: (e) => setLobbysFilter(e.toLowerCase()),
              }}
            />
          </View>
          <View id="lobbys-list">
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
                    on={{
                      clicked: (e) => {
                        if (!eligibleQueueId) return;

                        lcuClientHandlerObj
                          .createLobby(eligibleQueueId)
                          .then(() => {
                            setShowLobbys(false);
                          })
                          .catch((err) =>
                            console.log(
                              "Error occured while creating lobby",
                              err
                            )
                          );
                      },
                    }}
                    text={`${description || eligibleQueueId}`}
                  ></Button>
                );
              })}
          </View>
        </>
      ) : null}
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
