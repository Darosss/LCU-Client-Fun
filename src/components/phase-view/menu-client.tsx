import { Text } from "@nodegui/react-nodegui";
import React, { useContext } from "react";
import { defaultTextStyle } from "../styles";
import { LCUContext } from "@lcu";
import { Lobbys } from "@components";

export function MenuClient() {
  const { currentSummoner } = useContext(LCUContext);

  return (
    <>
      {currentSummoner ? (
        <Text style={defaultTextStyle}>
          Logged in as: {currentSummoner.displayName}
        </Text>
      ) : (
        <Text style={defaultTextStyle}>Not logged in. Refresh </Text>
      )}
      <Lobbys />
    </>
  );
}
