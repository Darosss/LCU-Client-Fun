import { useEventHandler, Button } from "@nodegui/react-nodegui";
import React from "react";
import { lcuClientHandlerObj } from "../../LCU/LCUClientHandler";
import { backgroundLinearGradient } from "../styles";
import { playBtn } from "./styles";
import { QPushButtonSignals } from "@nodegui/nodegui";

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
