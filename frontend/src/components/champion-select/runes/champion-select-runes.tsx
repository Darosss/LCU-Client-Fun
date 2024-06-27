import React, { useState } from "react";
import { RunePagesList } from "./rune-pages-list";
import { CurrentRunePageActions } from "./current-rune-page-actions";
import { RecommenedRunesForChampion } from "./recommend-runes-for-champion";

export function ChampionSelectRunes() {
  const [showRecommendedRunes, setShowRecommendedRunes] = useState(false);

  return (
    <div id="champion-select-runes-wrapper">
      <RunePagesList />

      <RecommenedRunesForChampion
        show={showRecommendedRunes}
        onClickRecommendedRunes={() =>
          setShowRecommendedRunes(!showRecommendedRunes)
        }
        onChangeRecommendedRunePage={() => {
          setShowRecommendedRunes(false);
        }}
      />

      <CurrentRunePageActions />
    </div>
  );
}
