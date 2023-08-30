import { Text } from "@nodegui/react-nodegui";
import React, { useContext, useState } from "react";
import { ChampionSelectContext } from "./champion-select-context";

export function TimeLeftInPhase() {
  const { champSelectSessionTimer } = useContext(ChampionSelectContext);
  const [timeLeftInPhase, setTimeLeftInPhase] = useState(0);

  React.useEffect(() => {
    if (!champSelectSessionTimer) return;
    const secondsLeftInPhase = Math.trunc(
      champSelectSessionTimer.adjustedTimeLeftInPhase / 1000 - 1
    );
    setTimeLeftInPhase(secondsLeftInPhase);

    const timer = setInterval(() => {
      setTimeLeftInPhase((prevTime) => --prevTime);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [champSelectSessionTimer]);

  return <Text id="time-left-text"> {timeLeftInPhase}</Text>;
}
