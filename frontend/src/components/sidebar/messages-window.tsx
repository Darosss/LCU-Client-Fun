import React, { useState } from "react";
import { useFriendsListContext } from "./friends-list-context";
import { ConversationMessagesData } from "@/shared";

export function MessagesWindow() {
  const { corespondingUser } = useFriendsListContext();
  const [conversationMessages, setConversationMessages] = useState<
    ConversationMessagesData[]
  >([]);

  React.useEffect(() => {
    if (!corespondingUser) return;
    // TODO: add methods for create conversation etc.
  }, [corespondingUser]);

  return (
    <div>
      <div>{corespondingUser.name}</div>
      {conversationMessages
        .filter(({ type }) => type === "chat")
        .map(({ body }, idx) => (
          <div key={idx}>{body} </div>
        ))}
    </div>
  );
}
