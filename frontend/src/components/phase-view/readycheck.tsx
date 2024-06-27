"use client";

import React, { useState } from "react";
import { Button, useHeadContext } from "@/components";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";
type ReadyCheckState = "Auto Accepted" | "Accepted" | "Declined" | "None";

export function ReadyCheck() {
  const {
    options: { autoAccept },
  } = useHeadContext();

  const { emits } = useSocketEventsContext();
  const [readyCheckState, setReadyCheckState] =
    useState<ReadyCheckState>("None");

  const acceptMatchBtnHandler = (textInfo?: ReadyCheckState) => {
    emits.manageMatchReadyCheck("accept", (error, data) => {
      if (error || !data) {
        setReadyCheckState("None");
        return toast.error(error || "Couldn't accept the match");
      }
      setReadyCheckState(textInfo ? textInfo : "Accepted");
    });
  };

  const declineMatchBtnHandler = () => {
    emits.manageMatchReadyCheck("decline", (error, data) => {
      if (error || !data) {
        setReadyCheckState("None");
        return toast.error(error || "Couldn't decline the match");
      }
      setReadyCheckState("Declined");
    });
  };

  function ReadyCheckActions() {
    switch (readyCheckState) {
      case "Accepted":
        return "Accepted";

      case "Declined":
        return "Declined";
      case "Auto Accepted":
        return "Auto accepted";
      case "None":
        return (
          <>
            <Button onClick={acceptMatchBtnHandler}>Accept</Button>
            <Button onClick={declineMatchBtnHandler}>Decline</Button>
          </>
        );
    }
  }

  if (autoAccept) {
    acceptMatchBtnHandler("Auto Accepted");
  }
  return (
    <div>
      <ReadyCheckActions />
    </div>
  );
}
