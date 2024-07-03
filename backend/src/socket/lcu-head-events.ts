import { lcuHandlerFactory } from "@/lcu";
import { ClientToServerEvents, ServerToClientEvents } from "@/shared";
import { Socket } from "socket.io";

export const onLCUHeadEvents = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  socket.on("killUx", async (callback) => {
    try {
      await lcuHandlerFactory.getHeadHandler()?.killUx();

      callback(null, true);
    } catch (error) {
      console.error("Error occured in killUx event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to kill ux");
    }
  });

  socket.on("launchUx", async (callback) => {
    try {
      await lcuHandlerFactory.getHeadHandler()?.launchUx();

      callback(null, true);
    } catch (error) {
      console.error("Error occured in launchUx event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to launch ux");
    }
  });

  socket.on("refreshAccount", async (callback) => {
    try {
      await lcuHandlerFactory.refresh();

      const summonerData = await lcuHandlerFactory
        .getHeadHandler()!
        .getCurrentSummoner();
      callback(null, summonerData);
    } catch (error) {
      console.error("Error occured in refreshAccount event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to refresh account");
    }
  });

  socket.on("reconnectToCurrentMatch", async (callback) => {
    try {
      await lcuHandlerFactory.getHeadHandler()?.reconnectToCurrentMatch();

      callback(null, true);
    } catch (error) {
      console.error("Error occured in reconnectToCurrentMatch event.", error);
      if (error instanceof Error) callback(error.message);
      else
        callback(
          "An error occured while trying to reconnect to the current match"
        );
    }
  });

  socket.on("dismissStatsAfterMatch", async (callback) => {
    try {
      await lcuHandlerFactory.getHeadHandler()?.dismissStatsAfterMatch();

      callback(null, true);
    } catch (error) {
      console.error("Error occured in dismissStatsAfterMatch event.", error);
      if (error instanceof Error) callback(error.message);
      else
        callback("An error occured while trying to dissmis stats after match");
    }
  });
  socket.on("getAvailableChampsBySummonerId", async (summonerId, callback) => {
    try {
      const data = await lcuHandlerFactory
        .getHeadHandler()
        ?.getAvailableChampsBySummonerId(summonerId);

      callback(null, data);
    } catch (error) {
      console.error(
        "Error occured in getAvailableChampsBySummonerId event.",
        error
      );
      if (error instanceof Error) callback(error.message);
      else
        callback(
          "An error occured while trying to get available champions for summoner"
        );
    }
  });
};
