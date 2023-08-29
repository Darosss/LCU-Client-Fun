import { View } from "@nodegui/react-nodegui";
import React, { useContext } from "react";
import { ChampionSelectContext } from "../champion-select-context";
import { TeamSummonersBlocks } from "./team-summoners-blocks";

interface TeamViewProps {
  team?: "ally" | "enemy";
}

export function TeamView({ team }: TeamViewProps) {
  const { champSelectSessionData } = useContext(ChampionSelectContext);

  return (
    <View id="team-view">
      {team === "ally"
        ? champSelectSessionData.myTeam?.map((summoner, idx) => (
            <TeamSummonersBlocks key={idx} summoner={summoner} />
          ))
        : champSelectSessionData.theirTeam?.map((summoner, idx) => (
            <TeamSummonersBlocks key={idx} summoner={summoner} />
          ))}
    </View>
  );
}
