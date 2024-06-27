"use client";

import React, { useEffect, useState } from "react";
import { secondsToHMS } from "@/helpers";
import { useSocketEventsContext } from "@/socket";
import { Button } from "@/components";
import { toast } from "react-toastify";

export function Matchmaking() {
  const [searchingMatchTime, setSearchingMatchTime] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const { events, emits } = useSocketEventsContext();

  useEffect(() => {
    events.matchmakingSearch.on((data) => {
      if (!data) return;
      setEstimatedTime(~~data.estimatedQueueTime);
      setSearchingMatchTime(data.timeInQueue);
    });

    return () => {
      events.matchmakingSearch.off();
    };
  }, [events]);

  function handleOnStopMatchmaking() {
    emits.stopMatchmaking((error, data) => {
      if (error) return toast.error(error);
    });
  }
  return (
    <div id="matchmaking-wrapper">
      <div> {`Match making ${secondsToHMS(searchingMatchTime)}`} </div>
      <div>{`Estimated time: ${secondsToHMS(estimatedTime)}`} </div>
      <Button onClick={handleOnStopMatchmaking}>Cancel Search</Button>
    </div>
  );
}
