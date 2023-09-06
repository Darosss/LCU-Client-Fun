import React, { useContext, useMemo } from "react";
import { FriendsListData, LCUContext, lcuClientHandlerObj } from "@lcu";
import { View } from "@nodegui/react-nodegui";
import { SuccessButton, PrimaryButton, DangerButton } from "@components";
import { FriendsListContext } from "./friends-list-context";

interface FriendMenuActionsProps {
  friend: FriendsListData;
}

export function FriendMenuActions({ friend }: FriendMenuActionsProps) {
  const { lobbyData } = useContext(LCUContext);
  const { changeCorespondingUser } = useContext(FriendsListContext);

  function unFriend() {
    // TODO: add remove methods etc
    console.log("Soon");
  }

  function inviteFriend() {
    lcuClientHandlerObj.invitePlayerToLobby([
      { toSummonerId: friend.summonerId },
    ]);
  }

  const showInviteButton = useMemo(() => {
    // local member can allow invite others
    // friend is not do not disturb or offline
    // friend isn't already invited or did accept
    return (
      lobbyData?.localMember.allowedInviteOthers &&
      friend.availability !== "dnd" &&
      friend.availability !== "offline" &&
      !lobbyData.invitations.find(
        (invitation) =>
          invitation.toSummonerName.toLowerCase() ===
            friend.name.toLowerCase() &&
          (invitation.state === "Pending" || invitation.state === "Accepted")
      )
    );
  }, [lobbyData]);

  return (
    <View id="friend-menu-wrapper">
      {showInviteButton ? (
        <SuccessButton text="Invite" on={{ clicked: () => inviteFriend() }} />
      ) : null}
      <PrimaryButton
        text="Message"
        on={{
          clicked: () =>
            changeCorespondingUser({ name: friend.name, pid: friend.pid }),
        }}
      />

      <DangerButton text="Unfriend" on={{ clicked: () => unFriend() }} />
    </View>
  );
}
