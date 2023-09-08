import React, { useContext } from "react";
import { LCUContext, lcuHandlerFactory } from "@lcu";
import { View } from "@nodegui/react-nodegui";
import { SuccessButton, DangerButton } from "@components";

export function LoggedInUserDetails() {
  const {
    currentSummoner,
    currentPhase,
    initalizeHandlers,
    setCurrentSummoner,
  } = useContext(LCUContext);

  async function refreshLCUClientCredentials() {
    if (currentPhase !== "None") return;
    try {
      await lcuHandlerFactory.refresh();
    } catch (err) {
      console.log(
        `Error occured while trying to refresh LCU Client credentials`,
        err
      );
    }
    setCurrentSummoner(null);
    initalizeHandlers();
  }

  return (
    <View id="logged-in-user-details-wrapper">
      {currentSummoner ? (
        <>
          <SuccessButton
            text={`Logged in as: ${currentSummoner.displayName}`}
          />
          <DangerButton
            text="Refresh"
            on={{
              clicked: () => refreshLCUClientCredentials(),
            }}
          />
        </>
      ) : (
        <DangerButton
          text="Not logged in. Refresh"
          on={{
            clicked: () => refreshLCUClientCredentials(),
          }}
        />
      )}
      {/* TODO: add change avatar, titles, tokens etc. */}
    </View>
  );
}
