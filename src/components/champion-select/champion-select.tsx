import React, { useContext, useMemo, useState } from "react";
import { Button, Text, View } from "@nodegui/react-nodegui";
import { lcuClientHandlerObj } from "../../LCU/LCUClientHandler";
import { LCUContext } from "../../LCU/lcucontext";
import { SelectedChamp } from "./types";
import { AvailableChamps } from "./available-champs";
import { ChampionSelectContext } from "./champion-select-context";
import { champselectStyleSheet } from "./stylesheet";
import { TeamView } from "./team-view";

export function ChampSelect() {
  const { currentSummoner } = useContext(LCUContext);
  const { champSelectSessionData } = useContext(ChampionSelectContext);
  const [selectedChamp, setSelectedChamp] = useState<SelectedChamp | null>(
    null
  );

  const [currentSummonerCellId, setCurrentSummonerCellId] = useState(-1);

  React.useEffect(() => {
    for (const personInSelect of champSelectSessionData.myTeam) {
      if (personInSelect.summonerId === currentSummoner?.summonerId) {
        setCurrentSummonerCellId(personInSelect.cellId);
      }
    }
  }, [champSelectSessionData]);

  const userAction = useMemo(() => {
    return champSelectSessionData.actions?.find(
      (action) =>
        action?.actorCellId === currentSummonerCellId && action?.isInProgress
    );
  }, [champSelectSessionData]);

  return (
    <View styleSheet={champselectStyleSheet}>
      <View id="champ-select-title-wrapper">
        <Text>
          Champ select
          {userAction ? ` - Your time to ${userAction.type}!` : ""}
        </Text>
      </View>
      {/* <DoneActionsChampSelect actions={actionsChampSelect} myTeam={myTeam} /> */}
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
        <TeamView team="ally" currentSummonerCellId={currentSummonerCellId} />
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
