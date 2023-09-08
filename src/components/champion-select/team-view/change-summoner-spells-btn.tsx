import React, { useContext, useState } from "react";
import { View } from "@nodegui/react-nodegui";
import { LCUContext } from "@lcu";
import { ChampionSelectContext } from "../champion-select-context";
import { findSummonerSpellById, dragonSpellsData } from "@helpers";
import { PrimaryButton, SecondaryButton, SuccessButton } from "@components";

interface ChangeSummonerSpellsButtonsProps {
  spell1Id: number;
  spell2Id: number;
}

type ShowSpellsChangeMenu = "spell1Id" | "spell2Id" | "none";

export function ChangeSummonerSpellsButtons({
  spell1Id,
  spell2Id,
}: ChangeSummonerSpellsButtonsProps) {
  const { lobbyData } = useContext(LCUContext);

  const { champSelectLCUHandler } = useContext(ChampionSelectContext);

  const [showSpellsChangeMenu, setShowSpellsChangeMenu] =
    useState<ShowSpellsChangeMenu>("none");

  function toggleShowSpellsChangeMenu(showMenu: ShowSpellsChangeMenu) {
    switch (showMenu) {
      case "spell1Id":
        if (showSpellsChangeMenu === "spell1Id")
          return setShowSpellsChangeMenu("none");
        return setShowSpellsChangeMenu("spell1Id");

      case "spell2Id":
        if (showSpellsChangeMenu === "spell2Id")
          return setShowSpellsChangeMenu("none");
        return setShowSpellsChangeMenu("spell2Id");
    }
  }

  function handleOnChangeSummonerSpellBtn(spellId: number) {
    switch (showSpellsChangeMenu) {
      case "spell1Id":
        champSelectLCUHandler?.changeSummonerSpells({
          spell1Id: spellId,
          ...(spell2Id === spellId ? { spell2Id: spell1Id } : undefined),
        });
        break;
      case "spell2Id":
        champSelectLCUHandler?.changeSummonerSpells({
          spell2Id: spellId,
          ...(spell1Id === spellId ? { spell1Id: spell2Id } : undefined),
        });
        break;
    }

    setShowSpellsChangeMenu("none");
  }

  return (
    <View>
      <View id="current-summoner-spells-btn-wrapper">
        {showSpellsChangeMenu === "spell1Id" ? (
          <SuccessButton
            text={findSummonerSpellById(dragonSpellsData, spell1Id)}
            on={{
              clicked: () => toggleShowSpellsChangeMenu("spell1Id"),
            }}
          />
        ) : (
          <PrimaryButton
            text={findSummonerSpellById(dragonSpellsData, spell1Id)}
            on={{
              clicked: () => toggleShowSpellsChangeMenu("spell1Id"),
            }}
          />
        )}
        {showSpellsChangeMenu === "spell2Id" ? (
          <SuccessButton
            text={findSummonerSpellById(dragonSpellsData, spell2Id)}
            on={{
              clicked: () => toggleShowSpellsChangeMenu("spell2Id"),
            }}
          />
        ) : (
          <PrimaryButton
            text={findSummonerSpellById(dragonSpellsData, spell2Id)}
            on={{
              clicked: () => toggleShowSpellsChangeMenu("spell2Id"),
            }}
          />
        )}
      </View>

      {showSpellsChangeMenu !== "none" ? (
        <View id="change-summoner-spell-view">
          {dragonSpellsData
            .filter(
              ({ modes }) =>
                lobbyData?.gameConfig &&
                modes.includes(lobbyData.gameConfig.gameMode)
            )
            .map((spell, idx) =>
              spell.id === spell1Id || spell.id === spell2Id ? (
                <SuccessButton
                  key={idx}
                  on={{
                    clicked: () => handleOnChangeSummonerSpellBtn(spell.id),
                  }}
                  text={spell.name}
                />
              ) : (
                <SecondaryButton
                  key={idx}
                  on={{
                    clicked: () => handleOnChangeSummonerSpellBtn(spell.id),
                  }}
                  text={spell.name}
                />
              )
            )}
        </View>
      ) : null}
    </View>
  );
}
