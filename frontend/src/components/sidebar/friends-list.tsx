import React, { useState } from "react";
import { Button, useHeadContext } from "@/components";
import { FriendBlock } from "./friend-block";
import { MessagesWindow } from "./messages-window";
import { useFriendsListContext } from "./friends-list-context";
import { ManageInvitationAction, ReceivedInvitationData } from "@/shared";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";

export function FriendsList() {
  const { events, emits } = useSocketEventsContext();
  const { queuesData } = useHeadContext();
  const { friendsList, updateFriendsList } = useFriendsListContext();
  const [showOfflineFriends, setShowOfflineFriends] = useState(false);
  const [friendsFilter, setFriendsFilter] = useState("");
  const [currentInvitations, setCurrentInvitations] = useState<
    ReceivedInvitationData[]
  >([]);

  React.useEffect(() => {
    events.receivedInvitation.on((data) => {
      if (!data) return;
      setCurrentInvitations(data);
    });

    // TODO: Need to somehow get friends updates

    return () => {
      events.receivedInvitation.off();
    };
  }, [events]);

  function manageInvitation(
    action: ManageInvitationAction,
    invitationId: string
  ) {
    emits.manageInvitationToLobby({ action, invitationId }, (error, data) => {
      if (error || !data) return toast.error(error);
    });
  }

  return (
    <div id="friends-list-wrapper">
      <div id="friends-list">
        <div>
          {currentInvitations
            .filter(({ state }) => state === "Pending")
            .map(({ fromSummonerName, gameConfig, invitationId }, idx) => (
              <div key={idx} id="invitation-wrapper">
                <div>{fromSummonerName}</div>
                <div>
                  {queuesData.find(
                    ({ queueId }) => queueId === gameConfig.queueId
                  )?.description || gameConfig.gameMode}
                </div>
                <div>
                  <Button
                    defaultButtonType="success"
                    onClick={() => manageInvitation("accept", invitationId)}
                  >
                    +
                  </Button>
                  <Button
                    defaultButtonType="success"
                    onClick={() => manageInvitation("decline", invitationId)}
                  >
                    x
                  </Button>
                </div>
              </div>
            ))}
          <div>Search: </div>
          <input
            onChange={(e) => {
              setFriendsFilter(e.target.value.toLowerCase());
            }}
            value={friendsFilter}
          />
          <Button defaultButtonType="info" onClick={updateFriendsList}>
            Refresh friends
          </Button>
          {!showOfflineFriends ? (
            <Button
              defaultButtonType="primary"
              onClick={() => setShowOfflineFriends(true)}
            >
              Online
            </Button>
          ) : (
            <Button
              defaultButtonType="danger"
              onClick={() => setShowOfflineFriends(false)}
            >
              Offline
            </Button>
          )}
          {friendsList
            .filter(({ availability, name }) =>
              friendsFilter
                ? name.toLowerCase().includes(friendsFilter)
                : showOfflineFriends
                ? availability === "offline"
                : availability !== "offline"
            )
            .map((friend, idx) => (
              <FriendBlock friend={friend} key={idx} />
            ))}
        </div>
      </div>
      <div id="friends-list-chat-wrapper">
        <MessagesWindow />
      </div>
    </div>
  );
}
