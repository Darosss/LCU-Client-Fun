import React from "react";
import { useEventHandler, Button } from "@nodegui/react-nodegui";
import { QPushButtonSignals } from "@nodegui/nodegui";
import { lcuClientHandlerObj } from "@lcu";

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

  return (
    <Button id="leave-lobby-btn" on={leaveLobbyBtnHandler}>
      Leave lobby
    </Button>
  );
}
