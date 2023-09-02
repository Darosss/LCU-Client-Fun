import React, { useContext, useState } from "react";
import { View, Button } from "@nodegui/react-nodegui";
import { lcuClientHandlerObj, LCUContext } from "@lcu";
import { ChampionSelectContext } from "../champion-select-context";
import { findSummonerSpellById } from "@helpers";

interface ChangeSummonerSpellsButtonsProps {
  spell1Id: number;
  spell2Id: number;
}

type ShowSpellsChangeMenu = "spell1Id" | "spell2Id" | "none";

export function ChangeSummonerSpellsButtons({
  spell1Id,
  spell2Id,
}: ChangeSummonerSpellsButtonsProps) {
  const {
    lobbyData,
    lolDataDragon: { dataDragonSpells },
  } = useContext(LCUContext);

  const {} = useContext(ChampionSelectContext);

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
        lcuClientHandlerObj.changeSummonerSpells({
          spell1Id: spellId,
          ...(spell2Id === spellId ? { spell2Id: spell1Id } : undefined),
        });
        break;
      case "spell2Id":
        lcuClientHandlerObj.changeSummonerSpells({
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
        <Button
          style={`${
            showSpellsChangeMenu === "spell1Id" ? "color:yellow;" : ""
          }`}
          text={findSummonerSpellById(dataDragonSpells, spell1Id)}
          on={{
            clicked: () => {
              toggleShowSpellsChangeMenu("spell1Id");
            },
          }}
        />
        <Button
          style={`${
            showSpellsChangeMenu === "spell2Id" ? "color:yellow;" : ""
          }`}
          text={findSummonerSpellById(dataDragonSpells, spell2Id)}
          on={{
            clicked: () => {
              toggleShowSpellsChangeMenu("spell2Id");
            },
          }}
        />
      </View>

      {showSpellsChangeMenu !== "none" ? (
        <View id="change-summoner-spell-view">
          {dataDragonSpells
            .filter(
              ({ modes }) =>
                lobbyData?.gameConfig &&
                modes.includes(lobbyData.gameConfig.gameMode)
            )
            .map((spell, idx) => (
              <Button
                key={idx}
                id="change-summoner-spell-btn"
                on={{
                  clicked: () => handleOnChangeSummonerSpellBtn(spell.id),
                }}
              >
                {spell.name}
              </Button>
            ))}
        </View>
      ) : null}
    </View>
  );
}
