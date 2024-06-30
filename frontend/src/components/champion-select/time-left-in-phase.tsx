import React, { useState } from "react";
import { useChampionSelectContext } from "./champion-select-context";

interface TimeLeftInPhaseProps {
  onEndingTimeLeft: () => void;
}

export function TimeLeftInPhase({ onEndingTimeLeft }: TimeLeftInPhaseProps) {
  const { champSelectSessionTimer } = useChampionSelectContext();
  const [timeLeftInPhase, setTimeLeftInPhase] = useState(0);

  React.useEffect(() => {
    if (!champSelectSessionTimer) return;
    const secondsLeftInPhase = Math.trunc(
      champSelectSessionTimer.adjustedTimeLeftInPhase / 1000 - 1
    );
    setTimeLeftInPhase(secondsLeftInPhase);

    //TODO: add 5 <- time to auto pick into options
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
    <div id="time-left-text-wrapper">
      <div>{timeLeftInPhase}</div>
    </div>
  );
}
