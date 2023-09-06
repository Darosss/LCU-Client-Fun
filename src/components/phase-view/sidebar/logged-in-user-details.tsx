import React, { useContext } from "react";
import { LCUContext } from "@lcu";
import { View } from "@nodegui/react-nodegui";
import { SuccessButton, DangerButton } from "@components";

export function LoggedInUserDetails() {
  const { currentSummoner } = useContext(LCUContext);

  return (
    <View id="logged-in-user-details-wrapper">
      {currentSummoner ? (
        <SuccessButton text={`Logged in as: ${currentSummoner.displayName}`} />
      ) : (
        <DangerButton text="Not logged in. Refresh" />
      )}
      {/* TODO: add change avatar, titles, tokens etc. */}
    </View>
  );
}
