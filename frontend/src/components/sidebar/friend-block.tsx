import React, { useState } from "react";
import { Button } from "@/components";
import { FriendMenuActions } from "./friend-menu-actions";
import { FriendsListData } from "@/shared";
import styles from "./friend-block.module.scss";

interface FriendBlockProps {
  friend: FriendsListData;
}
export function FriendBlock({ friend }: FriendBlockProps) {
  const [showFriendMenu, setShowFriendMenu] = useState(false);
  return (
    <div className={styles.friendBlockWrapper}>
      <div>
        <Button
          defaultButtonType="secondary"
          onClick={() => setShowFriendMenu(!showFriendMenu)}
        >
          {friend.name}
        </Button>
        <div>{friend.availability}</div>
      </div>
      {showFriendMenu ? (
        <div>
          <FriendMenuActions friend={friend} />
        </div>
      ) : null}
      {friend.lol.gameStatus || friend.lol.gameQueueType ? (
        <div>{`${friend.lol.gameStatus} ${friend.lol.gameQueueType}`}</div>
      ) : null}
    </div>
  );
}
