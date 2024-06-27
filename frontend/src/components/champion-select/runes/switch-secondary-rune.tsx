import React from "react";
import { RuneImage } from "./rune-image";
import { useRunesContext } from "./runes-context";
interface SwitchSecondaryRuneProps {
  primaryStyleRuneSubstyles: number[];
}

export function SwitchSecondaryRune({
  primaryStyleRuneSubstyles,
}: SwitchSecondaryRuneProps) {
  const { currentPage, changeCurrentPage, headRunesData } = useRunesContext();

  if (!currentPage) return null;
  return (
    <div id="rune-style-slot">
      {primaryStyleRuneSubstyles.map((subStyle, idx) => {
        const foundHeadRune = headRunesData.find(
          (headRune) => headRune.id === subStyle
        );
        if (!foundHeadRune) return;
        return (
          <RuneImage
            key={idx}
            choosenCondition={currentPage.subStyleId === foundHeadRune.id}
            imgSrc={foundHeadRune.iconPath.toLowerCase()}
            onClickImg={() =>
              changeCurrentPage({
                ...currentPage,
                subStyleId: foundHeadRune.id,
              })
            }
          />
        );
      })}
    </div>
  );
}
