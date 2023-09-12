import React, { useContext, useMemo } from "react";
import { View, Text } from "@nodegui/react-nodegui";
import { TeamChampSelectSessionData, LCUContext } from "@lcu";
import { findSummonerSpellById, dragonSpellsData } from "@helpers";

import { ChampionSelectContext } from "../champion-select-context";
import { ChangeSummonerSpellsButtons } from "./change-summoner-spells-btn";
import { PrimaryText } from "@components";

interface TeamSummonersBlocksProps {
  summoner: TeamChampSelectSessionData;
}
//TODO: add show nicnames if visible fe. aram, flex, normal, normal draft etc. Exluding solo / duo ?
export function TeamSummonersBlocks({ summoner }: TeamSummonersBlocksProps) {
  const { champSelectSessionData, summonersData } = useContext(
    ChampionSelectContext
  );
  const { currentSummoner } = useContext(LCUContext);

  const currentSummonerData = useMemo(() => {
    return summonersData.get(summoner.cellId.toString());
  }, [summonersData.get(summoner.cellId.toString())]);

  return (
    <View
      id="team-summoners-blocks-wrapper"
      style={`${
        currentSummonerData?.isSelf ? "border-top:15px solid white;" : ""
      }`}
    >
      <View id="summoner-role-champion-wrapper">
        <Text id="summoner-assigned-position">
          {summoner.assignedPosition || ""}
        </Text>
        <Text id="summoner-display-name">
          {`${
            champSelectSessionData.localPlayerCellId === summoner.cellId
              ? currentSummoner?.displayName
              : `Summoner: ${summoner.cellId}`
          }`}
        </Text>
      </View>
      <View id="summoner-spells-wrapper">
        {champSelectSessionData.localPlayerCellId === summoner.cellId ? (
          <ChangeSummonerSpellsButtons
            spell1Id={summoner.spell1Id}
            spell2Id={summoner.spell2Id}
          />
        ) : (
          <>
            <Text>
              {findSummonerSpellById(dragonSpellsData, summoner.spell1Id)}
            </Text>
            <Text>
              {findSummonerSpellById(dragonSpellsData, summoner.spell2Id)}
            </Text>
          </>
        )}
      </View>
      <View id="summoner-action">
        {currentSummonerData?.areSummonerActionsComplete ? (
          <PrimaryText text={currentSummonerData.championName} />
        ) : (
          <Text>
            {`${currentSummonerData?.isActingNow ? `Now ` : ""}${
              currentSummonerData?.activeActionType
            } ${currentSummonerData?.championName} `}
          </Text>
        )}
      </View>
    </View>
  );
}
