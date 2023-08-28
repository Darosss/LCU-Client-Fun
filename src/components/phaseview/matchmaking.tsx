import { Text, View } from "@nodegui/react-nodegui";
import React, { useEffect, useState } from "react";
import { secondsToHMS } from "../../helpers/time-helpers";

export function Matchmaking() {
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
      <Text>Match making {secondsToHMS(searchingMatchTime)} </Text>
    </View>
  );
}
