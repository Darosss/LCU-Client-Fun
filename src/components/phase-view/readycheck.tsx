import React, { useContext, useState } from "react";
import { useEventHandler, View } from "@nodegui/react-nodegui";
import { QPushButtonSignals } from "@nodegui/nodegui";
import { lcuClientHandlerObj, LCUContext } from "@lcu";
import {
  DangerButton,
  DangerText,
  SuccessButton,
  SuccessText,
} from "@components";

type ReadyCheckState = "Accepted" | "Declined" | "None";

export function ReadyCheck() {
  const {
    options: { autoAccept },
  } = useContext(LCUContext);
  const [readyCheckState, setReadyCheckState] =
    useState<ReadyCheckState>("None");
  const acceptMatchBtnHandler = useEventHandler<QPushButtonSignals>(
    {
      clicked: () => {
        lcuClientHandlerObj
          .acceptMatch()
          .then(() => {
            setReadyCheckState("Accepted");
          })
          .catch((err) => {
            setReadyCheckState("None");
            console.log("Error occured while accepting the match", err);
          });
      },
    },
    []
  );
  const declineMatchBtnHandler = useEventHandler<QPushButtonSignals>(
    {
      clicked: () => {
        lcuClientHandlerObj
          .declineMatch()
          .then(() => {
            setReadyCheckState("Declined");
          })
          .catch((err) =>
            console.log("Error occured while accepting the match", err)
          );
      },
    },
    []
  );

  function ReadyCheckActions() {
    switch (readyCheckState) {
      case "Accepted":
        return <SuccessText text="Accepted" />;

      case "Declined":
        return <DangerText text="Declined" />;
      case "None":
        return (
          <>
            <SuccessButton on={acceptMatchBtnHandler} text="Accept" />
            <DangerButton on={declineMatchBtnHandler} text="Decline" />
          </>
        );
    }
  }

  if (autoAccept) {
    lcuClientHandlerObj
      .acceptMatch()
      .then(() => {
        setReadyCheckState("Accepted");
      })
      .catch(() => {
        setReadyCheckState("None");
      });
  }
  return (
    <View>
      <ReadyCheckActions />
    </View>
  );
}
