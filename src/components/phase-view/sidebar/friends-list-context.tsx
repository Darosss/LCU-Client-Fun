import React, { useCallback, useState } from "react";
import { FriendsListData, lcuHandlerFactory } from "@lcu";
import { SocialLCUHandler } from "lcu/social-lcu-handler";

interface CorespondingUser {
  name: string;
  pid: string;
}

interface FriendsListContext {
  socialLCUHandler: SocialLCUHandler | null;
  friendsList: FriendsListData[];
  updateFriendsList: () => void;
  corespondingUser: CorespondingUser;
  changeCorespondingUser: (value: { name: string; pid: string }) => void;
}

export const initialFriendsListContextValue: FriendsListContext = {
  socialLCUHandler: null,
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
  const [socialLCUHandler, setSocialLCUHandler] =
    useState<SocialLCUHandler | null>(null);

  const [friendsList, setCurrentFriendsList] = useState<FriendsListData[]>(
    initialFriendsListContextValue.friendsList
  );
  const [corespondingUser, setCorespondingUser] = useState<CorespondingUser>(
    initialFriendsListContextValue.corespondingUser
  );

  React.useEffect(() => {
    //FIXME: temporary solution for async 'credentials' and 'ws' in factory

    const checkFullInitalizedFactory = setInterval(() => {
      const fullInitialized = lcuHandlerFactory.getFullInitialized();
      if (fullInitialized) {
        const socialLCUObj = lcuHandlerFactory.createSocialHandler();

        socialLCUObj.getCurrentFriendsList().then((friendsListResponse) => {
          setCurrentFriendsList(friendsListResponse);
        });
        setSocialLCUHandler(socialLCUObj);

        clearInterval(checkFullInitalizedFactory);
      }
    }, 1000);

    return () => {
      clearInterval(checkFullInitalizedFactory);
    };
  }, [lcuHandlerFactory]);

  const updateFriendsList = useCallback(
    () =>
      socialLCUHandler
        ?.getCurrentFriendsList()
        .then((friendsData) => setCurrentFriendsList(friendsData))
        .catch((err) =>
          console.log(
            `Error occured while trying to get current friends list`,
            err
          )
        ),
    [socialLCUHandler]
  );

  function changeCorespondingUser(value: CorespondingUser) {
    setCorespondingUser(value);
  }

  return (
    <FriendsListContext.Provider
      value={{
        socialLCUHandler,
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
