import { View } from "@nodegui/react-nodegui";
import { InfoText } from "@components";
import React, { useCallback, useContext, useEffect } from "react";
import { LCUContext } from "@lcu";
import { RunesContext } from "./runes-context";
import { RunePagesList } from "./rune-pages-list";
import { CurrentRunePageActions } from "./current-rune-page-actions";

export function ChampionSelectRunes() {
  const { headLCUHandler } = useContext(LCUContext);
  const { changeCurrentPage, runePages, changeRunePages } =
    useContext(RunesContext);

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
      <InfoText text="Runes" />
      <RunePagesList
        onChangePageCallback={() => setCurrentPageFetch()}
        onCreatePageCallback={() => {
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
