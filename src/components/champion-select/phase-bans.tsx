import React, { useContext } from "react";
import { View } from "@nodegui/react-nodegui";
import { ChampionSelectContext } from "./champion-select-context";
import { findChampionById } from "@helpers";
import { LCUContext } from "@lcu";
import { DangerText, PrimaryText } from "@components";

export function PhaseBans() {
  const {
    lolDataDragon: { dataDragonChampions },
  } = useContext(LCUContext);

  function listOfBans(isAlly = false) {
    const onlyBanActions = champSelectSessionData.actions.banActions.filter(
      (action) => (isAlly ? action.isAllyAction : !action.isAllyAction)
    );

    return onlyBanActions.map((ban, idx) => {
      const bannedChamp =
        findChampionById(dataDragonChampions, ban.championId)?.name || "no ban";
      return isAlly ? (
        <PrimaryText key={idx} text={bannedChamp} />
      ) : (
        <DangerText key={idx} text={bannedChamp} />
      );
    });
  }

  const { champSelectSessionData } = useContext(ChampionSelectContext);
  return (
    <View id="bans-in-phase-wrapper">
      <View>{listOfBans(true)}</View>
      <View>{listOfBans(false)}</View>
    </View>
  );
}
