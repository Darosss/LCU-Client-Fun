import React, { useContext } from "react";
import { View } from "@nodegui/react-nodegui";
import {
  AssignedPosition,
  LCUContext,
  DataDragonChampionsJsonFileData,
} from "@lcu";
import { DangerButton, PrimaryText, SuccessButton } from "@components";

interface AutoChampionChampionsListProps {
  currentChoosenPosition: AssignedPosition;
  champFilter: string | null;
}

export function AutoChampionChampionsList({
  currentChoosenPosition,
  champFilter,
}: AutoChampionChampionsListProps) {
  const {
    changeOptions,
    options: { autoPickChamps },
    lolDataDragon: { dataDragonChampions },
  } = useContext(LCUContext);

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
    changeOptions({ autoPickChamps: updatedChamps });
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

    changeOptions({ autoPickChamps: updatedChamps });
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

      changeOptions({ autoPickChamps: autoPickChamps });
    }
  }

  return (
    <View id="auto-champion-pick-all-champions">
      {dataDragonChampions
        .filter(({ name }) => {
          if (champFilter)
            return name.toLowerCase().includes(champFilter.toLowerCase());
        })
        .map((champ, idx) => {
          const isAssignedToRole = autoPickChamps[currentChoosenPosition]?.some(
            ({ id }) => id === champ.id
          );

          return (
            <View key={idx} id="auto-champion-actions">
              <View>
                <PrimaryText text={champ.name} />
              </View>
              <View>
                {!isAssignedToRole ? (
                  <>
                    <SuccessButton
                      text={"Add"}
                      on={{
                        clicked: () =>
                          addChampToRole(
                            currentChoosenPosition,
                            champ,
                            "start"
                          ),
                      }}
                    />
                    <SuccessButton
                      text={"Add End"}
                      on={{
                        clicked: () =>
                          addChampToRole(currentChoosenPosition, champ, "end"),
                      }}
                    />
                  </>
                ) : (
                  <>
                    <SuccessButton
                      text={"\u25BC"}
                      on={{
                        clicked: () =>
                          moveChampInPlaces(currentChoosenPosition, champ, 1),
                      }}
                    />
                    <SuccessButton
                      text={"\u25b2"}
                      on={{
                        clicked: () =>
                          moveChampInPlaces(currentChoosenPosition, champ, -1),
                      }}
                    />
                    <DangerButton
                      text="X"
                      on={{
                        clicked: () =>
                          removeChampFromPosition(
                            currentChoosenPosition,
                            champ
                          ),
                      }}
                    />
                  </>
                )}
              </View>
            </View>
          );
        })}
    </View>
  );
}
