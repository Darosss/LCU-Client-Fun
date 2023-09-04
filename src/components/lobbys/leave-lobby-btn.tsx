import React from "react";
import { useEventHandler } from "@nodegui/react-nodegui";
import { QPushButtonSignals } from "@nodegui/nodegui";
import { lcuClientHandlerObj } from "@lcu";
import { DangerButton } from "@components";

export function LeaveLobbyBtn() {
  const leaveLobbyBtnHandler = useEventHandler<QPushButtonSignals>(
    {
      clicked: () => {
        lcuClientHandlerObj
          .leaveLobby()
          .catch((err) =>
            console.log("Error occured while leaving lobby", err)
          );
      },
    },
    []
  );

  return <DangerButton on={leaveLobbyBtnHandler} text="Leave lobby" />;
}
