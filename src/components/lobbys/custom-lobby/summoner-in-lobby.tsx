import { View, Button } from "@nodegui/react-nodegui";
import React, { useContext } from "react";
import { LCUContext } from "../../../LCU/lcucontext";
import { LobbyMember } from "../../../LCU/types";
import { LeaderPlayersActions } from "./leader-players-actions";

interface SummonerInLobbyProps {
  summoner: LobbyMember;
}

export function SummonerInLobby({
  summoner: { summonerName, summonerId, allowedInviteOthers },
}: SummonerInLobbyProps) {
  const { currentSummoner, lobbyData } = useContext(LCUContext);
  return (
    <View id="summoner-in-lobby-wrapper">
      <Button text={summonerName}></Button>
      {currentSummoner?.summonerId !== summonerId &&
      lobbyData?.localMember.isLeader ? (
        <LeaderPlayersActions
          summonerId={summonerId}
          allowedInviteOthers={allowedInviteOthers}
        />
      ) : null}
    </View>
  );
}
