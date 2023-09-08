import React, { useContext, useMemo } from "react";
import { View, Text } from "@nodegui/react-nodegui";
import { TeamChampSelectSessionData, LCUContext } from "@lcu";
import {
  findChampionById,
  findSummonerSpellById,
  dragonChampionsData,
  dragonSpellsData,
} from "@helpers";

import { ChampionSelectContext } from "../champion-select-context";
import { ChangeSummonerSpellsButtons } from "./change-summoner-spells-btn";

interface TeamSummonersBlocksProps {
  summoner: TeamChampSelectSessionData;
}
//TODO: add show nicnames if visible fe. aram, flex, normal, normal draft etc. Exluding solo / duo ?
export function TeamSummonersBlocks({ summoner }: TeamSummonersBlocksProps) {
  const { champSelectSessionData } = useContext(ChampionSelectContext);
  const { currentSummoner } = useContext(LCUContext);

  const summonerAction = useMemo(() => {
    const lastAction = champSelectSessionData.actions.pickActions
      ?.reverse()
      .find(({ actorCellId }) => actorCellId === summoner.cellId);

    if (lastAction) return lastAction;
    else {
      const inProgressAction = champSelectSessionData.actions.pickActions?.find(
        ({ actorCellId, isInProgress }) =>
          actorCellId === summoner.cellId && isInProgress
      );
      return inProgressAction;
    }
  }, [summoner]);

  const currentOrLastAction = useMemo(() => {
    if (!summonerAction) return "";

    const foundChamp =
      findChampionById(dragonChampionsData, summonerAction.championId)?.name ||
      summonerAction.championId;
    if (summonerAction.isInProgress) {
      return `Picking ${foundChamp}`;
    } else if (summonerAction.completed) {
      return `Locked in ${foundChamp}`;
    } else if (
      champSelectSessionData.myTeam.find(
        ({ cellId }) => cellId === summonerAction.actorCellId
      )
    ) {
      const foundPlayerInTeam = champSelectSessionData.myTeam.find(
        ({ cellId }) => cellId === summonerAction.actorCellId
      )!;
      return `Showed ${
        findChampionById(
          dragonChampionsData,
          foundPlayerInTeam?.championPickIntent
        )?.name || foundPlayerInTeam.championPickIntent
      }`;
    } else {
      return "Not yet picked";
    }
  }, [champSelectSessionData]);

  return (
    <View id="team-summoners-blocks-wrapper">
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
      <View id="summoner-current-action">
        <Text>{currentOrLastAction}</Text>
      </View>
    </View>
  );
}
