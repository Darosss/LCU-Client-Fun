"use client";

import React from "react";
import { LoggedInUserDetails } from "./logged-in-user-details";
import { FriendsListContextProvider } from "./friends-list-context";
import { FriendsList } from "./friends-list";
import styles from "./social-window.module.scss";

export function SocialWindow() {
  return (
    <div className={styles.socialWindowWrapper}>
      <div className={styles.loggedInUserManageWrapper}>
        <LoggedInUserDetails />
      </div>
      <div className={styles.friendsContentWrapper}>
        <FriendsListContextProvider>
          <FriendsList />
        </FriendsListContextProvider>
      </div>
    </div>
  );
}
