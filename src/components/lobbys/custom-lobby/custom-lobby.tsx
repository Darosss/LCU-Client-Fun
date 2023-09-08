import React, { useContext, useEffect } from "react";
import { View } from "@nodegui/react-nodegui";
import { CustomLobbyContext } from "./custom-lobby-context";
import { LobbyTeamsView } from "./lobby-teams-view";
import { LCUContext } from "@lcu";
import { SuccessButton } from "@components";

export function CustomLobby() {
  const { lobbyData, lobbyLCUHandler } = useContext(LCUContext);
  const { setChampionBots } = useContext(CustomLobbyContext);

  useEffect(() => {
    lobbyLCUHandler
      ?.getAvailableChampionsBots()
      .then((championBots) => {
        setChampionBots(championBots);
      })
      .catch((err) =>
        console.log(`Error occured while getting available bot champions`, err)
      );
  }, [lobbyLCUHandler]);
  return (
    <View id="custom-lobby">
      <View>
        {lobbyData?.localMember.isLeader ? (
          <SuccessButton
            on={{
              clicked: () => {
                lobbyLCUHandler
                  ?.startCustomChampSelect()
                  .catch((err) =>
                    console.log(
                      `Error occured while trying to start custom match mode`,
                      err
                    )
                  );
              },
            }}
            text="Start custom"
          />
        ) : null}
      </View>
      <View>
        <LobbyTeamsView />
      </View>
    </View>
  );
}
