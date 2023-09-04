import React from "react";
import { InfoText } from "@components";
import { View } from "@nodegui/react-nodegui";

export function InProgress() {
  return (
    <View id="in-progress-wrapper">
      <InfoText text="Game in progress..." />
    </View>
  );
}
