import React, { useContext, useState } from "react";
import {
  Button,
  LineEdit,
  TabItem,
  Tabs,
  Text,
  View,
} from "@nodegui/react-nodegui";
import { LCUContext } from "../../../LCU/lcucontext";
import { AutoChampionPick } from "./auto-champion-pick";

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
    <Tabs>
      <TabItem title="general">
        <View>
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
      </TabItem>
      <TabItem title="auto-accept">
        <View id="auto-champion-pick-wrapper">
          <AutoChampionPick />
        </View>
      </TabItem>
    </Tabs>
  );
}
