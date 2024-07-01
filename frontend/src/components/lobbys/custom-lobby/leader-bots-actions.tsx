import React, { useMemo, useState } from "react";

import { useCustomLobbyContext } from "./custom-lobby-context";
import {
  BotDifficulty,
  ChampionBotsData,
  LobbyMember,
  TeamsIds,
} from "@/shared";
import { useSocketEventsContext } from "@/socket";
import { Button } from "@/components";
import { toast } from "react-toastify";
import styles from "./leader-bots-actions.module.scss";
import { changeBotDifficulty, getBotDifficultyBtnColor } from "./helpers";

interface LeaderBotActionsProps {
  championData?: ChampionBotsData;
  member: LobbyMember;
  currentAddedBotsIds: number[];
}

export function LeaderBotsActions({
  championData,
  member,
  currentAddedBotsIds,
}: LeaderBotActionsProps) {
  const teamIdAsEnum =
    String(member.teamId) === TeamsIds.first ? TeamsIds.first : TeamsIds.second;
  const { emits } = useSocketEventsContext();
  const { championBots } = useCustomLobbyContext();
  const [botChampFilter, setBotChampFilter] = useState("");
  const [showChampionsList, setShowChampionsList] = useState(false);
  function onChangeExistingBotDifficulty(
    teamId: TeamsIds,
    botChampionId: number,
    botDifficulty: BotDifficulty
  ) {
    emits.editExistingBotInCustomLobby(
      {
        championId: botChampionId,
        botDifficulty: botDifficulty,
        teamId: teamId,
      },
      (error, data) => {
        if (error) return toast.error(error);
        setShowChampionsList(false);
      }
    );
  }

  function showFilteredChampBot() {
    const foundChamp = championBots.find((champion) => {
      if (currentAddedBotsIds.includes(champion.id)) return;
      return champion.name.toLowerCase().includes(botChampFilter);
    });

    return (
      <Button
        defaultButtonType="success"
        onClick={() => {
          if (foundChamp)
            onChangeExistingBotDifficulty(
              teamIdAsEnum,
              foundChamp.id,
              member.botDifficulty
            );
        }}
      >{`${
        foundChamp ? `Change to: ${foundChamp?.name}` : "Not found"
      }`}</Button>
    );
  }
  function changeChoosenBotDifficulty() {
    const changedBotDifficulty = changeBotDifficulty(member.botDifficulty);
    onChangeExistingBotDifficulty(
      teamIdAsEnum,
      member.botChampionId,
      changedBotDifficulty
    );
  }
  const botDifficultyBtnColor = useMemo(
    () => getBotDifficultyBtnColor(member.botDifficulty as BotDifficulty),
    [member.botDifficulty]
  );

  return (
    <div className={styles.leaderBotsActionsWrapper}>
      <Button
        defaultButtonType="primary"
        onClick={() => setShowChampionsList(!showChampionsList)}
      >
        {championData?.name || `${member.botChampionId}`}
      </Button>

      <Button
        defaultButtonType={botDifficultyBtnColor}
        onClick={changeChoosenBotDifficulty}
      >
        {member.botDifficulty}
      </Button>

      <Button
        defaultButtonType="danger"
        onClick={() => {
          if (!championData) return;
          emits.removeExistingBotInCustomLobby(
            {
              botName: championData.name,
              teamId: teamIdAsEnum,
            },
            (error, data) => {
              if (error) return toast.error(error);
            }
          );
        }}
      >
        x
      </Button>
      {showChampionsList ? (
        <div className={styles.changeBotWrapper}>
          Search
          <input
            onChange={(e) => setBotChampFilter(e.target.value.toLowerCase())}
            value={botChampFilter}
          />
          <div>{showFilteredChampBot()}</div>
        </div>
      ) : null}
    </div>
  );
}
