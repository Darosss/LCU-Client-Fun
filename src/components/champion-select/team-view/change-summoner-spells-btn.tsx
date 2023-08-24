import { View, Button } from "@nodegui/react-nodegui";
import React, { useContext, useState } from "react";
import { lcuClientHandlerObj } from "../../../LCU/LCUClientHandler";
import { LCUContext } from "../../../LCU/lcucontext";
import { ChampionSelectContext } from "../champion-select-context";
import {
  currentSummonerSpellsBtnWrapper,
  summonerSpellBtnStyle,
  activeChangeSummonerSpellBtnStyle,
  changeSummonerSpellViewStyle,
  changeSummonerSpellBtnStyle,
} from "./styles";

interface ChangeSummonerSpellsButtonsProps {
  spell1Id: number;
  spell2Id: number;
}

type ShowSpellsChangeMenu = "spell1Id" | "spell2Id" | "none";

export function ChangeSummonerSpellsButtons({
  spell1Id,
  spell2Id,
}: ChangeSummonerSpellsButtonsProps) {
  const { currentLobbyConfig } = useContext(LCUContext);

  const { dataDragonSpells, findSummonerSpellById } = useContext(
    ChampionSelectContext
  );

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
      <View style={currentSummonerSpellsBtnWrapper}>
        <Button
          style={`${summonerSpellBtnStyle} ${
            showSpellsChangeMenu === "spell1Id"
              ? activeChangeSummonerSpellBtnStyle
              : ""
          }`}
          text={findSummonerSpellById(spell1Id)}
          on={{
            clicked: () => {
              toggleShowSpellsChangeMenu("spell1Id");
            },
          }}
        ></Button>
        <Button
          style={`${summonerSpellBtnStyle} ${
            showSpellsChangeMenu === "spell2Id"
              ? activeChangeSummonerSpellBtnStyle
              : ""
          }`}
          text={findSummonerSpellById(spell2Id)}
          on={{
            clicked: () => {
              toggleShowSpellsChangeMenu("spell2Id");
            },
          }}
        ></Button>
      </View>

      {showSpellsChangeMenu !== "none" ? (
        <View style={changeSummonerSpellViewStyle}>
          {dataDragonSpells
            .filter(
              ({ modes }) =>
                currentLobbyConfig &&
                modes.includes(currentLobbyConfig.gameMode)
            )
            .map((spell, idx) => (
              <Button
                key={idx}
                style={changeSummonerSpellBtnStyle}
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