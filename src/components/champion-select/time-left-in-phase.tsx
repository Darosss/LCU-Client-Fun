import React, { useContext, useState } from "react";
import { View } from "@nodegui/react-nodegui";
import { ChampionSelectContext } from "./champion-select-context";
import { PrimaryText } from "@components";

interface TimeLeftInPhaseProps {
  onEndingTimeLeft: () => void;
}

export function TimeLeftInPhase({ onEndingTimeLeft }: TimeLeftInPhaseProps) {
  const { champSelectSessionTimer } = useContext(ChampionSelectContext);
  const [timeLeftInPhase, setTimeLeftInPhase] = useState(0);

  React.useEffect(() => {
    if (!champSelectSessionTimer) return;
    const secondsLeftInPhase = Math.trunc(
      champSelectSessionTimer.adjustedTimeLeftInPhase / 1000 - 1
    );
    setTimeLeftInPhase(secondsLeftInPhase);

    const timer = setInterval(() => {
      setTimeLeftInPhase((prevTime) => {
        if (prevTime === 5) onEndingTimeLeft();
        return --prevTime;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [champSelectSessionTimer]);

  return (
    <View id="time-left-text-wrapper">
      <PrimaryText text={`${timeLeftInPhase}`} />
    </View>
  );
}
