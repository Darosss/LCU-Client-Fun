import { Socket } from "socket.io";
import { lcuHandlerFactory } from "@/lcu";
import { ClientToServerEvents, ServerToClientEvents } from "@/shared";
import { dragonChampionsData, findChampionById } from "@/helpers";

export const onCustomLobbyEvents = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  socket.on("createCustomLobby", async (data, callback) => {
    try {
      const lobbysData = await lcuHandlerFactory
        .getLobbyHandler()!
        .createCustomLobby(data);

      callback(null, lobbysData);
    } catch (error) {
      console.error("Error occured in createCustomLobby event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to create custom lobby");
    }
  });

  socket.on("getAvailableChampionsBots", async (callback) => {
    try {
      const botsData = await lcuHandlerFactory
        .getLobbyHandler()!
        .getAvailableChampionsBots();
      callback(null, botsData);
    } catch (error) {
      console.error("Error occured in getAvailableChampionsBots event.", error);
      if (error instanceof Error) callback(error.message);
      else
        callback(
          "An error occured while trying to get available bot champions"
        );
    }
  });
  socket.on("startCustomChampSelect", async (callback) => {
    try {
      await lcuHandlerFactory.getLobbyHandler()!.startCustomChampSelect();

      callback(null, true);
    } catch (error) {
      console.error("Error occured in startCustomChampSelect event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to start custom lobby");
    }
  });
  socket.on("addBotToCustomLobby", async (data, callback) => {
    try {
      const lobbyHandler = lcuHandlerFactory.getLobbyHandler()!;
      await lobbyHandler.addBotsToCustomLobby(data);

      const {
        gameConfig: { customTeam100, customTeam200 }
      } = await lobbyHandler.getLobbyData();
      callback(null, { customTeam100, customTeam200 });
    } catch (error) {
      console.error("Error occured in addBotToCustomLobby event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to add bot to custom lobby");
    }
  });

  socket.on("removeExistingBotInCustomLobby", async (data, callback) => {
    try {
      const lobbyHandler = lcuHandlerFactory.getLobbyHandler()!;
      await lobbyHandler.removeExistingBotFromCustomLobby(data);

      callback(null, true);
    } catch (error) {
      console.error(
        "Error occured in removeExistingBotInCustomLobby event.",
        error
      );
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to remove bot from lobby");
    }
  });
  socket.on("editExistingBotInCustomLobby", async (data, callback) => {
    try {
      const lobbyHandler = lcuHandlerFactory.getLobbyHandler()!;

      const championIdName = findChampionById(
        dragonChampionsData,
        data.championId
      )?.idName;

      if (!championIdName) return callback("Champion not found");

      await lobbyHandler.editExistingBotInCustomLobby(
        { botName: championIdName, teamId: data.teamId },
        data
      );

      callback(null, true);
    } catch (error) {
      console.error(
        "Error occured in editExistingBotInCustomLobby event.",
        error
      );
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to edit bot in lobby");
    }
  });
};
