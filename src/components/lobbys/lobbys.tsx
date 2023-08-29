import { View } from "@nodegui/react-nodegui";
import React, { useContext, useMemo } from "react";
import { LCUContext } from "../../LCU/lcucontext";
import { lobbysStylesheet } from "./stylesheet";
import { LobbyActions } from "./lobby-actions";
import { LobbysList } from "./lobbys-list";
import { getPercentFromValue } from "../../helpers/node-gui-responsive-helpers";

export function Lobbys() {
  const {
    lobbyData,
    options: {
      minSize: { width },
    },
  } = useContext(LCUContext);

  const { minTeamWidth, minMaxTeamOpts } = useMemo<{
    minTeamWidth: number;
    minMaxTeamOpts: number;
  }>(() => {
    const minTeamWidth = getPercentFromValue(width, 50);
    const minMaxTeamOpts = getPercentFromValue(width, 10);
    return { minTeamWidth, minMaxTeamOpts };
  }, [width]);

  return (
    <View
      id="eligible-lobbys-wrapper"
      styleSheet={lobbysStylesheet(minTeamWidth, minMaxTeamOpts)}
    >
      {lobbyData ? <LobbyActions /> : <LobbysList />}
    </View>
  );
}
