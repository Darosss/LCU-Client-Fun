import { Button } from "@nodegui/react-nodegui";
import React from "react";
import { lcuClientHandlerObj } from "../../../LCU/LCUClientHandler";
import { playBtn } from "../styles";

export function SearchMatchBtn() {
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
