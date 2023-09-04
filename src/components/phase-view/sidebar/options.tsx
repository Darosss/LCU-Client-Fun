import React, { useContext, useState } from "react";
import { TabItem, Tabs, View } from "@nodegui/react-nodegui";
import { LCUContext } from "@lcu";
import { AutoChampionPick } from "./auto-champion-pick";
import {
  DangerButton,
  InfoText,
  PrimaryLineEdit,
  SuccessButton,
} from "@components";

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
        <View id="general-options-wrapper">
          {autoAccept ? (
            <SuccessButton
              text={`Auto accept:  ${autoAccept}`}
              on={{
                clicked: () => changeOptions({ autoAccept: !autoAccept }),
              }}
            />
          ) : (
            <DangerButton
              text={`Auto accept:  ${autoAccept}`}
              on={{
                clicked: () => changeOptions({ autoAccept: !autoAccept }),
              }}
            />
          )}

          <View>
            <InfoText text="Client width:" />
            <PrimaryLineEdit
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
            <InfoText text="Client height:" />
            <PrimaryLineEdit
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
            <SuccessButton
              on={{
                clicked: () => {
                  changeOptions({ minSize: localSizesWindow });
                },
              }}
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
