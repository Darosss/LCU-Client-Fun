import React, { useCallback } from "react";
import { Button, useHeadContext } from "@/components";
import { useSocketEventsContext } from "@/socket";
import { PositionsPreferences } from "@/shared";
import { toast } from "react-toastify";
import styles from "./position-selector.module.scss";

type PossiblePreferences = "primary" | "secondary";

export function PositionSelector() {
  const {
    lobbyDataState: [lobbyData, setLobbyData],
  } = useHeadContext();
  const { emits } = useSocketEventsContext();

  const availablePositions = useCallback(
    (whichToChange: PossiblePreferences) => (
      <div id="possible-positions-selection">
        {Object.keys(PositionsPreferences).map((position, idx) => {
          const localMember = lobbyData?.localMember;

          return (
            <Button
              key={idx}
              defaultButtonType={
                whichToChange === "primary" &&
                localMember?.firstPositionPreference === position
                  ? "success"
                  : whichToChange === "secondary" &&
                    localMember?.secondPositionPreference === position
                  ? "info"
                  : "secondary"
              }
              onClick={() => {
                changePositionPreference(
                  //know that loop over objectkeys of PositionsPreferences
                  position as PositionsPreferences,
                  whichToChange
                );
              }}
            >
              {position}
            </Button>
          );
        })}
      </div>
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

    emits.changeRolePositionPreference(
      {
        firstPreference: newFirstPreference,
        secondPreference: newSecondPreference,
      },
      (error, data) => {
        if (error) return toast.error(error);

        setLobbyData((prevState) => prevState && { ...prevState, ...data! });
      }
    );
  }

  if (!lobbyData) return null;

  return (
    <div className={styles.positionSelectorWrapper}>
      <div>
        <Button defaultButtonType="success">{`Primary: ${lobbyData.localMember.firstPositionPreference}`}</Button>
        {availablePositions("primary")}
      </div>
      {lobbyData.localMember.firstPositionPreference !==
      PositionsPreferences.FILL ? (
        <div>
          <Button defaultButtonType="info">{`Secondary: ${lobbyData?.localMember.secondPositionPreference}`}</Button>
          {availablePositions("secondary")}
        </div>
      ) : null}
    </div>
  );
}
