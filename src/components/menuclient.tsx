import { Text, View } from "@nodegui/react-nodegui";
import React, { useContext } from "react";
import { defaultTextStyle } from "./styles";
import { LCUContext } from "../LCU/lcucontext";
import { Lobbys } from "./lobbys";

export function MenuClient() {
  const { currentSummoner } = useContext(LCUContext);

  return (
    <View style={containerStyle}>
      <View>
        {currentSummoner ? (
          <Text style={defaultTextStyle}>
            Logged in as: {currentSummoner.displayName}
          </Text>
        ) : (
          <Text style={defaultTextStyle}>Not logged in. Refresh </Text>
        )}
      </View>
      <View>
        <Lobbys />
      </View>
    </View>
  );
}

const containerStyle = `
  display: 'flex';
  flex-direction:'row';
  justify-content: 'space-around';
`;
