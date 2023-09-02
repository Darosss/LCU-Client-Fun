import React, { useCallback, useContext } from "react";
import { Button, View } from "@nodegui/react-nodegui";
import { lcuClientHandlerObj, PositionsPreferences, LCUContext } from "@lcu";

type PossiblePreferences = "primary" | "secondary";

export function PositionSelector() {
  const { lobbyData } = useContext(LCUContext);

  const availablePositions = useCallback(
    (whichToChange: PossiblePreferences) => (
      <View id="possible-positions-selection">
        {Object.keys(PositionsPreferences).map((position, idx) => (
          <Button
            key={idx}
            on={{
              clicked: () => {
                console.log(position, whichToChange, "KURWA");
                changePositionPreference(
                  //know that loop over objectkeys of PositionsPreferences
                  position as PositionsPreferences,
                  whichToChange
                );
              },
            }}
          >
            {position}
          </Button>
        ))}
      </View>
    ),
    [lobbyData]
  );

  function changePositionPreference(
    preference: PositionsPreferences,
    whichToChange: PossiblePreferences
  ) {
    if (!lobbyData) return;

    //TODO: refactor later this function
    let newFirstPreference = lobbyData.localMember.firstPositionPreference;
    let newSecondPreference = lobbyData.localMember.secondPositionPreference;
    switch (whichToChange) {
      case "primary":
        if (preference === PositionsPreferences.FILL) {
          newFirstPreference = preference;
          newSecondPreference = PositionsPreferences.UNSELECTED;
        } else if (preference !== newSecondPreference) {
          newFirstPreference = preference;
        } else {
          const tempFirstPreference = newFirstPreference;
          newFirstPreference = newSecondPreference;
          newSecondPreference = tempFirstPreference;
        }
        break;
      case "secondary":
        if (preference !== newFirstPreference) {
          newSecondPreference = preference;
        } else {
          const tempSecondPreference = newSecondPreference;
          newSecondPreference = newFirstPreference;
          newFirstPreference = tempSecondPreference;
        }
        break;
    }

    lcuClientHandlerObj
      .changePositionPreferences({
        firstPreference: newFirstPreference,
        secondPreference: newSecondPreference,
      })
      .catch((err) =>
        console.log(
          `Error occured while trying to switch prefered position in lobby`,
          err
        )
      );
  }

  if (!lobbyData) return null;

  return (
    <View id="position-selector">
      <View>
        <Button
          text={`Primary: ${lobbyData.localMember.firstPositionPreference}`}
        />
        {availablePositions("primary")}
      </View>
      {lobbyData.localMember.firstPositionPreference !==
      PositionsPreferences.FILL ? (
        <View>
          <Button
            text={`Secondary: ${lobbyData?.localMember.secondPositionPreference}`}
          />
          {availablePositions("secondary")}
        </View>
      ) : null}
    </View>
  );
}
