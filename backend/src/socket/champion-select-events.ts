import { Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "@/shared";
import { lcuHandlerFactory } from "@/lcu";

export const onChampionSelectEvents = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  socket.on("getAllChampionsIdsForChampSelect", async (callback) => {
    try {
      const championSelectHandler =
        lcuHandlerFactory.getChampionSelectHandler();

      if (!championSelectHandler)
        return callback("Champion Ids for champion select not found");

      const [bannable, pickable, disabled] = await Promise.all([
        championSelectHandler.getChampionsIdsForChampSelect(
          "bannable-champion-ids"
        ),
        championSelectHandler.getChampionsIdsForChampSelect(
          "pickable-champion-ids"
        ),
        championSelectHandler.getChampionsIdsForChampSelect(
          "disabled-champion-ids"
        )
      ]);

      callback(null, {
        bannable,
        pickable,
        disabled
      });
    } catch (error) {
      console.error(
        "Error occured in getAllChampionsIdsForChampSelect event.",
        error
      );
      if (error instanceof Error) callback(error.message);
      else
        callback(
          "An error occured while trying to get champions ids for champion select"
        );
    }
  });
  socket.on("champSelectAction", async (data, callback) => {
    try {
      const championSelectHandler =
        lcuHandlerFactory.getChampionSelectHandler();

      await championSelectHandler?.champSelectAction(data);

      callback(null, true);
    } catch (error) {
      console.error("Error occured in champSelectAction event.", error);
      if (error instanceof Error) callback(error.message);
      else
        callback(
          "An error occured while trying to take a action in champion select"
        );
    }
  });
  socket.on(
    "getChampionSelectSummonerCellId",
    async (summonerCellId, callback) => {
      try {
        const data = await lcuHandlerFactory
          .getChampionSelectHandler()
          ?.getChampionSelectSummonerCellId(summonerCellId);

        callback(null, data);
      } catch (error) {
        console.error(
          "Error occured in getChampionSelectSummonerCellId event.",
          error
        );
        if (error instanceof Error) callback(error.message);
        else
          callback(
            "An error occured while trying to get available champions for summoner"
          );
      }
    }
  );

  socket.on("changeSummonerSpells", async (data, callback) => {
    try {
      await lcuHandlerFactory
        .getChampionSelectHandler()
        ?.changeSummonerSpells(data);

      callback(null, true);
    } catch (error) {
      console.error("Error occured in changeSummonerSpells event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to change summoners spells");
    }
  });

  socket.on("getChampionSelectPhaseData", async (callback) => {
    try {
      const data = await lcuHandlerFactory
        .getChampionSelectHandler()
        ?.getChampionSelectPhaseData();

      callback(null, data);
    } catch (error) {
      console.error(
        "Error occured in getChampionSelectPhaseData event.",
        error
      );
      if (error instanceof Error) callback(error.message);
      else
        callback(
          "An error occured while trying to get champion select phase data"
        );
    }
  });
  socket.on("getChampionSelectSessionTimer", async (callback) => {
    try {
      const data = await lcuHandlerFactory
        .getChampionSelectHandler()
        ?.getChampSelectSessionTimer();

      callback(null, data);
    } catch (error) {
      console.error(
        "Error occured in getChampionSelectSessionTimer event.",
        error
      );
      if (error instanceof Error) callback(error.message);
      else
        callback(
          "An error occured while trying to get champion select session timer"
        );
    }
  });
};
