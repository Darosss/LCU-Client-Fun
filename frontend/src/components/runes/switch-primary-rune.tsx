import React from "react";
import { RuneImage } from "./rune-image";
import { useRunesContext } from "./runes-context";

export function SwitchPrimaryRune() {
  const {
    currentPageState: [currentPage, setCurrentPage],
    headRunesData,
  } = useRunesContext();

  if (!currentPage) return null;
  return (
    <div id="rune-style-slot">
      {headRunesData.map((headRune, idx) => {
        return (
          <RuneImage
            key={idx}
            choosenCondition={currentPage.primaryStyleId === headRune.id}
            imgSrc={headRune.iconPath.toLowerCase()}
            onClickImg={() =>
              setCurrentPage({ ...currentPage, primaryStyleId: headRune.id })
            }
          />
        );
      })}
    </div>
  );
}
