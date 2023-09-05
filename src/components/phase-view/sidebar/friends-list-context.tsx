import React, { useState } from "react";
import { FriendsListData, lcuClientHandlerObj } from "@lcu";

interface CorespondingUser {
  name: string;
  pid: string;
}

interface FriendsListContext {
  friendsList: FriendsListData[];
  updateFriendsList: () => void;
  corespondingUser: CorespondingUser;
  changeCorespondingUser: (value: { name: string; pid: string }) => void;
}

export const initialFriendsListContextValue: FriendsListContext = {
  friendsList: [],
  updateFriendsList: () => {},
  corespondingUser: { name: "", pid: "" },
  changeCorespondingUser: () => {},
};

export const FriendsListContext = React.createContext<FriendsListContext>(
  initialFriendsListContextValue
);

export function FriendsListContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [friendsList, setCurrentFriendsList] = useState<FriendsListData[]>(
    initialFriendsListContextValue.friendsList
  );
  const [corespondingUser, setCorespondingUser] = useState<CorespondingUser>(
    initialFriendsListContextValue.corespondingUser
  );

  function updateFriendsList() {
    lcuClientHandlerObj
      .getCurrentFriendsList()
      .then((friendsData) => setCurrentFriendsList(friendsData))
      .catch((err) =>
        console.log(
          `Error occured while trying to get current friends list`,
          err
        )
      );
  }

  function changeCorespondingUser(value: CorespondingUser) {
    setCorespondingUser(value);
  }

  return (
    <FriendsListContext.Provider
      value={{
        corespondingUser,
        changeCorespondingUser,
        friendsList,
        updateFriendsList,
      }}
    >
      {children}
    </FriendsListContext.Provider>
  );
}
