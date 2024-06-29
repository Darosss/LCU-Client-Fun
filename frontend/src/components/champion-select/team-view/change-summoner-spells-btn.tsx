import React, { useState } from "react";

import { Button, useHeadContext } from "@/components";
import { useChampionSelectContext } from "../champion-select-context";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";

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
    lobbyDataState: [lobbyData],
  } = useHeadContext();
  const { summonerSpellsData } = useChampionSelectContext();
  const { emits } = useSocketEventsContext();

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
        emits.changeSummonerSpells(
          {
            spell1Id: spellId,
            ...(spell2Id === spellId ? { spell2Id: spell1Id } : undefined),
          },
          (error, data) => {
            if (error || !data)
              return toast.error(error || "Couldn't change summoner spells");
          }
        );

        break;
      case "spell2Id":
        emits.changeSummonerSpells(
          {
            spell2Id: spellId,
            ...(spell1Id === spellId ? { spell1Id: spell2Id } : undefined),
          },
          (error, data) => {
            if (error || !data)
              return toast.error(error || "Couldn't change summoner spells");
          }
        );
        break;
    }

    setShowSpellsChangeMenu("none");
  }

  return (
    <div>
      <div id="current-summoner-spells-btn-wrapper">
        <Button
          defaultButtonType={
            showSpellsChangeMenu === "spell1Id" ? "success" : "primary"
          }
          onClick={() => toggleShowSpellsChangeMenu("spell1Id")}
        >
          {summonerSpellsData.find((data) => data.id === spell1Id)?.name}
        </Button>
        <Button
          defaultButtonType={
            showSpellsChangeMenu === "spell2Id" ? "success" : "primary"
          }
          onClick={() => toggleShowSpellsChangeMenu("spell2Id")}
        >
          {summonerSpellsData.find((data) => data.id === spell2Id)?.name}
        </Button>
      </div>

      {showSpellsChangeMenu !== "none" ? (
        <div id="change-summoner-spell-view">
          Possible spells?
          {summonerSpellsData
            .filter(
              ({ modes }) =>
                lobbyData?.gameConfig &&
                modes.includes(lobbyData.gameConfig.gameMode)
            )
            .map((spell, idx) => (
              <Button
                key={idx}
                defaultButtonType={
                  spell.id === spell1Id || spell.id === spell2Id
                    ? "success"
                    : "primary"
                }
                onClick={() => handleOnChangeSummonerSpellBtn(spell.id)}
              >
                {spell.name}
              </Button>
            ))}
        </div>
      ) : null}
    </div>
  );
}
