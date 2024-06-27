import React from "react";
import { useSocketEventsContext } from "@/socket";
import { Button, useHeadContext } from "@/components";
import { CreateCustomLobbyOpts } from "@/shared";
import { toast } from "react-toastify";

interface CustomModeLobbyProps {
  lobbyName: string;
  customLobbyOpts: CreateCustomLobbyOpts;
}

export function CustomModeLobby({
  lobbyName,
  customLobbyOpts,
}: CustomModeLobbyProps) {
  const { emits } = useSocketEventsContext();
  const {
    lobbyDataState: [, setLobbyData],
  } = useHeadContext();

  function handleOnCreateCustomLobby() {
    emits.createCustomLobby(customLobbyOpts, (error, data) => {
      if (error) return toast.error(error);

      setLobbyData(data!);
    });
  }

  return (
    <>
      <Button onClick={handleOnCreateCustomLobby}>{lobbyName}</Button>
    </>
  );
}
