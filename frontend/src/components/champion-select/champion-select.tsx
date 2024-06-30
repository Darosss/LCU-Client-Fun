"use client";
import React, { useCallback, useMemo, useState } from "react";

import { SelectedChamp } from "./types";
import { AvailableChamps } from "./available-champs";
import { useChampionSelectContext } from "./champion-select-context";
import { TeamView } from "./team-view";
import { TimeLeftInPhase } from "./time-left-in-phase";
import { PhaseBans } from "./phase-bans";
import { Button, RunesContextProvider, useHeadContext } from "@/components";
import {
  ActionsChampSelectSessionData,
  ChampSelectActionParams,
} from "@/shared";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";
import { findAvailableChampionForAutoPick } from "@/helpers";
import styles from "./champion-select.module.scss";
import { ChampionSelectRunes } from "./runes/champion-select-runes";

export function ChampSelect() {
  const { events, emits } = useSocketEventsContext();
  const {
    lobbyDataState: [lobbyData],
    options: { autoPickChamp, autoPickChamps },
  } = useHeadContext();
  const {
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
  } = useChampionSelectContext();

  const [selectedChamp, setSelectedChamp] = useState<SelectedChamp | null>(
    null
  );

  const localUserActionActiveNow = useMemo(() => {
    return summonersData.get(String(localPlayerCellId))?.activeActionType;
  }, [localPlayerCellId, summonersData]);

  const userAction = useMemo(() => {
    if (!localUserActionActiveNow) return;
    const actionsToCheck: ActionsChampSelectSessionData[] = [];
    if (localUserActionActiveNow === "ban")
      actionsToCheck.push(...actions.banActions);
    else if (localUserActionActiveNow === "pick")
      actionsToCheck.push(...actions.pickActions);
    return actionsToCheck.find(
      (action) => action.isInProgress && !action.completed
    );
  }, [actions.banActions, actions.pickActions, localUserActionActiveNow]);

  function autoPickChampion() {
    if (!autoPickChamp) return;
    if (!userAction?.isInProgress || userAction.type !== "pick") return;

    const localPlayer = myTeam.find(
      ({ cellId }) => cellId === localPlayerCellId
    );

    if (!localPlayer) return;

    const localPlayerRole = localPlayer.assignedPosition || "other";

    const availableChampsToPick = autoPickChamps[localPlayerRole];

    const foundChampionId: number | null = findAvailableChampionForAutoPick(
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
  }

  const completeActionChampion = useCallback(
    ({ championId, actionId, completed = false }: ChampSelectActionParams) => {
      emits.champSelectAction(
        { championId, actionId, completed },
        (error, data) => {
          if (error || !data)
            return toast.error(error || "Couldn't complete action");

          setSelectedChamp(null);
        }
      );
    },
    [emits]
  );

  React.useEffect(() => {
    events.championSelectSummonerData.on((champSelectData) => {
      const { summonerCellId, data } = champSelectData;

      updateSummonersDataByCellId(String(summonerCellId), data);
    });
  }, [events]);

  function handleOnFinishAction() {
    if (!selectedChamp || !userAction) return;
    completeActionChampion({
      championId: selectedChamp.id,
      actionId: userAction.id,
      completed: true,
    });
  }
  return (
    <div className={styles.championSelectWrapper}>
      <RunesView />
      <div className={styles.headerWrapper}>
        <div className={styles.actionInfoWrapper}>
          <h2>{`Champ select ${
            userAction ? ` - Your time to ${userAction.type}!` : ""
          }
        `}</h2>
          <h2>
            <TimeLeftInPhase onEndingTimeLeft={autoPickChampion} />
          </h2>
        </div>
        <div className={styles.bansWrapper}>
          <PhaseBans />
        </div>
      </div>
      <div className={styles.userActionWrapper}>
        {userAction ? (
          <Button
            defaultButtonType={
              userAction.type === "pick" ? "primary" : "danger"
            }
            onClick={handleOnFinishAction}
          >
            {userAction.type}
          </Button>
        ) : (
          <Button defaultButtonType="secondary"> - </Button>
        )}
      </div>

      <div className={styles.mainContentChampionSelectWrapper}>
        <div className={styles.teamWrapper}>
          <TeamView team="ally" />
        </div>
        <div className={styles.availableChampsWrapper}>
          <AvailableChamps
            banPhase={userAction?.type === "ban"}
            currentActionId={userAction?.id}
            onChangeChampion={(champ) => {
              setSelectedChamp(champ);
            }}
          />
        </div>

        <div className={styles.teamWrapper}>
          <TeamView team="enemy" />
        </div>
      </div>
    </div>
  );
}

function RunesView() {
  const [showRunesView, setShowRunesView] = useState(true);
  return (
    <div
      className={`${styles.runesContentWrapper} ${
        showRunesView ? styles.open : ""
      }`}
    >
      <div>
        <Button
          defaultButtonType="info"
          onClick={() => setShowRunesView(!showRunesView)}
        >
          {showRunesView ? "Close runes" : "Runes"}
        </Button>
      </div>
      {showRunesView ? (
        <div className={styles.runesContentViewWrapper}>
          <RunesContextProvider>
            <ChampionSelectRunes />
          </RunesContextProvider>
        </div>
      ) : null}
    </div>
  );
}
