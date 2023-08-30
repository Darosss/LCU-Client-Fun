import { View, Text } from "@nodegui/react-nodegui";
import React, { useContext } from "react";
import { ChampionSelectContext } from "./champion-select-context";
import { findChampionById } from "../../helpers/data-dragon-helpers";
import { LCUContext } from "../../LCU/lcucontext";

export function PhaseBans() {
  const {
    lolDataDragon: { dataDragonChampions },
  } = useContext(LCUContext);
  const { champSelectSessionData } = useContext(ChampionSelectContext);
  return (
    <View id="bans-in-phase-wrapper">
      <Text id="bans-in-phase-header"> Bans </Text>
      <View id="bans-in-phase-ally">
        {champSelectSessionData.bans.myTeamBans.map((ban) => (
          <Text>{findChampionById(dataDragonChampions, ban)}</Text>
        ))}
      </View>
      <View id="bans-in-phase-enemy">
        {champSelectSessionData.bans.theirTeamBans.map((ban) => (
          <Text>{findChampionById(dataDragonChampions, ban)}</Text>
        ))}
      </View>
    </View>
  );
}
