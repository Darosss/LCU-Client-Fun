import React, { useEffect, useState } from "react";
import { useRunesContext } from "./runes-context";
import { Button } from "@/components";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";
import { RunePageData } from "@/shared";

export function RunePagesList() {
  const { currentPage, changeCurrentPage, runePages, emitSetCurrentRunePage } =
    useRunesContext();
  const { emits } = useSocketEventsContext();
  const [ownedRunePagesCount, setOwnedRunePagesCount] = useState(1);

  useEffect(() => {
    emits.getOwnedRunePageCount((error, data) => {
      if (error || !data)
        return toast.error(error || "Couldn't get owner rune pages count");

      setOwnedRunePagesCount(data.ownedPageCount);
    });
  }, [emits]);

  async function handleOnClickChangePage(page: RunePageData) {
    changeCurrentPage(null);

    emitSetCurrentRunePage(page);
  }

  async function handleOnClickCreateRunePage() {
    emits.createRunePage(
      {
        name: `New rune page ${runePages.length + 1}`,
        isEditable: true,
        primaryStyleId: currentPage?.primaryStyleId || 8100,
      },
      async (error, data) => {
        if (error || !data)
          return toast.error(error || "Couldn't create rune page");

        emitSetCurrentRunePage(data);
      }
    );
  }

  return (
    <div id="champion-select-runes-pages-list">
      {ownedRunePagesCount > runePages.length ? (
        <Button
          defaultButtonType="primary"
          onClick={handleOnClickCreateRunePage}
        >
          +
        </Button>
      ) : null}
      {runePages.map((page, idx) => (
        <Button key={idx} onClick={() => handleOnClickChangePage(page)}>
          {page.name}
        </Button>
      ))}
    </div>
  );
}
