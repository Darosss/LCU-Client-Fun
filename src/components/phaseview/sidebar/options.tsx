import React, { useContext, useState } from "react";
import { Button, LineEdit, Text, View } from "@nodegui/react-nodegui";
import { LCUContext } from "../../../LCU/lcucontext";

export function Options() {
  const {
    options: { autoAccept, minSize },
    changeOptions,
  } = useContext(LCUContext);
  const [localSizesWindow, setLocalSizesWindow] = useState<{
    width: number;
    height: number;
  }>({ width: minSize.width, height: minSize.height });
  return (
    <View id="sidebar-options">
      <Button
        id={autoAccept ? `button-enabled` : `button-disabled`}
        text={`Auto accept:  ${autoAccept}`}
        on={{
          clicked: () => changeOptions({ autoAccept: !autoAccept }),
        }}
      ></Button>
      <View>
        <Text>Client width:</Text>
        <LineEdit
          text={`${localSizesWindow.width}`}
          on={{
            textChanged: (value) => {
              if (isNaN(Number(value))) return;
              setLocalSizesWindow((prevState) => ({
                ...prevState,
                width: Number(value),
              }));
            },
          }}
        />
        <Text>Client height:</Text>
        <LineEdit
          text={`${localSizesWindow.height}`}
          on={{
            textChanged: (value) => {
              if (isNaN(Number(value))) return;
              setLocalSizesWindow((prevState) => ({
                ...prevState,
                height: Number(value),
              }));
            },
          }}
        />
        <Button
          on={{
            clicked: () => {
              changeOptions({ minSize: localSizesWindow });
            },
          }}
          id="button-default"
          text="Apply"
        />
      </View>
    </View>
  );
}
