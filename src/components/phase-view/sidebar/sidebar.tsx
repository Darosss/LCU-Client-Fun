import React from "react";
import { TabItem, Tabs } from "@nodegui/react-nodegui";
import { Options } from "./options";
import { PrimaryText } from "@components";

export function Sidebar() {
  return (
    <Tabs id="sidebar">
      <TabItem title="friends">
        <PrimaryText text="Friends" />
      </TabItem>
      <TabItem title="options">
        <Options />
      </TabItem>
    </Tabs>
  );
}
