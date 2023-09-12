import React, { useContext } from "react";
import { View } from "@nodegui/react-nodegui";
import { ChampionSelectContext } from "../champion-select-context";
import { TeamSummonersBlocks } from "./team-summoners-blocks";

interface TeamViewProps {
  team?: "ally" | "enemy";
}

export function TeamView({ team }: TeamViewProps) {
  const { summonersData } = useContext(ChampionSelectContext);

  return (
    <View id="team-view">
      {team === "ally"
        ? [...summonersData.values()]
            ?.filter(({ isOnPlayersTeam }) => isOnPlayersTeam)
            .map((summoner, idx) => (
              <TeamSummonersBlocks key={idx} summoner={summoner} />
            ))
        : [...summonersData.values()]
            ?.filter(({ isOnPlayersTeam }) => !isOnPlayersTeam)
            .map((summoner, idx) => (
              <TeamSummonersBlocks key={idx} summoner={summoner} />
            ))}
    </View>
  );
}
