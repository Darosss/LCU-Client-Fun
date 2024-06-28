import React, { useState } from "react";
import { AutoChampionsManage } from "./auto-champions-manage";
import { Button, useHeadContext } from "@/components";
import { AssignedPosition } from "@/shared";
import styles from "./auto-champions.module.scss";

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
  return assignedPositions.map((position, idx) => (
    <React.Fragment key={idx}>
      <Button
        defaultButtonType={
          currentChoosenPosition === position ? "primary" : "secondary"
        }
        onClick={() => setCurrentPositionToAdd(position)}
      >
        {position}
      </Button>
    </React.Fragment>
  ));
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
  ));
}
