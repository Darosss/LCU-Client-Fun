import { View, Text, LineEdit, Button } from "@nodegui/react-nodegui";
import React, { useContext, useState } from "react";
import { LCUContext } from "../../../LCU/lcucontext";
import { AssignedPosition } from "../../../LCU/types";
import { getPercentFromValue } from "../../../helpers/node-gui-responsive-helpers";
import { AutoChampionChampionsList } from "./auto-champion-champions-list";

const assignedPositions: AssignedPosition[] = [
  "utility",
  "middle",
  "top",
  "bottom",
  "jungle",
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
        <Button
          id="assigned-champions-to-position-header"
          style={`${
            currentChoosenPosition === position
              ? "border:1px solid green; color:green;"
              : ""
          }`}
          text={position}
          on={{
            clicked: () => {
              setCurrentPositionToAdd(position);
            },
          }}
        />
        <View>
          {autoPickChamps?.[position].map((champ, idx) => (
            <Text
              key={idx}
              on={{
                MouseButtonPress: () => {
                  setChampFilter(champ.name);
                },
              }}
              style={`${
                champFilter && champ.name.toLowerCase().includes(champFilter)
                  ? "color:red;"
                  : ""
              }`}
            >
              {champ.name}
            </Text>
          ))}
        </View>
      </View>
    ));
  }

  return (
    <>
      <View>
        <Button
          text={`Auto champion pick: ${autoPickChamp}`}
          id={autoPickChamp ? `button-enabled` : `button-disabled`}
          on={{
            clicked: () => changeOptions({ autoPickChamp: !autoPickChamp }),
          }}
        />
        <Button
          text={`${showMoreAssignedChampions ? "Show less" : "Show more"}`}
          id="button-default"
          on={{
            clicked: () => {
              setShowMoreAssignedChampions(!showMoreAssignedChampions);
            },
          }}
        />
      </View>
      <View id="auto-champion-pick-search-wrapper">
        <Text id="button-default"> Search champion </Text>
        <LineEdit
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
