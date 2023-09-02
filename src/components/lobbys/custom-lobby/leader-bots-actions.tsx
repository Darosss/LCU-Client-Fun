import { Button, View, LineEdit } from "@nodegui/react-nodegui";
import React, { useContext, useState } from "react";
import { lcuClientHandlerObj } from "../../LCU/LCUClientHandler";
import { LobbyMember } from "../../LCU/types";
import {
  ChampionBotsData,
  TeamsIds,
  BotDifficulty,
} from "../../LCU/types/custom-mode";
import { CustomLobbyContext } from "./custom-lobby/custom-lobby-context";
import { findChampionById } from "../../helpers/data-dragon-helpers";
import { LCUContext } from "../../LCU/lcucontext";

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
  const {
    lolDataDragon: { dataDragonChampions },
  } = useContext(LCUContext);
  const { championBots } = useContext(CustomLobbyContext);
  const [botChampFilter, setBotChampFilter] = useState("");
  const [showChampionsList, setShowChampionsList] = useState(false);
  function onChangeExistingBotDifficulty(
    botName: string,
    teamId: TeamsIds,
    botChampionId: number,
    botDifficulty: BotDifficulty
  ) {
    lcuClientHandlerObj.editExistingBotInCustomLobby(
      { botName, teamId: teamId },
      {
        championId: botChampionId,
        botDifficulty: botDifficulty,
        teamId: teamId,
      }
    );
  }

  function handleOnChangeExistingBotBtn(newChampionId: number) {
    const champIdName = findChampionById(
      dataDragonChampions,
      championData?.id || -1
    )?.idName;
    if (!champIdName) return;

    lcuClientHandlerObj
      .editExistingBotInCustomLobby(
        { teamId: teamIdAsEnum, botName: champIdName },
        {
          championId: newChampionId,
          teamId: teamIdAsEnum,
          botDifficulty: member.botDifficulty as BotDifficulty,
        }
      )
      .then(() => setShowChampionsList(false));
  }

  function showFilteredChampBot() {
    const foundChamp = championBots.find((champion) => {
      if (currentAddedBotsIds.includes(champion.id)) return;
      return champion.name.toLowerCase().includes(botChampFilter);
    });

    return (
      <Button
        text={`${foundChamp ? `Change to: ${foundChamp?.name}` : "Not found"}`}
        on={{
          clicked: () => {
            if (foundChamp) handleOnChangeExistingBotBtn(foundChamp.id);
          },
        }}
      ></Button>
    );
  }
  return (
    <View id="leader-bot-actions-wrapper">
      <Button
        text={championData?.name || `${member.botChampionId}`}
        on={{ clicked: () => setShowChampionsList(!showChampionsList) }}
      />

      <Button
        text={member.botDifficulty}
        on={{
          clicked: () => {
            const champIdName = findChampionById(
              dataDragonChampions,
              championData?.id || -1
            )?.idName;
            if (!champIdName) return;

            const changedBotDifficulty =
              member.botDifficulty === BotDifficulty.EASY
                ? BotDifficulty.MEDIUM
                : BotDifficulty.EASY;

            onChangeExistingBotDifficulty(
              champIdName,
              teamIdAsEnum,
              member.botChampionId,
              changedBotDifficulty
            );
          },
        }}
      />
      <Button
        text="x"
        on={{
          clicked: () => {
            if (!championData) return;
            lcuClientHandlerObj.removeExistingBotFromCustomLobby({
              botName: championData.name,
              teamId: teamIdAsEnum,
            });
          },
        }}
      />
      {showChampionsList ? (
        <View id="leader-bot-actions-change-bot">
          {showFilteredChampBot()}
          <LineEdit
            on={{
              textChanged: (e) => setBotChampFilter(e.toLowerCase()),
            }}
          />
        </View>
      ) : null}
    </View>
  );
}
