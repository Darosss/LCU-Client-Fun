"use client";

import React from "react";
import { LoggedInUserDetails } from "./logged-in-user-details";
import { FriendsListContextProvider } from "./friends-list-context";
import { FriendsList } from "./friends-list";

export function SocialWindow() {
  return (
    <div id="social-window-wrapper">
      <div id="social-tabs">
        <div title="user">
          <LoggedInUserDetails />
        </div>
        <div title="friends">
          <FriendsListContextProvider>
            <FriendsList />
          </FriendsListContextProvider>
        </div>
      </div>
    </div>
  );
}
