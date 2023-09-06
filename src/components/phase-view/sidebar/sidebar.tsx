import React from "react";
import { TabItem, Tabs } from "@nodegui/react-nodegui";
import { Options } from "./options";
import { SocialWindow } from "./social-window";

export function Sidebar() {
  return (
    <Tabs id="sidebar">
      <TabItem title="social">
        <SocialWindow />
      </TabItem>
      <TabItem title="options">
        <Options />
      </TabItem>
    </Tabs>
  );
}
