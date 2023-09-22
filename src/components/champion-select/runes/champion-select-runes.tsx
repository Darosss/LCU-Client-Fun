import { View } from "@nodegui/react-nodegui";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { LCUContext } from "@lcu";
import { RunesContext } from "./runes-context";
import { RunePagesList } from "./rune-pages-list";
import { CurrentRunePageActions } from "./current-rune-page-actions";
import { RecommenedRunesForChampion } from "./recommend-runes-for-champion";

export function ChampionSelectRunes() {
  const { headLCUHandler } = useContext(LCUContext);
  const { changeCurrentPage, runePages, changeRunePages } =
    useContext(RunesContext);

  const [showRecommendedRunes, setShowRecommendedRunes] = useState(false);

  useEffect(() => {
    if (!headLCUHandler) return;

    setRunePagesFetch();
  }, [headLCUHandler]);

  useEffect(() => {
    changeCurrentPage(null);
    if (runePages.length > 0) setCurrentPageFetch();
  }, [runePages]);

  const setRunePagesFetch = useCallback(() => {
    if (!headLCUHandler) return;
    headLCUHandler
      .getRunePages()
      .then((runePageData) => changeRunePages(runePageData));
  }, [headLCUHandler]);

  const setCurrentPageFetch = useCallback(() => {
    if (!headLCUHandler || runePages.length < 1) return;
    headLCUHandler.getCurrentPage().then((page) => {
      changeCurrentPage(page);
    });
  }, [headLCUHandler, runePages]);

  return (
    <View id="champion-select-runes-wrapper">
      <RunePagesList
        onChangePageCallback={() => setCurrentPageFetch()}
        onCreatePageCallback={() => setRunePagesFetch()}
      />

      <RecommenedRunesForChampion
        show={showRecommendedRunes}
        onClickRecommendedRunes={() =>
          setShowRecommendedRunes(!showRecommendedRunes)
        }
        onChangeRecommendedRunePage={() => {
          setShowRecommendedRunes(false);
          setRunePagesFetch();
        }}
      />

      <CurrentRunePageActions
        onDeleteCallback={() => {
          setRunePagesFetch();
        }}
        onSaveCallback={() => {
          setRunePagesFetch();
        }}
      />
    </View>
  );
}
