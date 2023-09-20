import React, { useContext, useState } from "react";
import { findSummonerSpellById, dragonSpellsData } from "@helpers";
import {
  LCUContext,
  RecommendedRunesData,
  SelectedPerkIds,
  RunesData,
  RuneSlotType,
} from "@lcu";
import { View } from "@nodegui/react-nodegui";
import { PrimaryButton, InfoButton } from "@components";
import { ChampionSelectContext } from "../champion-select-context";
import { RuneImage } from "./rune-image";

interface RecomenedRunesForChampionProps {
  show: boolean;
  onClickRecommendedRunes: () => void;
  onChangeRecommendedRunePage: () => void;
}
export function RecommenedRunesForChampion({
  show,
  onClickRecommendedRunes,
  onChangeRecommendedRunePage,
}: RecomenedRunesForChampionProps) {
  const { headLCUHandler, lobbyData } = useContext(LCUContext);
  const {
    summonersData,
    champSelectSessionData: { localPlayerCellId },
    champSelectLCUHandler,
  } = useContext(ChampionSelectContext);

  const [recommendedRunesData, setRecommendedRunesData] = useState<
    RecommendedRunesData[]
  >([]);

  const [changeSpells, setChangeSpells] = useState(false);

  function handleOnClickRecommendedRunes() {
    if (!headLCUHandler || !lobbyData || !summonersData) return;
    onClickRecommendedRunes();
    //99% it will be defined.
    const localSummonerData = summonersData.get(String(localPlayerCellId))!;

    headLCUHandler
      .getRecomenedPagesByChampIdPositionAndMapId(
        localSummonerData.championId,
        localSummonerData.assignedPosition.toUpperCase() || "NONE",
        //11 is summoner's rift for now let's make it default
        lobbyData.gameConfig.mapId
      )
      .then((runeData) => setRecommendedRunesData(runeData));
  }

  function handleOnClickChangeSpells() {
    setChangeSpells(!changeSpells);
  }

  function handleOnClickRecommendedRunePage({
    recommendationChampionId,
    primaryPerkStyleId,
    perks,
    secondaryPerkStyleId,
    keystone: { recommendationDescriptor },
    summonerSpellIds: [spell1, spell2],
  }: RecommendedRunesData) {
    const selectedPerksIds: SelectedPerkIds = perks.map(
      (perk) => perk.id
    ) as SelectedPerkIds;

    headLCUHandler
      ?.createRunePage({
        name: `${recommendationChampionId}: ${recommendationDescriptor}`,
        isEditable: true,
        primaryStyleId: primaryPerkStyleId,
        selectedPerkIds: selectedPerksIds,
        subStyleId: secondaryPerkStyleId,
        isTemporary: true,
      })
      .then(async (createdPage) => {
        await headLCUHandler.setCurrentPage(createdPage.id);
        onChangeRecommendedRunePage();
      });

    if (changeSpells && champSelectLCUHandler) {
      champSelectLCUHandler.changeSummonerSpells({
        spell1Id: spell1,
        spell2Id: spell2,
      });
    }
  }

  return (
    <View id="recommended-runnes-for-champion-wrapper">
      <View id="recommended-runes-for-champion-actions">
        <PrimaryButton
          text={`Recommended runes`}
          on={{ clicked: () => handleOnClickRecommendedRunes() }}
        />

        <InfoButton
          text={`ChangeSpells: ${changeSpells}`}
          on={{ clicked: () => handleOnClickChangeSpells() }}
        />
      </View>

      {show
        ? recommendedRunesData.map((data, idx) => {
            //FIXME: make a better filter/map
            const filteredPerks: [RunesData[], RunesData[], RunesData[]] = [
              [],
              [],
              [],
            ];
            data.perks.forEach((perk) => {
              if (perk.slotType === RuneSlotType.K_KEY_STONE)
                filteredPerks[0].push(perk);
              else if (
                perk.slotType === RuneSlotType.K_MIXED_REGULAR_SPLASHABLE
              )
                filteredPerks[1].push(perk);
              else return filteredPerks[2].push(perk);
            });
            return (
              <View
                key={idx}
                id="recommended-runes-for-champion-list"
                style=""
                on={{
                  MouseButtonPress: () => {
                    handleOnClickRecommendedRunePage(data);
                  },
                }}
              >
                {filteredPerks.map((innerPerks, innerIdx) => (
                  <View key={innerIdx}>
                    {innerPerks.map((perk, perkIdx) => (
                      <RuneImage
                        key={perkIdx}
                        choosenCondition={false}
                        imgSrc={perk.iconPath}
                      />
                    ))}
                  </View>
                ))}

                {changeSpells ? (
                  <View id="recommended-spells-for-champion-list">
                    {data.summonerSpellIds.map((spell, idx) => {
                      const foundSpell = findSummonerSpellById(
                        dragonSpellsData,
                        spell
                      );
                      return <PrimaryButton key={idx} text={foundSpell} />;
                    })}
                  </View>
                ) : null}
              </View>
            );
          })
        : null}
    </View>
  );
}
