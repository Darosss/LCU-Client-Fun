import React, { useContext } from "react";
import { View, Text } from "@nodegui/react-nodegui";
import { ChampionSelectContext } from "./champion-select-context";
import { findChampionById } from "@helpers";
import { LCUContext } from "@lcu";

export function PhaseBans() {
  const {
    lolDataDragon: { dataDragonChampions },
  } = useContext(LCUContext);

  function listOfBans(isAlly = false) {
    const onlyBanActions = champSelectSessionData.actions.filter(
      (action) =>
        action.type === "ban" &&
        (isAlly ? action.isAllyAction : !action.isAllyAction)
    );

    return onlyBanActions.map((ban, idx) => {
      const bannedChamp = findChampionById(dataDragonChampions, ban.championId);
      return <Text key={idx}>{bannedChamp?.name || "no ban"}</Text>;
    });
  }

  const { champSelectSessionData } = useContext(ChampionSelectContext);
  return (
    <View id="bans-in-phase-wrapper">
      <View id="bans-in-phase-ally">{listOfBans(true)}</View>
      <View id="bans-in-phase-enemy">{listOfBans(false)}</View>
    </View>
  );
}
