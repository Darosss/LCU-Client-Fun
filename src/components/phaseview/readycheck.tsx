import { useEventHandler, Button, View, Text } from "@nodegui/react-nodegui";
import { QPushButtonSignals } from "@nodegui/nodegui";

import React, { useContext, useState } from "react";
import { lcuClientHandlerObj } from "../../LCU/LCUClientHandler";
import {
  defaultTextStyle,
  backgroundLinearGradient,
  defaultButton,
} from "../styles";
import { LCUContext } from "../../LCU/lcucontext";

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

  console.log(readyCheckState, "dziwka jestem");
  function ReadyCheckActions() {
    switch (readyCheckState) {
      case "Accepted":
        return <Text style={defaultTextStyle}> Accepted</Text>;

      case "Declined":
        return <Text style={defaultTextStyle}> Declined</Text>;
      case "None":
        return (
          <>
            <Button style={acceptBtn} on={acceptMatchBtnHandler}>
              Accept
            </Button>
            <Button style={declineBtn} on={declineMatchBtnHandler}>
              Decline
            </Button>
          </>
        );
    }
  }

  if (autoAccept) {
    lcuClientHandlerObj
      .acceptMatch()
      .then(() => {
        return <Text style={defaultTextStyle}> Auto accepted </Text>;
      })
      .catch(() => {
        return (
          <View>
            <ReadyCheckActions />
          </View>
        );
      });
  }
  return (
    <View>
      <ReadyCheckActions />
    </View>
  );
}

const acceptBtn = `
${backgroundLinearGradient("rgba(25,0,36,0.6)", "rgba(32,52,136,0.7)")}
${defaultButton}
`;

const declineBtn = `
${backgroundLinearGradient("rgba(25,0,36,0.6)", "rgba(244,52,136,0.7)")}
${defaultButton}
`;