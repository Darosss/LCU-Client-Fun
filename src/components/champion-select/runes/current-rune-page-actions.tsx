import React, { useCallback, useContext } from "react";
import { View } from "@nodegui/react-nodegui";
import {
  DangerButton,
  DangerText,
  InfoLineEdit,
  SuccessButton,
} from "@components";
import { RuneStyleSlots } from "./rune-style-slots";
import { RunesContext } from "./runes-context";
import { LCUContext } from "@lcu";

interface CurrentRunePageActionsProps {
  onSaveCallback: () => void;
  onDeleteCallback: () => void;
}

export function CurrentRunePageActions({
  onSaveCallback,
  onDeleteCallback,
}: CurrentRunePageActionsProps) {
  const { headLCUHandler } = useContext(LCUContext);
  const { currentPage, changeCurrentPage, runePages, changeRunePages } =
    useContext(RunesContext);

  async function handleOnClickSaveBtn() {
    if (!currentPage || !headLCUHandler) return;
    await headLCUHandler.editRunePageById(currentPage.id, currentPage);
    onSaveCallback();
  }

  async function handleOnClickDeleteBtn() {
    if (!currentPage || !headLCUHandler) return;
    await headLCUHandler.deleteRunePageById(currentPage.id);
    changeCurrentPage(null);
    onDeleteCallback();
  }

  return currentPage ? (
    <View id="champion-select-current-rune-page">
      <View id="champion-select-rune-page-actions">
        <InfoLineEdit
          text={currentPage.name}
          on={{
            textChanged: (e) => changeCurrentPage({ ...currentPage, name: e }),
          }}
        />
        {currentPage.isEditable ? (
          <SuccessButton
            text="Save"
            on={{
              clicked: async () => await handleOnClickSaveBtn(),
            }}
          />
        ) : null}

        {currentPage.isDeletable && runePages.length > 1 ? (
          <DangerButton
            text="Delete"
            on={{
              clicked: () => handleOnClickDeleteBtn(),
            }}
          />
        ) : null}
        {!currentPage.isValid ? (
          <DangerText text="Rune page is not valid" />
        ) : null}
      </View>
      <RuneStyleSlots />
    </View>
  ) : null;
}
