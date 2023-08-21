import { useEventHandler, View, Button, Text } from "@nodegui/react-nodegui";
import React, { useState } from "react";
import { lcuClientHandlerObj } from "../../LCU/LCUClientHandler";
import { QPushButtonSignals } from "@nodegui/nodegui";
import { queues } from "../../LCU/queues";
import { EligibileLobby } from "../../LCU/types/";
import { backgroundLinearGradient } from "../styles";

export function Lobbys() {
  const [lobbys, setLobbys] = useState<EligibileLobby[]>([]);
  const [currentLobby, setCurrentLobby] = useState("");
  const [isSearchingMatch, setIsSearchingMatch] = useState(false);

  const showLobbysBtnHandler = useEventHandler<QPushButtonSignals>(
    {
      clicked: () => {
        lcuClientHandlerObj
          .showEligibleLobbys()
          .then((eligibleLobbys) => {
            setLobbys(eligibleLobbys);
          })
          .catch((err) =>
            console.log("Error occured while getting eligible lobbys", err)
          );
      },
    },
    []
  );
  const leaveLobbyBtnHandler = useEventHandler<QPushButtonSignals>(
    {
      clicked: () => {
        lcuClientHandlerObj
          .leaveLobby()
          .then(() => {
            setCurrentLobby("");
          })
          .catch((err) =>
            console.log("Error occured while leaving lobby", err)
          );
      },
    },
    []
  );
  const searchMatchBtnHandler = useEventHandler<QPushButtonSignals>(
    {
      clicked: () => {
        lcuClientHandlerObj
          .searchMatch()
          .then(() => {
            setIsSearchingMatch(true);
          })
          .catch((err) =>
            console.log("Error occured while trying to search the match", err)
          );
      },
    },
    []
  );
  const createCustomLobbyBtnHandler = useEventHandler<QPushButtonSignals>(
    {
      clicked: () => {
        lcuClientHandlerObj
          .createCustomLobby()
          .then(() => {
            setCurrentLobby("Custom");
          })
          .catch((err) =>
            console.log("Error occured while trying to search the match", err)
          );
      },
    },
    []
  );

  return (
    <>
      <View style={"display:'flex'; flex-direction:'row'"}>
        <View>
          {currentLobby ? (
            <>
              <Button style={playBtn} on={searchMatchBtnHandler}>
                Start
              </Button>
              <Text style={textStyle}> Lobby: {currentLobby} </Text>
              {isSearchingMatch ? (
                <Text style={textStyle}>Searching match </Text>
              ) : null}
              <Button
                style={
                  playBtn +
                  `
              ${backgroundLinearGradient(
                "rgba(2,0,36,1)",
                "rgba(136,52,64,1)"
              )}`
                }
                on={leaveLobbyBtnHandler}
              >
                Leave lobby
              </Button>
            </>
          ) : (
            <Button style={playBtn} on={showLobbysBtnHandler}>
              Show lobbys
            </Button>
          )}
        </View>
        <View>
          <Button style={eligibleLobbysBtn} on={createCustomLobbyBtnHandler}>
            Custom lobby
          </Button>
          {lobbys.map(({ queueId: eligibleQueueId }, idx) => {
            const queue = queues.find(
              ({ queueId }) => queueId === eligibleQueueId
            );
            return (
              <Button
                key={idx}
                style={eligibleLobbysBtn}
                on={{
                  clicked: (e) =>
                    lcuClientHandlerObj
                      .createLobby(eligibleQueueId)
                      .then(() => {
                        setCurrentLobby(
                          queue?.description || String(eligibleQueueId)
                        );
                      })
                      .catch((err) =>
                        console.log("Error occured while creating lobby", err)
                      ),
                }}
                text={`
            ${queue?.description || eligibleQueueId}
            
          `}
              ></Button>
            );
          })}
        </View>
      </View>
    </>
  );
}

const textStyle = `
  ${backgroundLinearGradient("rgba(25,0,36,0.6)", "rgba(244,52,136,0.7)")}
  width: 300px;
  margin-horizontal: 5px;

`;

const playBtn = `
  margin-horizontal: 5px;
  border:0;
  ${backgroundLinearGradient("rgba(25,0,36,0.6)", "rgba(43,52,136,0.7)")}
  height: 30px;
  width: 300px;
  font-size: 20px;
`;

const eligibleLobbysBtn = `
  border:0;
  ${backgroundLinearGradient("rgba(25,0,36,0.6)", "rgba(43,52,136,0.7)")}
  height: 30px;
  width: 300px;
`;
