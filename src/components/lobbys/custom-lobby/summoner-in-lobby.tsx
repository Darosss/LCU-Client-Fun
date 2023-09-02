import React, { useContext } from "react";
import { View, Button } from "@nodegui/react-nodegui";
import { LCUContext, LobbyMember } from "@lcu";
import { LeaderPlayersActions } from "../leader-players-actions";

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
