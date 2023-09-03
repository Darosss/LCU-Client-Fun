import React, { useContext, useMemo, useState } from "react";
import { Button, Text, View } from "@nodegui/react-nodegui";
import { lcuClientHandlerObj, LCUContext } from "@lcu";
import { findAvailableChampionForAutoPick } from "@helpers";
import { SelectedChamp } from "./types";
import { AvailableChamps } from "./available-champs";
import { ChampionSelectContext } from "./champion-select-context";
import { champselectStyleSheet } from "./stylesheet";
import { TeamView } from "./team-view";
import { TimeLeftInPhase } from "./time-left-in-phase";
import { PhaseBans } from "./phase-bans";

export function ChampSelect() {
  const {
    options: {
      minSize: { width, height },
      autoPickChamp,
      autoPickChamps,
    },
  } = useContext(LCUContext);
  const {
    champSelectSessionData: {
      actions,
      localPlayerCellId,
      myTeam,
      theirTeam,
      bans,
    },
    availableChamps,
  } = useContext(ChampionSelectContext);
  const [selectedChamp, setSelectedChamp] = useState<SelectedChamp | null>(
    null
  );

  const userAction = useMemo(() => {
    if (localPlayerCellId !== -1 && actions)
      return [...actions.banActions, ...actions.pickActions].find(
        (action) =>
          action?.actorCellId === localPlayerCellId && !action?.completed
      );
  }, [actions, localPlayerCellId]);

  function autoPickChampion() {
    if (!userAction?.isInProgress || userAction.type !== "pick") return;

    const localPlayer = myTeam.find(
      ({ cellId }) => cellId === localPlayerCellId
    );

    if (!localPlayer) return;

    if (autoPickChamp) {
      const localPlayerRole = localPlayer.assignedPosition || "other";

      const availableChampsToPick = autoPickChamps[localPlayerRole];

      let foundChampionId: number | null = findAvailableChampionForAutoPick(
        availableChampsToPick,
        Object.assign(myTeam, theirTeam),
        [...bans.myTeamBans, ...bans.theirTeamBans],
        availableChamps
      );

      if (foundChampionId)
        completeActionChampion(foundChampionId, userAction.id, true);
    } else {
      // TODO: add info about not picked auto pick champ
    }
  }

  function completeActionChampion(
    championId: number,
    userActionId: number,
    complete = false
  ) {
    // No selected champ return // add info to select champ?
    lcuClientHandlerObj
      .champSelectAction(championId, userActionId, complete)
      .then(() => setSelectedChamp(null));
  }

  return (
    <View styleSheet={champselectStyleSheet(width, height)}>
      <View id="champ-select-title-wrapper">
        <Text>
          Champ select
          {userAction ? ` - Your time to ${userAction.type}!` : ""}
        </Text>
        <TimeLeftInPhase onEndingTimeLeft={() => autoPickChampion()} />
        <Text> Bans </Text>
        <PhaseBans />
      </View>
      {userAction?.isInProgress ? (
        <View>
          <Button
            id="pick-ban-button"
            text={userAction.type || "Action"}
            on={{
              clicked: () => {
                if (!selectedChamp) return;
                completeActionChampion(selectedChamp.id, userAction.id, true);
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
