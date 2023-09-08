import React, { useContext, useState } from "react";
import { View } from "@nodegui/react-nodegui";
import { LCUContext } from "@lcu";
import { SelectedChamp } from "./types";
import { ChampionSelectContext } from "./champion-select-context";
import { dragonChampionsData, isBannedOrPickedChamp } from "@helpers";
import {
  DangerButton,
  PrimaryButton,
  PrimaryLineEdit,
  PrimaryText,
} from "@components";

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
  const { currentSummoner, headLCUHandler } = useContext(LCUContext);

  const {
    champSelectLCUHandler,
    champSelectSessionData: { myTeam, bans, theirTeam },
    availableChamps,
    setAvailableChamps,
  } = useContext(ChampionSelectContext);
  const [champFilter, setChampFilter] = useState<string | null>(null);

  React.useEffect(() => {
    if (!currentSummoner) return;
    headLCUHandler
      ?.getAvailableChampsBySummonerId(currentSummoner.summonerId)
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
    return !currentActionId || disabled ? (
      <DangerButton key={key} text={champName} />
    ) : (
      <PrimaryButton
        key={key}
        text={champName}
        on={{
          clicked: () => {
            champSelectLCUHandler
              ?.champSelectAction({
                championId: champId,
                actionId: currentActionId,
              })
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
      />
    );
  }

  function isBannedOrPickedChampByIdWrapped(championId: number) {
    return isBannedOrPickedChamp(championId, Object.assign(myTeam, theirTeam), [
      ...bans.myTeamBans,
      ...bans.theirTeamBans,
    ]);
  }

  function sortChampionsAlphabeticaly(name1: string, name2: string) {
    if (name1 < name2) return -1;
    if (name1 >= name2) return 1;
    return 0;
  }

  return (
    <View id="available-champs-wrapper">
      <View id="available-champs-search">
        <PrimaryText text="Search champion" />
        <PrimaryLineEdit
          on={{
            textChanged: (e) => setChampFilter(e.toLowerCase()),
          }}
          text={champFilter || ""}
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
                  isBannedOrPickedChampByIdWrapped(champ.id)
                )
              )
          : dragonChampionsData
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
                  isBannedOrPickedChampByIdWrapped(champ.id)
                )
              )}
      </View>
    </View>
  );
}
