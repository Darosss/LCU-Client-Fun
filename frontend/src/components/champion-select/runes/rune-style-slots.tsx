import React, { useMemo } from "react";
import { SwitchPrimaryRune } from "./switch-primary-rune";
import { useRunesContext } from "./runes-context";
import { SwitchSecondaryRune } from "./switch-secondary-rune";
import { SwitchSubRunes } from "./switch-sub-runes";
import { RuneStyle } from "@/shared";

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
    <div id="rune-style-slots-wrapper">
      <div>
        <SwitchPrimaryRune />
        <SwitchSubRunes
          whichChange={RuneStyle.PRIMARY}
          headRuneSlot={primaryStyleRune.slots}
        />
      </div>

      <div>
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
