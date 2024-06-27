import React, { useMemo } from "react";
import { Button, useHeadContext } from "@/components";
import { useFriendsListContext } from "./friends-list-context";
import { FriendsListData } from "@/shared";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";

interface FriendMenuActionsProps {
  friend: FriendsListData;
}

export function FriendMenuActions({ friend }: FriendMenuActionsProps) {
  const { emits } = useSocketEventsContext();
  const {
    lobbyDataState: [lobbyData],
  } = useHeadContext();
  const { changeCorespondingUser } = useFriendsListContext();

  function unFriend() {
    // TODO: add remove methods etc
    console.log("Soon");
  }

  function inviteFriend() {
    emits.invitePlayerToLobby(
      [{ toSummonerId: friend.summonerId }],
      (error, data) => {
        if (error || !data)
          return toast.error(error || "Couldn't invite player(s)");
      }
    );
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
    <div id="friend-menu-wrapper">
      {showInviteButton ? (
        <Button defaultButtonType="secondary" onClick={inviteFriend}>
          invite
        </Button>
      ) : null}
      <Button
        defaultButtonType="primary"
        onClick={() =>
          changeCorespondingUser({ name: friend.name, pid: friend.pid })
        }
      >
        Message
      </Button>

      <Button defaultButtonType="danger" onClick={unFriend}>
        Unfriend
      </Button>
    </div>
  );
}
