import React, { useState } from "react";
import { SecondaryButton, SecondaryText } from "@components";
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
      <View>
        <SecondaryButton
          text={friend.name}
          on={{ clicked: () => setShowFriendMenu(!showFriendMenu) }}
        />
        <SecondaryText text={friend.availability} />
      </View>
      {showFriendMenu ? (
        <View>
          <FriendMenuActions friend={friend} />
        </View>
      ) : null}
      {friend.lol.gameStatus || friend.lol.gameQueueType ? (
        <View>
          <SecondaryText
            text={`${friend.lol.gameStatus} ${friend.lol.gameQueueType}`}
          />
        </View>
      ) : null}
    </View>
  );
}
