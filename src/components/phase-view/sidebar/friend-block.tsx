import React, { useState } from "react";
import { PrimaryText, SecondaryButton } from "@components";
import { FriendsListData } from "@lcu";
import { View } from "@nodegui/react-nodegui";
import { FriendMenuActions } from "./friend-menu-actions";

interface FriendBlockProps {
  friend: FriendsListData;
}
export function FriendBlock({ friend }: FriendBlockProps) {
  const [showFriendMenu, setShowFriendMenu] = useState(false);

  return (
    <View id="friend-block-wrapper">
      <SecondaryButton
        text={friend.name}
        on={{ clicked: () => setShowFriendMenu(!showFriendMenu) }}
      />
      {showFriendMenu ? <FriendMenuActions friend={friend} /> : null}
      <PrimaryText text={friend.availability} />
    </View>
  );
}
