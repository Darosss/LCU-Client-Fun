import React, { useContext } from "react";
import { useEventHandler } from "@nodegui/react-nodegui";
import { QPushButtonSignals } from "@nodegui/nodegui";
import { LCUContext } from "@lcu";
import { DangerButton } from "@components";

export function LeaveLobbyBtn() {
  const { lobbyLCUHandler } = useContext(LCUContext);
  const leaveLobbyBtnHandler = useEventHandler<QPushButtonSignals>(
    {
      clicked: () => {
        lobbyLCUHandler
          ?.leaveLobby()
          .catch((err) =>
            console.log("Error occured while leaving lobby", err)
          );
      },
    },
    []
  );

  return <DangerButton on={leaveLobbyBtnHandler} text="Leave lobby" />;
}
