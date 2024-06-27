import React, { useMemo } from "react";

import { useChampionSelectContext } from "../champion-select-context";
import { ChangeSummonerSpellsButtons } from "./change-summoner-spells-btn";
import { useHeadContext } from "@/components";
import { ChampSelectSummonerData } from "@/shared";

interface TeamSummonersBlocksProps {
  summoner: ChampSelectSummonerData;
}

//TODO: add show nicnames if visible fe. aram, flex, normal, normal draft etc. Exluding solo / duo ?
export function TeamSummonersBlocks({ summoner }: TeamSummonersBlocksProps) {
  const { champSelectSessionData, summonersData, summonerSpellsData } =
    useChampionSelectContext();
  const {
    currentSummonerState: [currentSummoner],
  } = useHeadContext();

  const { spell1Id, spell2Id } = useMemo(() => {
    if (summoner.isOnPlayersTeam) {
      const teamSummoner = champSelectSessionData.myTeam.find(
        (x) => x.cellId === summoner.cellId
      );

      const spell1 = teamSummoner?.spell1Id;
      const spell2 = teamSummoner?.spell2Id;
      return { spell1Id: spell1 || -1, spell2Id: spell2 || -1 };
    }
    return { spell1Id: -1, spell2Id: -1 };
  }, [summoner]);

  const currentSummonerData = useMemo(() => {
    return summonersData.get(summoner.cellId.toString());
  }, [summonersData.get(summoner.cellId.toString())]);

  return (
    <div
      id="team-summoners-blocks-wrapper"
      style={
        //TODO: change to styles.class
        { border: currentSummonerData?.isSelf ? "1px solid white" : "" }
      }
    >
      <div id="summoner-role-champion-wrapper">
        <div id="summoner-assigned-position">
          {summoner.assignedPosition || ""}
        </div>
        <div id="summoner-display-name">
          {`${
            summoner.isSelf
              ? currentSummoner?.displayName
              : `Summoner: ${summoner.cellId}`
          }`}
        </div>
      </div>
      <div id="summoner-spells-wrapper">
        {summoner.isSelf ? (
          <ChangeSummonerSpellsButtons
            spell1Id={spell1Id}
            spell2Id={spell2Id}
          />
        ) : (
          <>
            <div>
              {summonerSpellsData.find((spell) => spell.id === spell1Id)?.name}
            </div>
            <div>
              {summonerSpellsData.find((spell) => spell.id === spell2Id)?.name}
            </div>
          </>
        )}
      </div>
      <div id="summoner-action">
        {currentSummonerData?.areSummonerActionsComplete ? (
          <div>{currentSummonerData.championName}</div>
        ) : (
          <div>
            {`${currentSummonerData?.isActingNow ? `Now ` : ""}${
              currentSummonerData?.activeActionType
            } ${currentSummonerData?.championName} `}
          </div>
        )}
      </div>
    </div>
  );
}
