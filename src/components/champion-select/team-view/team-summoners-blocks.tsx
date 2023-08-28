import { View, Text } from "@nodegui/react-nodegui";
import React, { useContext, useCallback } from "react";
import { TeamChampSelectSessionData } from "../../../LCU/types";
import { ChampionSelectContext } from "../champion-select-context";
import { ChangeSummonerSpellsButtons } from "./change-summoner-spells-btn";
import {
  roleAndChampionStyle,
  summonerSpellsStyle,
  currentActionStyle,
} from "./styles";
import {
  findChampionById,
  findSummonerSpellById,
} from "../../../helpers/data-dragon-helpers";
import { LCUContext } from "../../../LCU/lcucontext";

interface TeamSummonersBlocksProps {
  summoner: TeamChampSelectSessionData;
  currentSummonerCellId?: number;
}

export function TeamSummonersBlocks({
  summoner,
  currentSummonerCellId,
}: TeamSummonersBlocksProps) {
  const { champSelectSessionData } = useContext(ChampionSelectContext);
  const {
    lolDataDragon: { dataDragonChampions, dataDragonSpells },
  } = useContext(LCUContext);

  const filterNotCompletedAction = useCallback(
    (summonerCellId: number) => {
      const action = champSelectSessionData.actions?.find(
        ({ actorCellId, completed }) =>
          actorCellId === summonerCellId && !completed
      );

      if (action?.type === "pick") return "Picking";
      else if (action?.type === "ban") return "Banning";
      else {
        return "Locked in!";
      }
    },
    [champSelectSessionData]
  );

  return (
    <View>
      <View style={roleAndChampionStyle}>
        <Text>{summoner.assignedPosition || ""}</Text>
        <Text>
          {findChampionById(dataDragonChampions, summoner.championId) ||
            findChampionById(dataDragonChampions, summoner.championPickIntent)}
        </Text>
      </View>
      <View style={summonerSpellsStyle}>
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
      <View style={currentActionStyle}>
        <Text>{filterNotCompletedAction(summoner.cellId)}</Text>
      </View>
    </View>
  );
}
