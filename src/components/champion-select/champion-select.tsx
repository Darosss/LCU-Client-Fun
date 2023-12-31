import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TabItem, Tabs, View } from "@nodegui/react-nodegui";
import {
  ActionsChampSelectSessionData,
  ChampSelectActionArgs,
  LCUContext,
} from "@lcu";
import { findAvailableChampionForAutoPick } from "@helpers";
import { SelectedChamp } from "./types";
import { AvailableChamps } from "./available-champs";
import { ChampionSelectContext } from "./champion-select-context";
import { TeamView } from "./team-view";
import { TimeLeftInPhase } from "./time-left-in-phase";
import { PhaseBans } from "./phase-bans";
import {
  DangerButton,
  DangerText,
  PrimaryButton,
  PrimaryText,
} from "@components";
import { ChampionSelectRunes } from "./runes";
import { RunesContextProvider } from "./runes/runes-context";

export function ChampSelect() {
  const {
    options: { autoPickChamp, autoPickChamps },
    lobbyData,
  } = useContext(LCUContext);
  const {
    champSelectLCUHandler,
    champSelectSessionData: {
      actions,
      localPlayerCellId,
      myTeam,
      theirTeam,
      bans,
    },
    availableChamps,
    summonersData,
    updateSummonersDataByCellId,
  } = useContext(ChampionSelectContext);
  const [selectedChamp, setSelectedChamp] = useState<SelectedChamp | null>(
    null
  );

  const localUserActionActiveNow = useMemo(() => {
    return summonersData.get(String(localPlayerCellId))?.activeActionType;
  }, [localPlayerCellId, summonersData.get(String(localPlayerCellId))]);

  const userAction = useMemo(() => {
    if (localPlayerCellId === -1 && !localUserActionActiveNow) return;

    const actionsToCheck: ActionsChampSelectSessionData[] = [];
    if (localUserActionActiveNow === "ban")
      actionsToCheck.push(...actions.banActions);
    else if (localUserActionActiveNow === "pick")
      actionsToCheck.push(...actions.pickActions);

    return actionsToCheck.find(
      (action) => action.isInProgress && !action.completed
    );
  }, [localUserActionActiveNow]);

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
        completeActionChampion({
          championId: foundChampionId,
          actionId: userAction.id,
          completed: true,
        });
    } else {
      // TODO: add info about not picked auto pick champ
    }
  }

  const completeActionChampion = useCallback(
    ({ championId, actionId, completed = false }: ChampSelectActionArgs) => {
      if (!champSelectLCUHandler) return;
      champSelectLCUHandler
        ?.champSelectAction({
          championId,
          actionId,
          completed,
        })
        .then(() => setSelectedChamp(null));
    },
    [champSelectLCUHandler]
  );

  useEffect(() => {
    if (!champSelectLCUHandler || !lobbyData) return;

    const {
      gameConfig: { customTeam100, customTeam200 },
    } = lobbyData;
    const countOfSummoners = customTeam100.length + customTeam200.length;

    for (let i = 0; i < countOfSummoners; i++) {
      champSelectLCUHandler.wsOnChampionSelectSummoner(i, (error, data) => {
        if (error || !data) return;
        updateSummonersDataByCellId(i.toString(), data);
      });
    }

    return () => {
      for (let i = 0; i < countOfSummoners; i++) {
        champSelectLCUHandler?.unsubscribeOnChampionSelectSummoner(i);
      }
    };
  }, [champSelectLCUHandler]);

  function handleOnFinishAction() {
    if (!selectedChamp || !userAction) return;
    completeActionChampion({
      championId: selectedChamp.id,
      actionId: userAction.id,
      completed: true,
    });
  }

  return (
    <Tabs>
      <TabItem title="Champ select">
        <View id="champ-select-wrapper">
          <View id="champ-select-title-wrapper">
            <PrimaryText
              text={`
          Champ select ${
            userAction ? ` - Your time to ${userAction.type}!` : ""
          }
        `}
            />
            <TimeLeftInPhase onEndingTimeLeft={() => autoPickChampion()} />
            <DangerText text="Bans" />
            <PhaseBans />
          </View>
          {userAction ? (
            <View id="summoner-action-btn-wrapper">
              {userAction.type === "pick" ? (
                <PrimaryButton
                  text={userAction.type}
                  on={{ clicked: () => handleOnFinishAction() }}
                />
              ) : (
                <DangerButton
                  text={userAction.type}
                  on={{ clicked: () => handleOnFinishAction() }}
                />
              )}
            </View>
          ) : null}

          <View id="teams-champions-wrapper">
            <TeamView team="ally" />
            <AvailableChamps
              banPhase={userAction?.type === "ban"}
              currentActionId={userAction?.id}
              onChangeChampion={(champ) => setSelectedChamp(champ)}
            />
            <TeamView team="enemy" />
          </View>
        </View>
      </TabItem>

      <TabItem title="Runes">
        <View id="champ-select-runes-wrapper">
          <RunesContextProvider>
            <ChampionSelectRunes />
          </RunesContextProvider>
        </View>
      </TabItem>
    </Tabs>
  );
}
