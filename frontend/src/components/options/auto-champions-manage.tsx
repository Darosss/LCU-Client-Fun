import React from "react";

import { Button, useHeadContext } from "@/components";
import { AssignedPosition, DataDragonChampionsJsonFileData } from "@/shared";
import styles from "./auto-champions-manage.module.scss";

interface AutoChampionChampionsListProps {
  currentChoosenPosition: AssignedPosition;
  champFilter: string | null;
}

export function AutoChampionsManage({
  currentChoosenPosition,
  champFilter,
}: AutoChampionChampionsListProps) {
  const {
    changeClientOptions,
    options: { autoPickChamps },
    championsData,
  } = useHeadContext();

  function addChampToRole(
    position: AssignedPosition,
    champion: DataDragonChampionsJsonFileData,
    where: "start" | "end"
  ) {
    const updatedChamps = autoPickChamps;
    switch (where) {
      case "start":
        updatedChamps[position].unshift(champion);
        break;
      case "end":
        updatedChamps[position].push(champion);
        break;
    }
    changeClientOptions({ autoPickChamps: updatedChamps });
  }

  function removeChampFromPosition(
    position: AssignedPosition,
    champion: DataDragonChampionsJsonFileData
  ) {
    const updatedChamps = autoPickChamps;
    updatedChamps[position].filter((c) => c.id !== champion.id);
    updatedChamps[position] = updatedChamps[position].filter(
      (c) => c.id !== champion.id
    );

    changeClientOptions({ autoPickChamps: updatedChamps });
  }

  function moveChampInPlaces(
    position: AssignedPosition,
    champion: DataDragonChampionsJsonFileData,
    move: -1 | 1
  ) {
    const currentChamps = autoPickChamps[position];

    const champIndex = currentChamps.findIndex(
      (champ) => champ.id === champion.id
    );

    if (champIndex !== -1) {
      let newIndex = champIndex + move;

      if (newIndex < 0) {
        newIndex = currentChamps.length - 1;
      } else if (newIndex >= currentChamps.length) {
        newIndex = 0;
      }

      currentChamps.splice(champIndex, 1);

      currentChamps.splice(newIndex, 0, champion);

      changeClientOptions({ autoPickChamps: autoPickChamps });
    }
  }

  return (
    <div className={styles.autoChampionsManageWrapper}>
      {championsData
        .filter(({ name }) => {
          if (champFilter)
            return name.toLowerCase().includes(champFilter.toLowerCase());
        })
        .map((champ, idx) => {
          const isAssignedToRole = autoPickChamps[currentChoosenPosition]?.some(
            ({ id }) => id === champ.id
          );

          return (
            <div key={idx} className={styles.manageChampionWrapper}>
              <div>{champ.name}</div>
              <div>
                {!isAssignedToRole ? (
                  <>
                    <Button
                      defaultButtonType="primary"
                      onClick={() => {
                        addChampToRole(currentChoosenPosition, champ, "start");
                      }}
                    >
                      Add
                    </Button>
                    <Button
                      defaultButtonType="primary"
                      onClick={() => {
                        addChampToRole(currentChoosenPosition, champ, "end");
                      }}
                    >
                      Add end
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      defaultButtonType="primary"
                      onClick={() =>
                        moveChampInPlaces(currentChoosenPosition, champ, 1)
                      }
                    >
                      {"\u25BC"}
                    </Button>
                    <Button
                      defaultButtonType="primary"
                      onClick={() =>
                        moveChampInPlaces(currentChoosenPosition, champ, -1)
                      }
                    >
                      {"\u25b2"}
                    </Button>
                    <Button
                      defaultButtonType="danger"
                      onClick={() =>
                        removeChampFromPosition(currentChoosenPosition, champ)
                      }
                    >
                      X
                    </Button>
                  </>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}
