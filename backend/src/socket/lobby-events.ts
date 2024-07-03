import { Socket } from "socket.io";
import { lcuHandlerFactory } from "@/lcu";
import { ClientToServerEvents, ServerToClientEvents } from "@/shared";

export const onLobbyEvents = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  socket.on("showEligibleLobbys", async (callback) => {
    try {
      const lobbysData =
        (await lcuHandlerFactory.getLobbyHandler()?.showEligibleLobbys()) || [];

      callback(null, lobbysData);
    } catch (error) {
      console.error("Error occured in showEligibleLobbys event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to get eligible lobbys");
    }
  });
  socket.on("createLobby", async ({ queueId }, callback) => {
    try {
      const lobbysData = await lcuHandlerFactory
        .getLobbyHandler()!
        .createLobby(queueId);

      callback(null, lobbysData);
    } catch (error) {
      console.error("Error occured in createLobby event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to create lobby");
    }
  });

  socket.on("leaveLobby", async (callback) => {
    try {
      await lcuHandlerFactory.getLobbyHandler()!.leaveLobby();

      callback(null, true);
    } catch (error) {
      console.error("Error occured in leaveLobby event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to get leave the lobby");
    }
  });

  socket.on("changeRolePositionPreference", async (data, callback) => {
    try {
      const lobbyHandler = lcuHandlerFactory.getLobbyHandler()!;
      await lobbyHandler.changePositionPreferences(data);

      const { localMember, members } = await lobbyHandler.getLobbyData();
      callback(null, { localMember, members });
    } catch (error) {
      console.error(
        "Error occured in changeRolePositionPreference event.",
        error
      );
      if (error instanceof Error) callback(error.message);
      else
        callback("An error occured while trying to change position preference");
    }
  });

  socket.on("managePlayerInLobby", async (data, callback) => {
    try {
      const lobbyHandler = lcuHandlerFactory.getLobbyHandler()!;
      await lobbyHandler.managePlayerInLobby(data);

      callback(null, true);
    } catch (error) {
      console.error("Error occured in managePlayerInLobby event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to manage player in lobby");
    }
  });

  socket.on("searchMatch", async (callback) => {
    try {
      await lcuHandlerFactory.getLobbyHandler()?.searchMatch();

      callback(null, true);
    } catch (error) {
      console.error("Error occured in stopMatchmaking event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to stop the matchmaking");
    }
  });
  socket.on("stopMatchmaking", async (callback) => {
    try {
      await lcuHandlerFactory.getLobbyHandler()?.searchMatch(true);

      callback(null, true);
    } catch (error) {
      console.error("Error occured in stopMatchmaking event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to stop the matchmaking");
    }
  });

  socket.on("manageMatchReadyCheck", async (data, callback) => {
    try {
      await lcuHandlerFactory.getLobbyHandler()?.manageMatchReadyCheck(data);

      callback(null, true);
    } catch (error) {
      console.error("Error occured in manageMatchReadyCheck event.", error);
      if (error instanceof Error) callback(error.message);
      else callback(`An error occured while trying to ${data} the match`);
    }
  });

  socket.on("manageInvitationToLobby", async (data, callback) => {
    try {
      await lcuHandlerFactory.getLobbyHandler()?.manageInvitation(data);

      callback(null, true);
    } catch (error) {
      console.error("Error occured in manageInvitationToLobby event.", error);
      if (error instanceof Error) callback(error.message);
      else
        callback(`An error occured while trying to ${data.action} invitation`);
    }
  });

  socket.on("invitePlayerToLobby", async (data, callback) => {
    try {
      await lcuHandlerFactory.getLobbyHandler()?.invitePlayerToLobby(data);
      callback(null, true);
    } catch (error) {
      console.error("Error occured in invitePlayerToLobby event.", error);
      if (error instanceof Error) callback(error.message);
      else
        callback("An error occured while trying to invite player(s) to lobby");
    }
  });
};
