import React from "react";
import { TabItem, Tabs, View } from "@nodegui/react-nodegui";
import { FriendsList } from "./friends-list";
import { LoggedInUserDetails } from "./logged-in-user-details";
import { FriendsListContextProvider } from "./friends-list-context";

export function SocialWindow() {
  return (
    <View id="social-window-wrapper">
      <Tabs id="social-tabs">
        <TabItem title="user">
          <LoggedInUserDetails />
        </TabItem>
        <TabItem title="friends">
          <FriendsListContextProvider>
            <FriendsList />
          </FriendsListContextProvider>
        </TabItem>
      </Tabs>
    </View>
  );
}
