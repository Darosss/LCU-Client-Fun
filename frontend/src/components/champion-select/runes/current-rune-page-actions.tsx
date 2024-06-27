import React from "react";
import { RuneStyleSlots } from "./rune-style-slots";
import { useRunesContext } from "./runes-context";
import { Button } from "@/components";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";

export function CurrentRunePageActions() {
  const { emits } = useSocketEventsContext();
  const {
    currentPage,
    changeCurrentPage,
    runePages,
    changeRunePages,
    fetchCurrentPageAndSet,
  } = useRunesContext();

  async function handleOnClickSaveBtn() {
    if (!currentPage) return;
    emits.editRunePageById(
      { pageId: currentPage.id, updateData: currentPage },
      (error, data) => {
        if (error || !data)
          return toast.error(error || "Couldn't edit rune page");
        fetchCurrentPageAndSet();
      }
    );
  }

  async function handleOnClickDeleteBtn() {
    if (!currentPage) return;
    emits.deleteRunePageById(currentPage.id, (error, data) => {
      if (error || !data)
        return toast.error(error || "Couldn't delete rune page");
      fetchCurrentPageAndSet();
    });
  }

  return currentPage ? (
    <div id="champion-select-current-rune-page">
      <div id="champion-select-rune-page-actions">
        <input
          value={currentPage.name}
          onChange={(e) =>
            changeCurrentPage({ ...currentPage, name: e.target.value })
          }
        />
        {currentPage.isEditable ? (
          <Button onClick={() => handleOnClickSaveBtn()}>Save</Button>
        ) : null}

        {currentPage.isDeletable && runePages.length > 1 ? (
          <Button onClick={() => handleOnClickDeleteBtn()}>Delete</Button>
        ) : null}
        {!currentPage.isValid ? <div>Rune page is not valid</div> : null}
      </div>
      <RuneStyleSlots />
    </div>
  ) : null;
}
