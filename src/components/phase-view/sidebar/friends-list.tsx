import React, { useContext, useState } from "react";
import {
  DangerButton,
  PrimaryText,
  SecondaryLineEdit,
  SuccessButton,
} from "@components";
import { View } from "@nodegui/react-nodegui";
import {
  ReceivedInvitationData,
  LCUContext,
  ManageInvitationAction,
  lcuClientHandlerObj,
  queues,
} from "@lcu";
import { FriendsListContext } from "./friends-list-context";
import { FriendBlock } from "./friend-block";
import { MessagesWindow } from "./messages-window";

export function FriendsList() {
  const { wsInitialized } = useContext(LCUContext);
  const { friendsList, updateFriendsList } = useContext(FriendsListContext);
  const [showOfflineFriends, setShowOfflineFriends] = useState(false);
  const [friendsFilter, setFriendsFilter] = useState("");
  const [currentInvitations, setCurrentInvitations] = useState<
    ReceivedInvitationData[]
  >([]);

  React.useEffect(() => {
    if (!wsInitialized) return;

    updateFriendsList();
    lcuClientHandlerObj.wsOnReceiveInvitation((invitationData) =>
      setCurrentInvitations(invitationData)
    );

    // TODO: we need to somehow get friends updates
  }, [wsInitialized]);

  function manageInvitation(
    action: ManageInvitationAction,
    invitationId: string
  ) {
    lcuClientHandlerObj
      .manageInvitation(action, invitationId)
      .catch((err) =>
        console.log(`Error occured while trying to ${action} invitation`, err)
      );
  }

  return (
    <View id="friends-list-wrapper">
      <View id="friends-list">
        <View>
          {currentInvitations
            .filter(({ state }) => state === "Pending")
            .map(({ fromSummonerName, gameConfig, invitationId }, idx) => (
              <View key={idx} id="invitation-wrapper">
                <PrimaryText text={fromSummonerName} />
                <PrimaryText
                  text={
                    queues.find(({ queueId }) => queueId === gameConfig.queueId)
                      ?.description || gameConfig.gameMode
                  }
                />
                <View>
                  <SuccessButton
                    text="+"
                    on={{
                      clicked: () => manageInvitation("accept", invitationId),
                    }}
                  />
                  <DangerButton
                    text="x"
                    on={{
                      clicked: () => manageInvitation("decline", invitationId),
                    }}
                  />
                </View>
              </View>
            ))}
          <PrimaryText text="Search" />
          <SecondaryLineEdit
            text={friendsFilter}
            on={{ textChanged: (e) => setFriendsFilter(e.toLowerCase()) }}
          />
          {!showOfflineFriends ? (
            <SuccessButton
              text="Online"
              on={{
                clicked: () => setShowOfflineFriends(true),
              }}
            />
          ) : (
            <DangerButton
              text="Offline"
              on={{
                clicked: () => setShowOfflineFriends(false),
              }}
            />
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
        </View>
      </View>
      <View id="friends-list-chat-wrapper">
        <MessagesWindow />
      </View>
    </View>
  );
}
