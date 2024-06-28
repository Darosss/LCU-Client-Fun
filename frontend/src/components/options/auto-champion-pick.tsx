import React, { useState } from "react";
import { AutoChampionChampionsList } from "./auto-champion-champions-list";
import { Button, useHeadContext } from "@/components";
import { AssignedPosition } from "@/shared";

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
    changeClientOptions,
    options: { autoPickChamps, autoPickChamp },
  } = useHeadContext();
  const [showMoreAssignedChampions, setShowMoreAssignedChampions] =
    useState(false);
  const [currentChoosenPosition, setCurrentPositionToAdd] =
    useState<AssignedPosition>("utility");

  const [champFilter, setChampFilter] = useState<string | null>(null);

  function showAssignedChampionsToPositions() {
    return assignedPositions.map((position, idx) => (
      <div id="assigned-champions-to-position" key={idx}>
        <Button
          defaultButtonType={
            currentChoosenPosition === position ? "primary" : "secondary"
          }
          onClick={() => setCurrentPositionToAdd(position)}
        >
          {position}
        </Button>

        <div>
          {autoPickChamps?.[position].map((champ, idx) => {
            const isAlreadyAdded =
              champFilter &&
              champ.name.toLowerCase().includes(champFilter.toLowerCase());

            return (
              <Button
                key={idx}
                defaultButtonType={isAlreadyAdded ? "success" : "primary"}
                onClick={() =>
                  !isAlreadyAdded ? setChampFilter(champ.name) : null
                }
              >
                {champ.name}
              </Button>
            );
          })}
        </div>
      </div>
    ));
  }

  return (
    <>
      <div>
        <Button
          defaultButtonType={autoPickChamp ? "success" : "danger"}
          onClick={() => changeClientOptions({ autoPickChamp: !autoPickChamp })}
        >
          {`Auto champion pick: ${autoPickChamp}`}
        </Button>

        <Button
          defaultButtonType={showMoreAssignedChampions ? "primary" : "danger"}
          onClick={() =>
            setShowMoreAssignedChampions(!showMoreAssignedChampions)
          }
        >
          Show {showMoreAssignedChampions ? "less" : "more"}
        </Button>
      </div>
      <div id="auto-champion-pick-search-wrapper">
        <div> Search champion</div>
        <input
          value={champFilter || ""}
          onChange={(e) => {
            setChampFilter(e.target.value.toLowerCase());
          }}
        />
      </div>
      <div
        id="auto-champion-roles-wrapper"
        // style={`${
        //   showMoreAssignedChampions
        //     ? `max-height:${getPercentFromValue(height, 80)}`
        //     : `max-height:${getPercentFromValue(height, 15)}`
        // }`}
        // TODO: show more? it can be in modal tbh or somewhere right now
      >
        {showAssignedChampionsToPositions()}
      </div>

      <AutoChampionChampionsList
        currentChoosenPosition={currentChoosenPosition}
        champFilter={champFilter}
      />
    </>
  );
}
