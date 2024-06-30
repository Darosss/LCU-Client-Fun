import React from "react";
import { useSocketEventsContext } from "@/socket";
import { Button } from "@/components";
import { toast } from "react-toastify";
export function WaitingForStats() {
  const { emits } = useSocketEventsContext();
  return (
    <div id="waiting-for-stats-wrapper">
      <div> Waiting for stats...</div>
      <Button
        onClick={() => {
          emits.dismissStatsAfterMatch((error, data) => {
            if (error || !data)
              return toast.error(error || "Coulnd't skip stats.");
          });
        }}
      >
        Skip waiting
      </Button>
    </div>
  );
}
