import { Button } from "@nodegui/react-nodegui";
import { playBtn } from "../styles";
import React from "react";
import { lcuClientHandlerObj } from "../../../LCU/LCUClientHandler";

export function DefaultQueue() {
  function searchMatch() {
    lcuClientHandlerObj
      .searchMatch()
      .then(() => {})
      .catch((err) =>
        console.log("Error occured while trying to search the match", err)
      );
  }

  return (
    <Button
      style={playBtn}
      on={{
        clicked: () => searchMatch(),
      }}
    >
      Search
    </Button>
  );
}
