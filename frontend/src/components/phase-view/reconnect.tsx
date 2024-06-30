import React from "react";
import { useSocketEventsContext } from "@/socket";
import { Button } from "@/components";
import { toast } from "react-toastify";

export function Reconnect() {
  const { emits } = useSocketEventsContext();
  return (
    <div id="reconnect-wrapper">
      <div> Summoner in game</div>
      <Button
        onClick={() => {
          emits.reconnectToCurrentMatch((error, data) => {
            if (error || !data)
              return toast.error(error || "Couldn't reconnect");
          });
        }}
      >
        Reconnect
      </Button>
    </div>
  );
}
