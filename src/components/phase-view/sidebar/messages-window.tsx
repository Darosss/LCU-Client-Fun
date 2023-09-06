import React, { useContext, useState } from "react";
import { PrimaryText, SecondaryText } from "@components";
import { ConversationMessagesData } from "@lcu";
import { View } from "@nodegui/react-nodegui";
import { FriendsListContext } from "./friends-list-context";

export function MessagesWindow() {
  const { corespondingUser } = useContext(FriendsListContext);
  const [conversationMessages, setConversationMessages] = useState<
    ConversationMessagesData[]
  >([]);

  React.useEffect(() => {
    if (!corespondingUser) return;
    // TODO: add methods for create conversation etc.
  }, [corespondingUser]);

  return (
    <View>
      <SecondaryText text={corespondingUser.name} />
      {conversationMessages
        .filter(({ type }) => type === "chat")
        .map(({ body }) => (
          <PrimaryText text={body} />
        ))}
    </View>
  );
}
