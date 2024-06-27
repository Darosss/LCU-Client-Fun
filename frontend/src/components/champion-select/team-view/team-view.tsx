import React from "react";
import { useChampionSelectContext } from "../champion-select-context";
import { TeamSummonersBlocks } from "./team-summoners-blocks";

interface TeamViewProps {
  team?: "ally" | "enemy";
}

export function TeamView({ team }: TeamViewProps) {
  const { summonersData } = useChampionSelectContext();

  return (
    <div id="team-view">
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
    </div>
  );
}
