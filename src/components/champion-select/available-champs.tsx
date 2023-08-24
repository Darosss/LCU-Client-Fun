import React from "react";
import { Button, LineEdit, View, Text } from "@nodegui/react-nodegui";

import { useContext, useState } from "react";
import { lcuClientHandlerObj } from "../../LCU/LCUClientHandler";
import { LCUContext } from "../../LCU/lcucontext";
import { ChampionData } from "../../LCU/types";
import { SelectedChamp } from "./types";
import { ChampionSelectContext } from "./champion-select-context";

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
  const { dataDragonChampions } = useContext(ChampionSelectContext);
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
    key: number
  ): JSX.Element {
    return (
      <Button
        key={key}
        text={champName}
        on={{
          clicked: () => {
            //Not your action = return
            if (!currentActionId) return;

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
              .map((champ, idx) => championButton(champ.name, champ.id, idx))
          : dataDragonChampions
              .filter(({ name }) => {
                if (champFilter)
                  return name.toLowerCase().includes(champFilter.toLowerCase());
                return true;
              })
              .map((champ, idx) => championButton(champ.name, champ.id, idx))}
      </View>
    </View>
  );
}
