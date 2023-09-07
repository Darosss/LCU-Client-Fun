import React, { useContext } from "react";
import { CreateCustomLobbyOpts, LCUContext } from "@lcu";
import { SecondaryButton } from "@components";

interface CustomModeLobbyProps {
  lobbyName: string;
  customLobbyOpts: CreateCustomLobbyOpts;
}

export function CustomModeLobby({
  lobbyName,
  customLobbyOpts,
}: CustomModeLobbyProps) {
  const { lobbyLCUHandler: lobbyHandler } = useContext(LCUContext);
  return (
    <>
      <SecondaryButton
        text={lobbyName}
        on={{
          clicked: () => {
            lobbyHandler?.createCustomLobby(customLobbyOpts).catch((err) =>
              console.log(
                //FIXME: add proper console log
                "Error occured while trying to search the match",
                err
              )
            );
          },
        }}
      />
    </>
  );
}
