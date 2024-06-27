import React from "react";
import { useSocketEventsContext } from "@/socket";
import { Button, useHeadContext } from "@/components";
import { toast } from "react-toastify";

export function LoggedInUserDetails() {
  const {
    currentSummonerState: [currentSummoner, setCurrentSummoner],
    currentPhase,
  } = useHeadContext();

  const { emits } = useSocketEventsContext();

  async function refreshLCUClientCredentials() {
    if (currentPhase !== "None") return;

    emits.refreshAccount((error, data) => {
      if (error) return toast.error(error);

      setCurrentSummoner(data!);
    });
  }

  return (
    <div id="logged-in-user-details-wrapper">
      {currentSummoner ? (
        <>
          <Button defaultButtonType="success">{`Logged in as: ${currentSummoner.displayName}`}</Button>
          <Button
            defaultButtonType="info"
            onClick={refreshLCUClientCredentials}
          >
            Refresh
          </Button>
        </>
      ) : (
        <Button
          defaultButtonType="danger"
          onClick={refreshLCUClientCredentials}
        >
          Not logged in. Refresh
        </Button>
      )}
      {/* TODO: add change avatar, titles, tokens etc. */}
    </div>
  );
}
