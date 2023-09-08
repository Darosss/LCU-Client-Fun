import React, { useContext, useEffect, useState } from "react";
import { View } from "@nodegui/react-nodegui";
import { DangerButton, PrimaryText } from "@components";
import { secondsToHMS } from "@helpers";
import { LCUContext } from "@lcu";

export function Matchmaking() {
  const { lobbyLCUHandler } = useContext(LCUContext);
  const [searchingMatchTime, setSearchingMatchTime] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setSearchingMatchTime((prevTime) => ++prevTime);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View id="matchmaking-wrapper">
      <PrimaryText text={`Match making ${secondsToHMS(searchingMatchTime)}`} />
      <DangerButton
        text="Cancel search"
        on={{
          clicked: () =>
            lobbyLCUHandler
              ?.searchMatch(true)
              .catch((err) =>
                console.log(`Error occured while trying to cancel match`, err)
              ),
        }}
      />
    </View>
  );
}
