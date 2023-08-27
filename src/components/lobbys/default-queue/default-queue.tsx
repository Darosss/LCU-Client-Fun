import { Button, useEventHandler } from "@nodegui/react-nodegui";
import { playBtn } from "../styles";
import { QPushButtonSignals } from "@nodegui/nodegui";
import React from "react";
import { lcuClientHandlerObj } from "../../../LCU/LCUClientHandler";

export function DefaultQueue() {
  const searchMatchBtnHandler = useEventHandler<QPushButtonSignals>(
    {
      clicked: () => {
        lcuClientHandlerObj
          .searchMatch()
          .then(() => {})
          .catch((err) =>
            console.log("Error occured while trying to search the match", err)
          );
      },
    },
    []
  );
  return (
    <Button style={playBtn} on={searchMatchBtnHandler}>
      Search
    </Button>
  );
}
