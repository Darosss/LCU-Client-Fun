import React, { useContext } from "react";
import { View, Text, Button } from "@nodegui/react-nodegui";
import {
  AssignedPosition,
  LCUContext,
  DataDragonChampionsJsonFileData,
} from "@lcu";

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
                <Text id="button-default">{champ.name}</Text>
              </View>
              <View>
                {!isAssignedToRole ? (
                  <>
                    <Button
                      text={"Add"}
                      id="button-default"
                      on={{
                        clicked: () =>
                          addChampToRole(
                            currentChoosenPosition,
                            champ,
                            "start"
                          ),
                      }}
                    />
                    <Button
                      text={"Add End"}
                      id="button-default"
                      on={{
                        clicked: () =>
                          addChampToRole(currentChoosenPosition, champ, "end"),
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Button
                      text={"\u25b2"}
                      id="button-default"
                      on={{
                        clicked: () =>
                          moveChampInPlaces(currentChoosenPosition, champ, 1),
                      }}
                    />
                    <Button
                      text={"\u25BC"}
                      id="button-default"
                      on={{
                        clicked: () =>
                          moveChampInPlaces(currentChoosenPosition, champ, -1),
                      }}
                    />
                    <Button
                      id="button-disabled"
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
