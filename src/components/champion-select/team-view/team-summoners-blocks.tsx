import React, { useContext, useMemo } from "react";
import { View, Text, Window } from "@nodegui/react-nodegui";
import { LCUContext, ChampSelectSummonerData } from "@lcu";
import { findSummonerSpellById, dragonSpellsData } from "@helpers";

import { ChampionSelectContext } from "../champion-select-context";
import { ChangeSummonerSpellsButtons } from "./change-summoner-spells-btn";
import { PrimaryButton, PrimaryText } from "@components";

interface TeamSummonersBlocksProps {
  summoner: ChampSelectSummonerData;
}

//TODO: add show nicnames if visible fe. aram, flex, normal, normal draft etc. Exluding solo / duo ?
export function TeamSummonersBlocks({ summoner }: TeamSummonersBlocksProps) {
  const { champSelectSessionData, summonersData } = useContext(
    ChampionSelectContext
  );
  const { currentSummoner } = useContext(LCUContext);

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
            summoner.isSelf
              ? currentSummoner?.displayName
              : `Summoner: ${summoner.cellId}`
          }`}
        </Text>
      </View>
      <View id="summoner-spells-wrapper">
        {summoner.isSelf ? (
          <ChangeSummonerSpellsButtons
            spell1Id={spell1Id}
            spell2Id={spell2Id}
          />
        ) : (
          <>
            <Text>{findSummonerSpellById(dragonSpellsData, spell1Id)}</Text>
            <Text>{findSummonerSpellById(dragonSpellsData, spell2Id)}</Text>
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
