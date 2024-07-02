import React, { useCallback } from "react";

import { RuneImage } from "./rune-image";
import { useRunesContext } from "./runes-context";
import {
  HeadRuneSlot,
  MouseButton,
  RunePageData,
  RuneSlotType,
  RuneStyle,
  RunesData,
} from "@/shared";

interface SwitchSubRunesProps {
  headRuneSlot: HeadRuneSlot[];
  whichChange: RuneStyle;
}

export function SwitchSubRunes({
  headRuneSlot,
  whichChange,
}: SwitchSubRunesProps) {
  const {
    currentPageState: [currentPage],
    runesData,
  } = useRunesContext();

  if (!currentPage) return null;
  return (
    <>
      {headRuneSlot
        .filter((slot) => {
          //If secondary we return only sub runes without keystone or stat mod
          if (whichChange === RuneStyle.SECONDARY) {
            return (
              slot.type !== RuneSlotType.K_KEY_STONE &&
              slot.type !== RuneSlotType.K_STAT_MOD
            );
          }
          return true;
        })
        .map((slot, idx) => {
          return (
            <div key={idx} id="rune-style-slot">
              {slot.perks.map((perk, perkIdx) => {
                const foundRune = runesData.find((rune) => rune.id === perk);
                if (!foundRune) return;
                return whichChange === RuneStyle.PRIMARY ? (
                  <ChangePrimarySubRune
                    key={perkIdx}
                    foundRune={foundRune}
                    idx={idx}
                  />
                ) : whichChange === RuneStyle.SECONDARY ? (
                  <ChangeSecondarySubRune key={perkIdx} foundRune={foundRune} />
                ) : null;
              })}
            </div>
          );
        })}
    </>
  );
}

interface ChangePrimarySubRuneProps {
  foundRune: RunesData;
  idx: number;
}

function ChangePrimarySubRune({ foundRune, idx }: ChangePrimarySubRuneProps) {
  const {
    currentPageState: [currentPage, setCurrentPage],
  } = useRunesContext();

  if (!currentPage) return null;

  let currentUiPerkIdx = idx;
  if (idx >= 4) currentUiPerkIdx += 2;
  return (
    <RuneImage
      choosenCondition={
        currentPage.uiPerks[currentUiPerkIdx]?.id === foundRune.id
      }
      imgSrc={foundRune.iconPath.toLowerCase()}
      onClickImg={() => {
        const modifiedSelectedPerkIds = currentPage.selectedPerkIds;
        const modifiedUiPerk = currentPage.uiPerks;

        modifiedUiPerk[currentUiPerkIdx] = {
          id: foundRune.id,
          name: foundRune.name,
          slotType: foundRune.slotType,
          styleId: foundRune.styleId,
        };
        modifiedSelectedPerkIds[currentUiPerkIdx] = foundRune.id;
        setCurrentPage({
          ...currentPage,
          selectedPerkIds: modifiedSelectedPerkIds,
          uiPerks: modifiedUiPerk,
        });
      }}
    />
  );
}

interface ChangeSecondarySubRune {
  foundRune: RunesData;
}

function ChangeSecondarySubRune({ foundRune }: ChangeSecondarySubRune) {
  const {
    currentPageState: [currentPage, setCurrentPage],
  } = useRunesContext();

  const handleOnMouseBtnClick = useCallback(
    (idxToModify: number) => {
      if (!currentPage) return;
      const modifiedSelectedPerkIds = currentPage.selectedPerkIds;
      const modifiedUiPerk = modifyUiPerkHelper(
        currentPage.uiPerks,
        idxToModify,
        foundRune
      );
      modifiedSelectedPerkIds[idxToModify] = foundRune.id;
      setCurrentPage({
        ...currentPage,
        selectedPerkIds: modifiedSelectedPerkIds,
        uiPerks: modifiedUiPerk,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage, foundRune]
  );

  if (!currentPage) return null;
  return (
    <RuneImage
      choosenCondition={
        currentPage.uiPerks[4]?.id === foundRune.id ||
        currentPage.uiPerks[5]?.id === foundRune.id
      }
      imgSrc={foundRune.iconPath.toLowerCase()}
      onClickImg={(mouseBtn) => {
        switch (mouseBtn) {
          case MouseButton.LEFT:
            handleOnMouseBtnClick(4);
            break;
          case MouseButton.SCROLL:
            handleOnMouseBtnClick(5);

            break;
        }
      }}
    />
  );
}

function modifyUiPerkHelper(
  uiPerks: RunePageData["uiPerks"],
  idxToModify: number,
  runeData: RunesData
): RunePageData["uiPerks"] {
  const modifiedUiPerks = uiPerks;
  modifiedUiPerks[idxToModify] = {
    id: runeData.id,
    name: runeData.name,
    slotType: runeData.slotType,
    styleId: runeData.styleId,
  };

  return modifiedUiPerks;
}
