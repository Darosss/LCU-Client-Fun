import React, { useContext, useMemo } from "react";
import { View } from "@nodegui/react-nodegui";
import { getDragonHeadRunesData } from "@helpers";
import { SwitchPrimaryRune } from "./swtich-primary-rune";
import { RunesContext } from "./runes-context";
import { SwitchSecondaryRune } from "./switch-secondary-rune";
import { SwitchSubRunes } from "./switch-sub-runes";
import { RuneStyle } from "@lcu";

export function RuneStyleSlots() {
  const { currentPage } = useContext(RunesContext);
  const [primaryStyleRune, secondaryStyleRune] = useMemo(() => {
    if (!currentPage) return [];
    const primaryStyleRune = getDragonHeadRunesData().find(
      (rune) => rune.id === currentPage.primaryStyleId
    );

    const secondaryStyleRune = getDragonHeadRunesData().find(
      (rune) => rune.id === currentPage.subStyleId
    );

    return [primaryStyleRune, secondaryStyleRune];
  }, [currentPage]);

  if (!currentPage || !primaryStyleRune) return null;

  return (
    <View id="rune-style-slots-wrapper">
      <View>
        <SwitchPrimaryRune />
        <SwitchSubRunes
          whichChange={RuneStyle.PRIMARY}
          headRuneSlot={primaryStyleRune.slots}
        />
      </View>

      <View>
        <SwitchSecondaryRune
          primaryStyleRuneSubstyles={primaryStyleRune.allowedSubStyles}
        />
        {secondaryStyleRune ? (
          <SwitchSubRunes
            whichChange={RuneStyle.SECONDARY}
            headRuneSlot={secondaryStyleRune.slots}
          />
        ) : null}
      </View>
    </View>
  );
}
