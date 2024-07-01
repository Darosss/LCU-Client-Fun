import React, { useMemo } from "react";

import { useChampionSelectContext } from "../champion-select-context";
import { ChangeSummonerSpellsButtons } from "./change-summoner-spells-btn";
import { useHeadContext } from "@/components";
import { ChampSelectSummonerData } from "@/shared";
import styles from "./team-summoners-blocks.module.scss";

interface TeamSummonersBlocksProps {
  summoner: ChampSelectSummonerData;
}

//TODO: add show nicnames if visible fe. aram, flex, normal, normal draft etc. Exluding solo / duo ?
export function TeamSummonersBlocks({ summoner }: TeamSummonersBlocksProps) {
  const { champSelectSessionData, summonersData, summonerSpellsData } =
    useChampionSelectContext();
  const {
    currentSummonerState: [currentSummoner],
    championsData,
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
  }, [
    champSelectSessionData.myTeam,
    summoner.cellId,
    summoner.isOnPlayersTeam,
  ]);

  const currentSummonerData = useMemo(() => {
    return summonersData.get(summoner.cellId.toString());
  }, [summoner.cellId, summonersData]);

  const currentActionText = useMemo(() => {
    const currentAction = currentSummonerData?.activeActionType;
    let actionText = currentSummonerData?.isActingNow ? "Now " : "";

    currentAction ? (actionText += `${currentAction} `) : "";

    switch (currentAction) {
      case "ban":
        //Example for path "/lol-game-data/assets/v1/champion-icons/63.png"
        const banIntentImagePath =
          currentSummonerData?.banIntentSquarePortratPath;
        const banIntentChampId = banIntentImagePath
          ?.split("/")
          .at(-1)
          ?.split(".")
          .at(0);
        const championName = banIntentChampId
          ? championsData.find(
              (champData) => champData.id === Number(banIntentChampId)
            )?.name
          : "";
        actionText += championName || "";
        break;

      case "pick":
        actionText += currentSummonerData?.championName;
        break;
      default:
        break;
    }
    return actionText;
  }, [currentSummonerData, championsData]);
  return (
    <div
      className={`${styles.teamSummonerBlockWrapper} ${
        currentSummonerData?.isSelf ? styles.currentSummoner : "chuj ci  wr yj"
      }`}
    >
      <div className={styles.teamSummonerDetails}>
        <div className={styles.assignedPosition}>
          {summoner.assignedPosition || ""}
        </div>
        <div className={styles.displayName}>
          {`${
            summoner.isSelf
              ? currentSummoner?.displayName
              : `Summoner: ${summoner.cellId}`
          }`}
        </div>
      </div>
      <div className={styles.teamSummonerSpells}>
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
      <div className={styles.summonerActionWrapper}>
        {currentSummonerData?.areSummonerActionsComplete ? (
          <div>{currentSummonerData.championName}</div>
        ) : (
          <div>{currentActionText}</div>
        )}
      </div>
    </div>
  );
}
