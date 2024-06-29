import React, { useEffect, useState } from "react";
import { useSocketEventsContext } from "@/socket";
import { Button, useHeadContext } from "@/components";
import { toast } from "react-toastify";

const loggedUserInfoHelper = (displayName?: string) =>
  displayName ? `Logged in as: ${displayName}` : "Not logged in";

export function LoggedInUserDetails() {
  const {
    currentSummonerState: [currentSummoner, setCurrentSummoner],
    currentPhase,
  } = useHeadContext();
  const [loggedUserInfo, setLoggedUserInfo] = useState(
    loggedUserInfoHelper(currentSummoner?.displayName)
  );

  const [isTryingToConnect, setIsTryingToConnect] = useState(false);
  const { emits } = useSocketEventsContext();

  async function refreshLCUClientCredentials() {
    if (currentPhase !== "None" || isTryingToConnect) return;
    setLoggedUserInfo("Trying to connect");
    setIsTryingToConnect(true);
    emits.refreshAccount((error, data) => {
      if (error) return toast.error(error);

      setCurrentSummoner(data!);
      setIsTryingToConnect(false);
    });
  }

  useEffect(() => {
    if (currentSummoner) setIsTryingToConnect(false);
    setLoggedUserInfo(loggedUserInfoHelper(currentSummoner?.displayName));
  }, [currentSummoner]);

  return (
    <div id="logged-in-user-details-wrapper">
      <Button defaultButtonType="success">{loggedUserInfo}</Button>
      <Button
        defaultButtonType={currentSummoner ? "info" : "danger"}
        onClick={refreshLCUClientCredentials}
      >
        Refresh
      </Button>

      {/* TODO: add change avatar, titles, tokens etc. */}
    </div>
  );
}
