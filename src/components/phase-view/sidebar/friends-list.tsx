import React, { useContext, useState } from "react";
import {
  DangerButton,
  InfoButton,
  PrimaryText,
  SecondaryLineEdit,
  SuccessButton,
} from "@components";
import { View } from "@nodegui/react-nodegui";
import {
  ReceivedInvitationData,
  LCUContext,
  ManageInvitationAction,
  queues,
} from "@lcu";
import { FriendsListContext } from "./friends-list-context";
import { FriendBlock } from "./friend-block";
import { MessagesWindow } from "./messages-window";

export function FriendsList() {
  const { lobbyLCUHandler } = useContext(LCUContext);
  const { friendsList, updateFriendsList } = useContext(FriendsListContext);
  const [showOfflineFriends, setShowOfflineFriends] = useState(false);
  const [friendsFilter, setFriendsFilter] = useState("");
  const [currentInvitations, setCurrentInvitations] = useState<
    ReceivedInvitationData[]
  >([]);

  React.useEffect(() => {
    lobbyLCUHandler?.wsOnReceiveInvitation((err, invitationData) => {
      if (err || !invitationData) return;
      setCurrentInvitations(invitationData);
    });

    // TODO: we need to somehow get friends updates

    return () => {
      lobbyLCUHandler?.unsubsribeOnReceiveInvitation();
    };
  }, [lobbyLCUHandler]);

  function manageInvitation(
    action: ManageInvitationAction,
    invitationId: string
  ) {
    lobbyLCUHandler
      ?.manageInvitation({ action, invitationId })
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
          <InfoButton
            text="Refresh"
            on={{ clicked: () => updateFriendsList() }}
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
