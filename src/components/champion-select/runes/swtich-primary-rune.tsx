import React, { useContext } from "react";
import { getDragonHeadRunesData } from "@helpers";
import { RuneImage } from "./rune-image";
import { RunesContext } from "./runes-context";
import { View } from "@nodegui/react-nodegui";

export function SwitchPrimaryRune() {
  const { currentPage, changeCurrentPage } = useContext(RunesContext);

  if (!currentPage) return null;
  return (
    <View id="rune-style-slot">
      {getDragonHeadRunesData().map((headRune, idx) => {
        return (
          <RuneImage
            key={idx}
            choosenCondition={currentPage.primaryStyleId === headRune.id}
            imgSrc={headRune.iconPath.toLowerCase()}
            onClickImg={() =>
              changeCurrentPage({ ...currentPage, primaryStyleId: headRune.id })
            }
          />
        );
      })}
    </View>
  );
}
