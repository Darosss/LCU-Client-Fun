"use client";
import React, { useCallback, useMemo, useState } from "react";

import { SelectedChamp } from "./types";
import { AvailableChamps } from "./available-champs";
import { useChampionSelectContext } from "./champion-select-context";
import { TeamView } from "./team-view";
import { TimeLeftInPhase } from "./time-left-in-phase";
import { PhaseBans } from "./phase-bans";
import { Button, useHeadContext } from "@/components";
import { ChampionSelectRunes } from "./runes";
import { RunesContextProvider } from "./runes/runes-context";
import { ActionsChampSelectSessionData, ChampSelectActionArgs } from "@/shared";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";
import { findAvailableChampionForAutoPick } from "@/helpers";

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
    ({ championId, actionId, completed = false }: ChampSelectActionArgs) => {
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
    <div>
      <div>
        {/* champ select */}
        <div id="champ-select-wrapper">
          <div id="champ-select-title-wrapper">
            <div>{`Champ select ${
              userAction ? ` - Your time to ${userAction.type}!` : ""
            }
        `}</div>
            <TimeLeftInPhase onEndingTimeLeft={autoPickChampion} />
            <div>Bans</div>
            <PhaseBans />
          </div>
          {userAction ? (
            <div id="summoner-action-btn-wrapper">
              <Button
                defaultButtonType={
                  userAction.type === "pick" ? "primary" : "danger"
                }
                onClick={handleOnFinishAction}
              >
                {userAction.type}
              </Button>
            </div>
          ) : null}

          <div id="teams-champions-wrapper">
            <TeamView team="ally" />
            <AvailableChamps
              banPhase={userAction?.type === "ban"}
              currentActionId={userAction?.id}
              onChangeChampion={(champ) => {
                setSelectedChamp(champ);
              }}
            />
            <TeamView team="enemy" />
          </div>
        </div>
      </div>

      <div>
        {/* runes */}
        <div id="champ-select-runes-wrapper">
          <RunesContextProvider>
            <ChampionSelectRunes />
          </RunesContextProvider>
        </div>
      </div>
    </div>
  );
}
