import React, { useMemo } from "react";
import { SwitchPrimaryRune } from "./switch-primary-rune";
import { useRunesContext } from "./runes-context";
import { SwitchSecondaryRune } from "./switch-secondary-rune";
import { SwitchSubRunes } from "./switch-sub-runes";
import { RuneStyle } from "@/shared";
import styles from "./rune-style-slots.module.scss";

export function RuneStyleSlots() {
  const { currentPage, headRunesData } = useRunesContext();
  const [primaryStyleRune, secondaryStyleRune] = useMemo(() => {
    if (!currentPage) return [];
    const primaryStyleRune = headRunesData.find(
      (rune) => rune.id === currentPage.primaryStyleId
    );

    const secondaryStyleRune = headRunesData.find(
      (rune) => rune.id === currentPage.subStyleId
    );

    return [primaryStyleRune, secondaryStyleRune];
  }, [currentPage, headRunesData]);
  if (!currentPage || !primaryStyleRune) return null;

  return (
    <div className={styles.runeStyleSlotsWrapper}>
      <div className={styles.switchPrimaryRune}>
        <SwitchPrimaryRune />
        <SwitchSubRunes
          whichChange={RuneStyle.PRIMARY}
          headRuneSlot={primaryStyleRune.slots}
        />
      </div>

      <div className={styles.switchSecondaryRune}>
        <SwitchSecondaryRune
          primaryStyleRuneSubstyles={primaryStyleRune.allowedSubStyles}
        />
        {secondaryStyleRune ? (
          <SwitchSubRunes
            whichChange={RuneStyle.SECONDARY}
            headRuneSlot={secondaryStyleRune.slots}
          />
        ) : null}
      </div>
    </div>
  );
}
