import React, { useState } from "react";
import { AutoChampionsManage } from "./auto-champions-manage";
import { Button, TooltipCustom, useHeadContext } from "@/components";
import { AssignedPosition } from "@/shared";
import styles from "./auto-champions.module.scss";

type AssignedPositionsDataType = {
  name: AssignedPosition;
  description: string;
};
const tooltipId = `position-tooltip`;

const assignedPositions: AssignedPositionsDataType[] = [
  {
    name: "utility",
    description: "Auto pick for utility(support) champions",
  },
  { name: "middle", description: "Auto pick for middle champions" },
  { name: "top", description: "Auto pick for top champions" },
  { name: "bottom", description: "Auto pick for bottom champions" },
  { name: "jungle", description: "Auto pick for jungle champions" },
  {
    name: "other",
    description:
      "Auto pick for other (should work for custom matches / blind picks) champions ",
  },
];

export function AutoChampionPick() {
  const {
    changeClientOptions,
    options: { autoPickChamp },
  } = useHeadContext();
  const [showMoreAssignedChampions, setShowMoreAssignedChampions] =
    useState(false);
  const [currentChoosenPosition, setCurrentPositionToAdd] =
    useState<AssignedPosition>("utility");

  const [champFilter, setChampFilter] = useState<string | null>(null);

  return (
    <div className={styles.autoChampionOptionsWrapper}>
      <div className={styles.autoPickChampOptions}>
        <TooltipCustom defaultTooltipProps={{ id: tooltipId }} />
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
      <div className={styles.championsData}>
        <div> Search champion</div>
        <input
          value={champFilter || ""}
          onChange={(e) => {
            setChampFilter(e.target.value.toLowerCase());
          }}
        />
      </div>
      <div
        className={styles.championsRolesWrapper}

        // style={`${
        //   showMoreAssignedChampions
        //     ? `max-height:${getPercentFromValue(height, 80)}`
        //     : `max-height:${getPercentFromValue(height, 15)}`
        // }`}
        // TODO: show more? it can be in modal tbh or somewhere right now
      >
        <div className={styles.assignedPositionsButtonsWrapper}>
          <AssignedPossitionsButtons
            currentChoosenPosition={currentChoosenPosition}
            setCurrentPositionToAdd={setCurrentPositionToAdd}
          />
        </div>
        <div className={styles.championsForAssignedPositionsWrapper}>
          <ChampionsForAssignedPossitions
            champFilter={champFilter}
            setChampFilter={setChampFilter}
          />
        </div>
      </div>

      <div className={styles.autoChampionsManageWrapper}>
        <AutoChampionsManage
          currentChoosenPosition={currentChoosenPosition}
          champFilter={champFilter}
        />
      </div>
    </div>
  );
}

type AssignedPossitionsProps = {
  currentChoosenPosition: AssignedPosition;
  setCurrentPositionToAdd: React.Dispatch<
    React.SetStateAction<AssignedPosition>
  >;
};

function AssignedPossitionsButtons({
  currentChoosenPosition,
  setCurrentPositionToAdd,
}: AssignedPossitionsProps) {
  return assignedPositions.map((position, idx) => {
    return (
      <div
        key={idx}
        data-tooltip-id={tooltipId}
        data-tooltip-content={position.description}
        className={styles.positionButtonWrapper}
      >
        <Button
          defaultButtonType={
            currentChoosenPosition === position.name ? "success" : "secondary"
          }
          onClick={() => setCurrentPositionToAdd(position.name)}
        >
          {position.name}
        </Button>
      </div>
    );
  });
}

type ChampionsForAssignedPossitionsProps = {
  champFilter: string | null;
  setChampFilter: React.Dispatch<React.SetStateAction<string | null>>;
};

function ChampionsForAssignedPossitions({
  champFilter,
  setChampFilter,
}: ChampionsForAssignedPossitionsProps) {
  const {
    options: { autoPickChamps },
  } = useHeadContext();
  return assignedPositions.map((position, idx) => (
    <div key={idx}>
      {autoPickChamps?.[position.name].map((champ, idx) => {
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
  ));
}
