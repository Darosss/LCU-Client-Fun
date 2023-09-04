import React, { useContext } from "react";
import { View } from "@nodegui/react-nodegui";
import { CustomLobbyContextProvider } from "./custom-lobby-context";
import { LobbyTeamsView } from "./lobby-teams-view";
import { LCUContext, lcuClientHandlerObj } from "@lcu";
import { SuccessButton } from "@components";

export function CustomLobby() {
  const { lobbyData } = useContext(LCUContext);
  return (
    <CustomLobbyContextProvider>
      <View id="custom-lobby">
        <View>
          {lobbyData?.localMember.isLeader ? (
            <SuccessButton
              on={{
                clicked: () => {
                  lcuClientHandlerObj
                    .startCustomChampSelect()
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
    </CustomLobbyContextProvider>
  );
}
