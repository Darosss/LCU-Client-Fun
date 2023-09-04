import React from "react";
import { View } from "@nodegui/react-nodegui";
import { InfoText } from "@components";

export function GameStart() {
  return (
    <View id="game-start-wrapper">
      <InfoText text="Game is starting..." />
    </View>
  );
}
