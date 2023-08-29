import { View, Text } from "@nodegui/react-nodegui";
import React, { useContext, useCallback } from "react";
import { TeamChampSelectSessionData } from "../../../LCU/types";
import { ChampionSelectContext } from "../champion-select-context";
import { ChangeSummonerSpellsButtons } from "./change-summoner-spells-btn";
import {
  findChampionById,
  findSummonerSpellById,
} from "../../../helpers/data-dragon-helpers";
import { LCUContext } from "../../../LCU/lcucontext";

interface TeamSummonersBlocksProps {
  summoner: TeamChampSelectSessionData;
}
//TODO: add show nicnames if visible fe. aram, flex, normal, normal draft etc. Exluding solo / duo ?
export function TeamSummonersBlocks({ summoner }: TeamSummonersBlocksProps) {
  const { champSelectSessionData, currentSummonerCellId } = useContext(
    ChampionSelectContext
  );
  const {
    lolDataDragon: { dataDragonChampions, dataDragonSpells },
    currentSummoner,
  } = useContext(LCUContext);

  const filterNotCompletedAction = useCallback(
    (summonerCellId: number) => {
      const action = champSelectSessionData.actions
        ?.reverse()
        .find(({ actorCellId }) => actorCellId === summonerCellId);

      const foundChamp = findChampionById(
        dataDragonChampions,
        action?.championId || 0
      );
      if (action?.isInProgress) {
        return action?.type === "pick"
          ? `Picking ${foundChamp}`
          : `Banning ${foundChamp}`;
      } else if (action?.completed) {
        return `Locked in! ${foundChamp}`;
      } else {
        return "Unknown";
      }
    },
    [champSelectSessionData]
  );

  return (
    <View id="team-summoners-blocks-wrapper">
      <View id="summoner-role-champion-wrapper">
        <Text>{summoner.assignedPosition || ""}</Text>
        <Text>
          {`${
            currentSummonerCellId === summoner.cellId
              ? currentSummoner?.displayName
              : ""
          }${findChampionById(
            dataDragonChampions,
            summoner.championPickIntent
          )}`}
        </Text>
      </View>
      <View id="summoner-spells-wrapper">
        {currentSummonerCellId === summoner.cellId ? (
          <ChangeSummonerSpellsButtons
            spell1Id={summoner.spell1Id}
            spell2Id={summoner.spell2Id}
          />
        ) : (
          <>
            <Text>
              {findSummonerSpellById(dataDragonSpells, summoner.spell1Id)}
            </Text>
            <Text>
              {findSummonerSpellById(dataDragonSpells, summoner.spell2Id)}
            </Text>
          </>
        )}
      </View>
      <View id="summoner-current-action">
        <Text>{filterNotCompletedAction(summoner.cellId)}</Text>
      </View>
    </View>
  );
}
