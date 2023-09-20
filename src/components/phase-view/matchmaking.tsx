import React, { useContext, useEffect, useState } from "react";
import { View } from "@nodegui/react-nodegui";
import { DangerButton, PrimaryText, SecondaryText } from "@components";
import { secondsToHMS } from "@helpers";
import { LCUContext } from "@lcu";

export function Matchmaking() {
  const { lobbyLCUHandler } = useContext(LCUContext);
  const [searchingMatchTime, setSearchingMatchTime] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);

  useEffect(() => {
    if (!lobbyLCUHandler) return;

    lobbyLCUHandler.wsOnMatchmakingSearch((err, data) => {
      if (err || !data) return;
      setEstimatedTime(~~data.estimatedQueueTime);
      setSearchingMatchTime(data.timeInQueue);
    });

    return () => {
      lobbyLCUHandler.unsubsribeOnMatchmakingSearch();
    };
  }, [lobbyLCUHandler]);
  return (
    <View id="matchmaking-wrapper">
      <PrimaryText text={`Match making ${secondsToHMS(searchingMatchTime)}`} />
      <SecondaryText text={`Estimated time: ${secondsToHMS(estimatedTime)}`} />
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
