import React from "react";
import { Button, LineEdit, View, Text } from "@nodegui/react-nodegui";

import { useContext, useState } from "react";
import { lcuClientHandlerObj } from "../../LCU/LCUClientHandler";
import { LCUContext } from "../../LCU/lcucontext";
import { ChampionData } from "../../LCU/types";
import { SelectedChamp } from "./types";
import { ChampionSelectContext } from "./champion-select-context";
import { disabledChampionBtn } from "./styles";

interface AvailableChampsProps {
  banPhase: boolean;
  currentActionId?: number;
  onChangeChampion: (champ: SelectedChamp) => void;
}

export function AvailableChamps({
  banPhase,
  currentActionId,
  onChangeChampion,
}: AvailableChampsProps) {
  const { currentSummoner } = useContext(LCUContext);
  const [availableChamps, setAvailableChamps] = useState<ChampionData[]>([]);
  const {
    dataDragonChampions,
    champSelectSessionData: { myTeam, bans, theirTeam },
  } = useContext(ChampionSelectContext);
  const [champFilter, setChampFilter] = useState<string | null>(null);

  React.useEffect(() => {
    if (!currentSummoner) return;
    lcuClientHandlerObj
      .getAvailableChamps(currentSummoner.summonerId)
      .then((availableChamps) => {
        setAvailableChamps(availableChamps);
      })
      .catch((err) =>
        console.log("Error occured while getting available champions", err)
      );
  }, [currentSummoner]);

  function championButton(
    champName: string,
    champId: number,
    key: number,
    disabled = false
  ): JSX.Element {
    return (
      <Button
        key={key}
        text={champName}
        style={`${disabled ? disabledChampionBtn : ""}`}
        on={{
          clicked: () => {
            //Not your action = return
            if (!currentActionId || disabled) return;

            lcuClientHandlerObj
              .champSelectAction(champId, currentActionId)
              .then(() => {
                onChangeChampion({ id: champId, name: champName });
              })
              .catch((err) =>
                console.log(
                  `Error occured while invoking champSelectAction function`,
                  err
                )
              );
          },
        }}
      ></Button>
    );
  }

  function isBannedOrPickedChampById(championId: number) {
    const isAlreadyPicked = Object.assign(myTeam, theirTeam).some(
      (team) => team.championId === championId
    );
    const isAlreadyBanned = [...bans.myTeamBans, ...bans.theirTeamBans].some(
      (id) => id === championId
    );

    return isAlreadyBanned || isAlreadyPicked;
  }

  function sortChampionsAlphabeticaly(name1: string, name2: string) {
    if (name1 < name2) return -1;
    if (name1 >= name2) return 1;
    return 0;
  }

  return (
    <View id="available-champs-wrapper">
      <View id="available-champs-search">
        <Text> Search champion </Text>
        <LineEdit
          on={{
            textChanged: (e) => setChampFilter(e.toLowerCase()),
          }}
        />
      </View>

      <View id="available-champs">
        {!banPhase
          ? availableChamps
              .filter(({ name }) => {
                if (champFilter)
                  return name.toLowerCase().includes(champFilter.toLowerCase());
                return true;
              })
              .sort((a, b) => sortChampionsAlphabeticaly(a.name, b.name))
              .map((champ, idx) =>
                championButton(
                  champ.name,
                  champ.id,
                  idx,
                  isBannedOrPickedChampById(champ.id)
                )
              )
          : dataDragonChampions
              .filter(({ name }) => {
                if (champFilter)
                  return name.toLowerCase().includes(champFilter.toLowerCase());
                return true;
              })
              .sort((a, b) => sortChampionsAlphabeticaly(a.name, b.name))
              .map((champ, idx) =>
                championButton(
                  champ.name,
                  champ.id,
                  idx,
                  isBannedOrPickedChampById(champ.id)
                )
              )}
      </View>
    </View>
  );
}
