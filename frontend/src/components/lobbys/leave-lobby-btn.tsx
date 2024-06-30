import React from "react";
import { Button, useHeadContext } from "@/components";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";

export function LeaveLobbyBtn() {
  const { emits } = useSocketEventsContext();
  const {
    lobbyDataState: [, setLobbyData],
  } = useHeadContext();
  const leaveLobbyBtnHandler = () => {
    emits.leaveLobby((error) => {
      if (error) return toast.error(error);

      toast.info("You left the lobby");
      setLobbyData(null);
    });
  };

  return (
    <Button defaultButtonType="danger" onClick={leaveLobbyBtnHandler}>
      Leave lobby
    </Button>
  );
}
