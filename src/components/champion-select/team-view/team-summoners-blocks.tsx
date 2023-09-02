import React, { useContext, useMemo } from "react";
import { View, Text } from "@nodegui/react-nodegui";
import {
  ActionsChampSelectSessionData,
  TeamChampSelectSessionData,
  LCUContext,
} from "@lcu";
import { findChampionById, findSummonerSpellById } from "@helpers";

import { ChampionSelectContext } from "../champion-select-context";
import { ChangeSummonerSpellsButtons } from "./change-summoner-spells-btn";

interface TeamSummonersBlocksProps {
  summoner: TeamChampSelectSessionData;
}
//TODO: add show nicnames if visible fe. aram, flex, normal, normal draft etc. Exluding solo / duo ?
export function TeamSummonersBlocks({ summoner }: TeamSummonersBlocksProps) {
  const { champSelectSessionData } = useContext(ChampionSelectContext);
  const {
    lolDataDragon: { dataDragonChampions, dataDragonSpells },
    currentSummoner,
  } = useContext(LCUContext);

  const getInProgressAction = useMemo(() => {
    const inProgressAction = champSelectSessionData.actions?.find(
      ({ actorCellId, isInProgress }) => {
        return actorCellId === summoner.cellId && isInProgress;
      }
    );

    return inProgressAction;
  }, [summoner]);

  const getLastAction = useMemo(() => {
    const lastAction = champSelectSessionData.actions
      ?.reverse()
      .find(({ actorCellId }) => {
        return actorCellId === summoner.cellId;
      });

    return lastAction;
  }, [summoner]);

  const summonerAction = useMemo(() => {
    let gowno: ActionsChampSelectSessionData | null;
    if (getInProgressAction) {
      gowno = getInProgressAction || null;
    } else {
      gowno = getLastAction || null;
    }

    return gowno;
  }, [getInProgressAction, getLastAction]);

  const currentOrLastAction = useMemo(() => {
    const foundChamp =
      findChampionById(dataDragonChampions, summonerAction?.championId || 0)
        ?.name || "";

    if (!summonerAction) return "Unknown";
    else if (summonerAction.isInProgress) {
      return summonerAction.type === "pick"
        ? `Picking ${foundChamp}`
        : `Banning ${foundChamp}`;
    } else if (summonerAction.completed) {
      return summonerAction.type === "pick"
        ? `Locked in ${foundChamp}`
        : `Banned ${foundChamp}`;
    } else {
      return "Not yet picked";
    }
  }, [champSelectSessionData]);

  return (
    <View id="team-summoners-blocks-wrapper">
      <View id="summoner-role-champion-wrapper">
        <Text>{summoner.assignedPosition || ""}</Text>
        <Text>
          {`${
            champSelectSessionData.localPlayerCellId === summoner.cellId
              ? currentSummoner?.displayName
              : ""
          }${
            findChampionById(dataDragonChampions, summoner.championPickIntent)
              ?.name || ""
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
              {findSummonerSpellById(dataDragonSpells, summoner.spell1Id)}
            </Text>
            <Text>
              {findSummonerSpellById(dataDragonSpells, summoner.spell2Id)}
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
