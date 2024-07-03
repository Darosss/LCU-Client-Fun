import { Socket } from "socket.io";
import { lcuHandlerFactory } from "@/lcu";
import { ClientToServerEvents, ServerToClientEvents } from "@/shared";

export const onSocialEvents = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  socket.on("getCurrentFriendsList", async (callback) => {
    try {
      const friendsList = await lcuHandlerFactory
        .getSocialHandler()
        ?.getCurrentFriendsList();

      callback(!friendsList ? "Couldn't get friends list" : null, friendsList);
    } catch (error) {
      console.error("Error occured in getCurrentFriendsList event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to get friend list");
    }
  });
};
