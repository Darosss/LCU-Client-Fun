import React from "react";
import { SocialWindow } from "./social-window";
import { Options } from "./options";

export function Sidebar() {
  return (
    <div id="sidebar">
      <div title="social">
        <SocialWindow />
      </div>
      <div title="options">
        <Options />
      </div>
    </div>
  );
}
