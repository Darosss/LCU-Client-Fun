import React, { useContext, useEffect, useState } from "react";
import { View } from "@nodegui/react-nodegui";
import { SuccessButton, PrimaryButton } from "@components";
import { LCUContext, RunePageData } from "@lcu";
import { RunesContext } from "./runes-context";

interface RunePagesListProps {
  onChangePageCallback: () => void;
  onCreatePageCallback: () => void;
}

export function RunePagesList({
  onChangePageCallback,
  onCreatePageCallback,
}: RunePagesListProps) {
  const { headLCUHandler } = useContext(LCUContext);
  const { currentPage, changeCurrentPage, runePages } =
    useContext(RunesContext);
  const [ownedRunePagesCount, setOwnedRunePagesCount] = useState(1);

  useEffect(() => {
    if (!headLCUHandler) return;

    headLCUHandler.getOwnedRunePageCount().then((data) => {
      setOwnedRunePagesCount(data.ownedPageCount);
    });
  }, [headLCUHandler]);

  async function handleOnClickChangePage(page: RunePageData) {
    if (!headLCUHandler) return;
    changeCurrentPage(null);

    await headLCUHandler.setCurrentPage(page.id);
    onChangePageCallback();
  }

  async function handleOnClickCreateRunePage() {
    if (!headLCUHandler) return;
    const runeData = await headLCUHandler.createRunePage({
      name: `New rune page ${runePages.length + 1}`,
      isEditable: true,
      primaryStyleId: currentPage?.primaryStyleId || 8100,
    });

    await headLCUHandler.setCurrentPage(runeData.id);

    onCreatePageCallback();
  }

  return (
    <View id="champion-select-runes-pages-list">
      {ownedRunePagesCount > runePages.length ? (
        <SuccessButton
          text="+"
          on={{ clicked: async () => await handleOnClickCreateRunePage() }}
        />
      ) : null}
      {runePages.map((page, idx) => (
        <PrimaryButton
          key={idx}
          text={page.name}
          on={{ clicked: async () => await handleOnClickChangePage(page) }}
        />
      ))}
    </View>
  );
}
