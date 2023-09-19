import React, { useContext } from "react";
import { getDragonHeadRunesData } from "@helpers";
import { RuneImage } from "./rune-image";
import { RunesContext } from "./runes-context";
import { View } from "@nodegui/react-nodegui";

interface SwitchSecondaryRuneProps {
  primaryStyleRuneSubstyles: number[];
}

export function SwitchSecondaryRune({
  primaryStyleRuneSubstyles,
}: SwitchSecondaryRuneProps) {
  const { currentPage, changeCurrentPage } = useContext(RunesContext);

  if (!currentPage) return null;
  return (
    <View id="rune-style-slot">
      {primaryStyleRuneSubstyles.map((subStyle, idx) => {
        const foundHeadRune = getDragonHeadRunesData().find(
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
    </View>
  );
}
