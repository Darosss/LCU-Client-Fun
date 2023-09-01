import { Text, View } from "@nodegui/react-nodegui";
import React, { useContext } from "react";
import { LCUContext } from "../../../LCU/lcucontext";
import { PositionsPreferences } from "../../../LCU/types";

export function LobbyMembers() {
  const { lobbyData } = useContext(LCUContext);

  if (!lobbyData) return null;
  return (
    <View id="lobby-members-wrapper">
      {lobbyData.members.map(
        (
          { summonerName, firstPositionPreference, secondPositionPreference },
          idx
        ) => (
          <View key={idx} id="lobby-one-member-wrapper">
            <Text> {summonerName} </Text>
            <View id="lobby-one-member-position-preferences-wrapper">
              <Text> {firstPositionPreference}</Text>
              {firstPositionPreference !== PositionsPreferences.FILL ? (
                <Text> {secondPositionPreference}</Text>
              ) : null}
            </View>
          </View>
        )
      )}
    </View>
  );
}
