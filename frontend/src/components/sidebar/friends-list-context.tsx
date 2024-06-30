import { FriendsListData } from "@/shared";
import React, { useCallback, useContext, useState } from "react";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";

interface CorespondingUser {
  name: string;
  pid: string;
}

interface FriendsListContextType {
  friendsList: FriendsListData[];
  updateFriendsList: () => void;
  corespondingUser: CorespondingUser;
  changeCorespondingUser: (value: { name: string; pid: string }) => void;
}

export const initialFriendsListContextValue: FriendsListContextType = {
  friendsList: [],
  updateFriendsList: () => {},
  corespondingUser: { name: "", pid: "" },
  changeCorespondingUser: () => {},
};

export const FriendsListContext = React.createContext<FriendsListContextType>(
  initialFriendsListContextValue
);

export function FriendsListContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { emits } = useSocketEventsContext();
  const [friendsList, setCurrentFriendsList] = useState<FriendsListData[]>(
    initialFriendsListContextValue.friendsList
  );
  const [corespondingUser, setCorespondingUser] = useState<CorespondingUser>(
    initialFriendsListContextValue.corespondingUser
  );

  const fetchAndSetCurrentFriendsList = useCallback(() => {
    emits.getCurrentFriendsList((error, data) => {
      if (error || !data) return toast.error(error);

      setCurrentFriendsList(data);
    });
  }, [emits]);

  React.useEffect(() => {
    fetchAndSetCurrentFriendsList();
  }, [fetchAndSetCurrentFriendsList]);

  function changeCorespondingUser(value: CorespondingUser) {
    setCorespondingUser(value);
  }

  return (
    <FriendsListContext.Provider
      value={{
        corespondingUser,
        changeCorespondingUser,
        friendsList,
        updateFriendsList: fetchAndSetCurrentFriendsList,
      }}
    >
      {children}
    </FriendsListContext.Provider>
  );
}

export const useFriendsListContext = (): Required<FriendsListContextType> => {
  const friendsListContext = useContext(FriendsListContext);
  if (!friendsListContext) {
    throw new Error(
      "useFriendsListContext must be used within a FriendsListContextProvider"
    );
  }
  return friendsListContext as FriendsListContextType;
};
