import React, { useCallback, useContext } from "react";
import { getDragonRunesData } from "@helpers";
import {
  HeadRuneSlot,
  HeadRuneSlotType,
  MouseButton,
  RunePageData,
  RuneStyle,
  RunesData,
} from "@lcu";
import { View } from "@nodegui/react-nodegui";
import { RunesContext } from "./runes-context";
import { RuneImage } from "./rune-image";

interface SwitchSubRunesProps {
  headRuneSlot: HeadRuneSlot[];
  whichChange: RuneStyle;
}

export function SwitchSubRunes({
  headRuneSlot,
  whichChange,
}: SwitchSubRunesProps) {
  const { currentPage } = useContext(RunesContext);

  if (!currentPage) return null;
  return (
    <>
      {headRuneSlot
        .filter((slot) => {
          //If secondary we return only sub runes without keystone or stat mod
          if (whichChange === RuneStyle.SECONDARY) {
            return (
              slot.type !== HeadRuneSlotType.K_KEY_STONE &&
              slot.type !== HeadRuneSlotType.K_STAT_MOD
            );
          }
          return true;
        })
        .map((slot, idx) => {
          return (
            <View key={idx} id="rune-style-slot">
              {slot.perks.map((perk, perkIdx) => {
                const foundRune = getDragonRunesData().find(
                  (rune) => rune.id === perk
                );
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
            </View>
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
  const { currentPage, changeCurrentPage } = useContext(RunesContext);
  if (!currentPage) return null;

  let currentUiPerkIdx = idx;
  if (idx >= 4) currentUiPerkIdx += 2;
  return (
    <RuneImage
      choosenCondition={
        currentPage.uiPerks[currentUiPerkIdx].id === foundRune.id
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
        changeCurrentPage({
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
  const { currentPage, changeCurrentPage } = useContext(RunesContext);

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
      changeCurrentPage({
        ...currentPage,
        selectedPerkIds: modifiedSelectedPerkIds,
        uiPerks: modifiedUiPerk,
      });
    },
    [currentPage]
  );

  if (!currentPage) return null;

  return (
    <RuneImage
      choosenCondition={
        currentPage.uiPerks[4].id === foundRune.id ||
        currentPage.uiPerks[5].id === foundRune.id
      }
      imgSrc={foundRune.iconPath.toLowerCase()}
      onClickImg={(mouseBtn) => {
        switch (mouseBtn) {
          case MouseButton.LEFT:
            handleOnMouseBtnClick(4);
            break;
          case MouseButton.RIGHT:
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
