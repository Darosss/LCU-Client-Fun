import { TabItem, Tabs, Text } from "@nodegui/react-nodegui";
import React, { useContext } from "react";
import { Options } from "./options";
import { LCUContext } from "../../../LCU/lcucontext";
import { sidebarStylsheet } from "./stylesheet";

export function Sidebar() {
  const {
    options: {
      minSize: { height, width },
    },
  } = useContext(LCUContext);
  return (
    <Tabs styleSheet={sidebarStylsheet(width, height)} id="sidebar">
      <TabItem title="friends">
        <Text> Friends</Text>
      </TabItem>
      <TabItem title="options">
        <Options />
      </TabItem>
    </Tabs>
  );
}
