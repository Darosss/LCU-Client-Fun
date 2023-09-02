import React, { useContext } from "react";
import { Button, View } from "@nodegui/react-nodegui";
import { lcuClientHandlerObj, LCUContext } from "@lcu";
import { playBtn } from "../styles";

export function SearchMatchBtn() {
  const { lobbyData } = useContext(LCUContext);

  function searchMatch() {
    lcuClientHandlerObj
      .searchMatch()
      .then(() => {})
      .catch((err) =>
        console.log("Error occured while trying to search the match", err)
      );
  }
  return (
    <View
      id="search-match-btn-wrapper"
      //FIXME: i don't know styles from stylesheet with display didnt work there
      // so i put inline style here
      style="display:'flex'; justify-content:'center'; align-items:'center';"
    >
      {lobbyData?.canStartActivity ? (
        <Button
          style={playBtn}
          on={{
            clicked: () => searchMatch(),
          }}
        >
          Search
        </Button>
      ) : null}
    </View>
  );
}
