import React, { useState } from "react";

import { Button, useHeadContext } from "@/components";
import { useChampionSelectContext } from "../champion-select-context";
import { RuneImage } from "./rune-image";
import { useSocketEventsContext } from "@/socket";
import {
  RecommendedRunesData,
  RuneSlotType,
  RunesData,
  SelectedPerkIds,
} from "@/shared";
import { toast } from "react-toastify";
import { useRunesContext } from "./runes-context";

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
  const { emits } = useSocketEventsContext();
  const {
    lobbyDataState: [lobbyData],
    options: { runes: runesOpts },
  } = useHeadContext();
  const {
    summonersData,
    champSelectSessionData: { localPlayerCellId },
  } = useChampionSelectContext();

  const { emitSetCurrentRunePage } = useRunesContext();

  const [recommendedRunesData, setRecommendedRunesData] = useState<
    RecommendedRunesData[]
  >([]);

  function handleOnClickRecommendedRunes() {
    if (!lobbyData || !summonersData) return;
    onClickRecommendedRunes();
    //99% it will be defined. <- assertion!
    const localSummonerData = summonersData.get(String(localPlayerCellId))!;

    emits.getRecommendedPagesByChampIdPositionAndMapId(
      {
        champId: localSummonerData.championId,
        mapId: lobbyData.gameConfig.mapId,
        position: localSummonerData.assignedPosition.toUpperCase() || "NONE",
      },
      (error, data) => {
        if (error || !data)
          return toast.error(error || "Couldn't get recommended rune pages");

        setRecommendedRunesData(data);
      }
    );
  }

  function handleOnClickChangeSpells() {
    // changeOptions({
    //   runes: { ...runesOpts, changeSpells: !runesOpts.changeSpells },
    // });
  }

  //TODO: add swap spells change options - not necessary for now

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

    emits.createRunePage(
      {
        name: `${recommendationChampionId}: ${recommendationDescriptor}`,
        isEditable: true,
        primaryStyleId: primaryPerkStyleId,
        selectedPerkIds: selectedPerksIds,
        subStyleId: secondaryPerkStyleId,
        isTemporary: true,
      },
      (error, data) => {
        if (error || !data)
          return toast.error(error || "Couldn't set recommended rune page");

        emitSetCurrentRunePage(data);
        onChangeRecommendedRunePage;
      }
    );

    if (runesOpts.changeSpells) {
      // champSelectLCUHandler.changeSummonerSpells({
      //   spell1Id: spell1,
      //   spell2Id: spell2,
      // });
    }
  }

  return (
    <div id="recommended-runnes-for-champion-wrapper">
      <div id="recommended-runes-for-champion-actions">
        <Button
          defaultButtonType="primary"
          onClick={handleOnClickRecommendedRunes}
        >
          Recommended runes
        </Button>{" "}
        <Button defaultButtonType="info" onClick={handleOnClickChangeSpells}>
          {`ChangeSpells: ${runesOpts.changeSpells}`}
        </Button>
      </div>

      {show ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: "30%",
            left: 0,
            right: 0,
            background: "white",
            color: "black",
          }}
        >
          {recommendedRunesData.map((data, idx) => {
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
              <div
                key={idx}
                id="recommended-runes-for-champion-list"
                onClick={() => handleOnClickRecommendedRunePage(data)}
              >
                {filteredPerks.map((innerPerks, innerIdx) => (
                  <div key={innerIdx}>
                    {innerPerks.map((perk, perkIdx) => (
                      <RuneImage
                        key={perkIdx}
                        choosenCondition={false}
                        imgSrc={perk.iconPath}
                      />
                    ))}
                  </div>
                ))}

                {/* TODO: make separate component for those
- Add there useState or sth to store summoner spells?
*/}
                {/* {runesOpts.changeSpells ? (
                  <div id="recommended-spells-for-champion-list">
                    {data.summonerSpellIds.map((spell, idx) => {
                      const foundSpell = emits.getSummonerSpellById(
                        spell,
                        (error, data) => {
                          return <Button key={idx}>{foundSpell}</Button>;
                        }
                      );
                    })}
                  </div>
                ) : null} */}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
