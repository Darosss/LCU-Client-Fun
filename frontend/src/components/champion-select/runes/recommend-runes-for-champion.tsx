import React, { useEffect, useMemo, useState } from "react";

import { Button, useHeadContext } from "@/components";
import { useChampionSelectContext } from "../champion-select-context";
import { RuneImage } from "../../runes/rune-image";
import { useSocketEventsContext } from "@/socket";
import {
  AssignedPosition,
  RecommendedRunesData,
  RuneSlotType,
  RunesData,
  SelectedPerkIds,
} from "@/shared";
import { toast } from "react-toastify";
import { useRunesContext } from "../../runes/runes-context";
import styles from "./recommended-runes-for-champion.module.scss";

const possiblePossitions: Set<AssignedPosition> = new Set([
  "bottom",
  "jungle",
  "middle",
  "other",
  "top",
  "utility",
]);

interface RecomenedRunesForChampionProps {}
export function RecommenedRunesForChampion({}: RecomenedRunesForChampionProps) {
  const [show, setShow] = useState(false);
  const { emits } = useSocketEventsContext();
  const {
    lobbyDataState: [lobbyData],
    options: { runes: runesOpts },
    changeClientOptions,
  } = useHeadContext();
  const {
    summonersData,
    champSelectSessionData: { localPlayerCellId },
  } = useChampionSelectContext();

  const { emitSetCurrentRunePage } = useRunesContext();

  const [recommendedRunesData, setRecommendedRunesData] = useState<
    RecommendedRunesData[]
  >([]);

  const [overrodePositionForRunes, setOverrodePositionForRunes] =
    useState<AssignedPosition | null>(null);

  function handleOnClickRecommendedRunes() {
    console.log("ee");
    if (!lobbyData || !summonersData || !show) return;
    console.log("aa");
    //99% it will be defined. <- assertion!
    const localSummonerData = summonersData.get(String(localPlayerCellId))!;
    console.log(
      overrodePositionForRunes?.toUpperCase() ||
        localSummonerData.assignedPosition.toUpperCase() ||
        "NONE"
    );
    emits.getRecommendedPagesByChampIdPositionAndMapId(
      {
        champId: localSummonerData.championId,
        mapId: lobbyData.gameConfig.mapId,
        position:
          overrodePositionForRunes?.toUpperCase() ||
          localSummonerData.assignedPosition.toUpperCase() ||
          "NONE",
      },
      (error, data) => {
        if (error || !data)
          return toast.error(error || "Couldn't get recommended rune pages");

        setRecommendedRunesData(data);
      }
    );
  }

  function handleOnClickChangeSpells() {
    changeClientOptions({
      runes: { ...runesOpts, changeSpells: !runesOpts.changeSpells },
    });
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
      }
    );

    if (runesOpts.changeSpells) {
      emits.changeSummonerSpells(
        { spell1Id: spell1, spell2Id: spell2 },
        (error, data) => {
          if (error || !data)
            return toast.error(error || "Couldn't set summoner spells");
        }
      );
    }
  }

  useEffect(() => {
    if (!show || overrodePositionForRunes === null) return;

    handleOnClickRecommendedRunes();
  }, [overrodePositionForRunes, show]);

  const chosenChampionName = useMemo(
    () => summonersData.get(String(localPlayerCellId))?.championName,
    [localPlayerCellId, summonersData]
  );
  return (
    <div
      className={`${styles.recommendedRunesForChampiionWrapper}
    ${show ? styles.show : ""}
    `}
    >
      <div className={styles.actions}>
        {chosenChampionName ? (
          <>
            <Button
              defaultButtonType={show ? "danger" : "primary"}
              onClick={() => {
                setShow(!show);
                handleOnClickRecommendedRunes();
              }}
            >
              {show ? "X" : `Recommended runes for ${chosenChampionName}`}
            </Button>
            <div className={styles.changeRunesPositionWrapper}>
              {[...possiblePossitions].map((position, idx) => (
                <Button
                  key={idx}
                  defaultButtonType={
                    overrodePositionForRunes === position
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => setOverrodePositionForRunes(position)}
                >
                  {position.toUpperCase()}
                </Button>
              ))}
            </div>
          </>
        ) : null}
        {show ? (
          <Button
            defaultButtonType={runesOpts.changeSpells ? "success" : "danger"}
            onClick={handleOnClickChangeSpells}
          >
            ChangeSpells: {`${runesOpts.changeSpells}`}
          </Button>
        ) : null}
      </div>

      {show ? (
        <div className={styles.runesChoiceWrapper}>
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
                className={styles.runesRecommenedWrapper}
                onClick={() => handleOnClickRecommendedRunePage(data)}
              >
                <div className={styles.recommendedName}>
                  <h4>
                    {data.keystone.recommendationDescriptor} {data.position}
                  </h4>
                </div>
                <div className={styles.runesKeystonesWrapper}>
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
                </div>

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
