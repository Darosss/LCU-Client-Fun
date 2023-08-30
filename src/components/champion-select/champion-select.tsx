import React, { useContext, useMemo, useState } from "react";
import { Button, Text, View } from "@nodegui/react-nodegui";
import { lcuClientHandlerObj } from "../../LCU/LCUClientHandler";
import { LCUContext } from "../../LCU/lcucontext";
import { SelectedChamp } from "./types";
import { AvailableChamps } from "./available-champs";
import { ChampionSelectContext } from "./champion-select-context";
import { champselectStyleSheet } from "./stylesheet";
import { TeamView } from "./team-view";
import { getPercentFromValue } from "../../helpers/node-gui-responsive-helpers";
import { TimeLeftInPhase } from "./time-left-in-phase";

export function ChampSelect() {
  const {
    currentSummoner,
    options: { minSize },
  } = useContext(LCUContext);
  const {
    champSelectSessionData,
    currentSummonerCellId,
    changeCurrentSummonerCellId,
  } = useContext(ChampionSelectContext);
  const [selectedChamp, setSelectedChamp] = useState<SelectedChamp | null>(
    null
  );

  React.useEffect(() => {
    for (const personInSelect of champSelectSessionData.myTeam) {
      if (personInSelect.summonerId === currentSummoner?.summonerId) {
        changeCurrentSummonerCellId(personInSelect.cellId);
      }
    }
  }, [champSelectSessionData]);

  const userAction = useMemo(() => {
    if (currentSummonerCellId !== -1 && champSelectSessionData.actions)
      return champSelectSessionData.actions.find(
        (action) =>
          action?.actorCellId === currentSummonerCellId && action?.isInProgress
      );
  }, [champSelectSessionData, currentSummonerCellId]);

  const { maxHeightChampsList, championSelectActionsWidth } = useMemo<{
    maxHeightChampsList: number;
    championSelectActionsWidth: number;
  }>(() => {
    const maxHeightChampsList = getPercentFromValue(minSize.height, 70);
    const championSelectActionsWidth = getPercentFromValue(minSize.width, 17);
    return { maxHeightChampsList, championSelectActionsWidth };
  }, [minSize]);

  return (
    <View
      styleSheet={champselectStyleSheet(
        maxHeightChampsList,
        championSelectActionsWidth
      )}
    >
      <View id="champ-select-title-wrapper">
        <Text>
          Champ select
          {userAction ? ` - Your time to ${userAction.type}!` : ""}
        </Text>
        <TimeLeftInPhase />
      </View>
      {userAction ? (
        <View>
          <Button
            id="pick-ban-button"
            text={userAction.type || "Action"}
            on={{
              clicked: () => {
                // No selected champ return // add info to select champ?
                if (!selectedChamp) return;

                lcuClientHandlerObj
                  .champSelectAction(selectedChamp.id, userAction.id, true)
                  .then(() => setSelectedChamp(null));
              },
            }}
          ></Button>
        </View>
      ) : null}

      <View id="teams-champions-wrapper">
        <TeamView team="ally" />
        <AvailableChamps
          banPhase={userAction?.type === "ban"}
          currentActionId={userAction?.id}
          onChangeChampion={(champ) => {
            setSelectedChamp(champ);
          }}
        />
        <TeamView team="enemy" />
      </View>
    </View>
  );
}
