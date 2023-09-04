import React, { useContext } from "react";
import { LCUContext } from "@lcu";
import { DangerButton, Lobbys, PrimaryButton } from "@components";

export function MenuClient() {
  const { currentSummoner } = useContext(LCUContext);

  return (
    <>
      {currentSummoner ? (
        <PrimaryButton text={`Logged in as: ${currentSummoner.displayName}`} />
      ) : (
        <DangerButton text="Not logged in. Refresh" />
      )}
      <Lobbys />
    </>
  );
}
