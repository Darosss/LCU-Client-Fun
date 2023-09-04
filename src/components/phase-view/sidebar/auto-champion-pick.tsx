import React, { useContext, useState } from "react";
import { View } from "@nodegui/react-nodegui";
import { LCUContext, AssignedPosition } from "@lcu";
import { getPercentFromValue } from "@helpers";
import { AutoChampionChampionsList } from "./auto-champion-champions-list";
import {
  DangerButton,
  DangerText,
  PrimaryButton,
  PrimaryLineEdit,
  PrimaryText,
  SecondaryButton,
  SuccessButton,
  SuccessText,
} from "@components";

const assignedPositions: AssignedPosition[] = [
  "utility",
  "middle",
  "top",
  "bottom",
  "jungle",
  "other",
];

export function AutoChampionPick() {
  const {
    changeOptions,
    options: {
      autoPickChamps,
      minSize: { height },
      autoPickChamp,
    },
  } = useContext(LCUContext);
  const [showMoreAssignedChampions, setShowMoreAssignedChampions] =
    useState(false);
  const [currentChoosenPosition, setCurrentPositionToAdd] =
    useState<AssignedPosition>("utility");

  const [champFilter, setChampFilter] = useState<string | null>(null);

  function showAssignedChampionsToPositions() {
    return assignedPositions.map((position, idx) => (
      <View id="assigned-champions-to-position" key={idx}>
        {currentChoosenPosition === position ? (
          <PrimaryButton
            text={position}
            on={{
              clicked: () => {
                setCurrentPositionToAdd(position);
              },
            }}
          />
        ) : (
          <SecondaryButton
            text={position}
            on={{
              clicked: () => {
                setCurrentPositionToAdd(position);
              },
            }}
          />
        )}

        <View>
          {autoPickChamps?.[position].map((champ, idx) =>
            champFilter && champ.name.toLowerCase().includes(champFilter) ? (
              <SuccessText key={idx} text={champ.name} />
            ) : (
              <PrimaryText
                key={idx}
                on={{
                  MouseButtonPress: () => {
                    setChampFilter(champ.name);
                  },
                }}
                text={champ.name}
              />
            )
          )}
        </View>
      </View>
    ));
  }

  return (
    <>
      <View>
        {autoPickChamp ? (
          <SuccessButton
            text={`Auto champion pick: ${autoPickChamp}`}
            on={{
              clicked: () => changeOptions({ autoPickChamp: !autoPickChamp }),
            }}
          />
        ) : (
          <DangerButton
            text={`Auto champion pick: ${autoPickChamp}`}
            on={{
              clicked: () => changeOptions({ autoPickChamp: !autoPickChamp }),
            }}
          />
        )}
        {showMoreAssignedChampions ? (
          <PrimaryButton
            text={"Show less"}
            on={{
              clicked: () =>
                setShowMoreAssignedChampions(!showMoreAssignedChampions),
            }}
          />
        ) : (
          <PrimaryButton
            text={"Show more"}
            on={{
              clicked: () =>
                setShowMoreAssignedChampions(!showMoreAssignedChampions),
            }}
          />
        )}
      </View>
      <View id="auto-champion-pick-search-wrapper">
        <PrimaryText text=" Search champion" />
        <PrimaryLineEdit
          text={champFilter || ""}
          on={{
            textChanged: (e) => setChampFilter(e.toLowerCase()),
          }}
        />
      </View>
      <View
        id="auto-champion-roles-wrapper"
        style={`${
          showMoreAssignedChampions
            ? `max-height:${getPercentFromValue(height, 80)}`
            : `max-height:${getPercentFromValue(height, 15)}`
        }`}
      >
        {showAssignedChampionsToPositions()}
      </View>

      <AutoChampionChampionsList
        currentChoosenPosition={currentChoosenPosition}
        champFilter={champFilter}
      />
    </>
  );
}
