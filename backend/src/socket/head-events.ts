import { Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "@/shared";
import {
  dragonChampionsData,
  dragonSpellsData,
  getDragonHeadRunesData,
  getDragonRunesData
} from "@/helpers";
import {
  readLocalStorageData,
  updateLocalStorageData,
  lcuHandlerFactory,
  queues
} from "@/lcu";
import { SocketHandler } from "./socket";

export const onHeadEvents = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  socket.emit("clientOptions", readLocalStorageData());

  socket.on("changeClientOptions", (data, callback) => {
    try {
      updateLocalStorageData(data);

      const currentConfig = readLocalStorageData();

      const headHandler = lcuHandlerFactory.getHeadHandler();
      if (readLocalStorageData().preventRiotClientToTurnOn)
        headHandler?.preventClientUXToTurnOn();
      else headHandler?.unsusbcribePreventClientUXToTurnOn();

      SocketHandler.getInstance().getIO().emit("clientOptions", currentConfig);

      callback(null, currentConfig);
    } catch (error) {
      console.error("Error occured in changeClientOptions event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to change client options");
    }
  });

  socket.on("getChampionsData", async (callback) => {
    try {
      callback(null, dragonChampionsData);
    } catch (error) {
      console.error("Error occured in getChampionsData event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to get champions data");
    }
  });

  socket.on("getQueuesData", async (callback) => {
    try {
      //TODO: change to download folder <-
      callback(null, queues);
    } catch (error) {
      console.error("Error occured in getQueuesData event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to get friend list");
    }
  });

  socket.on("getSummonerSpellsData", async (callback) => {
    try {
      callback(null, dragonSpellsData);
    } catch (error) {
      console.error("Error occured in getSummonerSpellsData event.", error);
      if (error instanceof Error) callback(error.message);
      else
        callback("An error occured while trying to get summoners spells data");
    }
  });

  socket.on("getHeadRunesData", async (callback) => {
    try {
      const headRunesData = getDragonHeadRunesData();

      callback(null, headRunesData);
    } catch (error) {
      console.error("Error occured in getHeadRunesData event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to get head runes data");
    }
  });
  socket.on("getRunesData", async (callback) => {
    try {
      const headRunesData = getDragonRunesData();

      callback(null, headRunesData);
    } catch (error) {
      console.error("Error occured in getRunesData event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to get runes data");
    }
  });
};
