import React from "react";
import { LeaderPlayersActions } from "../leader-players-actions";
import { Button, useHeadContext } from "@/components";
import { LobbyMember } from "@/shared";

interface SummonerInLobbyProps {
  summoner: LobbyMember;
}

export function SummonerInLobby({
  summoner: { summonerName, summonerId, allowedInviteOthers },
}: SummonerInLobbyProps) {
  const {
    currentSummonerState: [currentSummoner],
    lobbyDataState: [lobbyData],
  } = useHeadContext();
  return (
    <div id="summoner-in-lobby-wrapper">
      <Button>{summonerName}</Button>
      {currentSummoner?.summonerId !== summonerId &&
      lobbyData?.localMember.isLeader ? (
        <LeaderPlayersActions
          summonerId={summonerId}
          allowedInviteOthers={allowedInviteOthers}
        />
      ) : null}
    </div>
  );
}
