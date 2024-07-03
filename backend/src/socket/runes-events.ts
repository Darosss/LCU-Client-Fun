import { Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "@/shared";

import { lcuHandlerFactory } from "@/lcu";

export const onRunesEvents = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  socket.on("getRunePages", async (callback) => {
    try {
      const runePages = await lcuHandlerFactory
        .getHeadHandler()
        ?.getRunePages();
      callback(null, runePages);
    } catch (error) {
      console.error("Error occured in getChampionsData event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to get champions data");
    }
  });

  socket.on("createRunePage", async (data, callback) => {
    try {
      const createdRune = await lcuHandlerFactory
        .getHeadHandler()
        ?.createRunePage(data);

      if (!createdRune) return callback("Couldn't create rune page");

      callback(null, createdRune);
    } catch (error) {
      console.error("Error occured in createRunePage event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to create rune page");
    }
  });
  socket.on("setCurrentRunePage", async (runePageId, callback) => {
    try {
      await lcuHandlerFactory.getHeadHandler()?.setCurrentPage(runePageId);

      callback(null, true);
    } catch (error) {
      console.error("Error occured in setCurrentRunePage event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to set current rune page");
    }
  });
  socket.on("getCurrentRunePage", async (callback) => {
    try {
      const currentRunePage = await lcuHandlerFactory
        .getHeadHandler()
        ?.getCurrentPage();

      if (!currentRunePage) return callback("Couldn't get current rune page");

      callback(null, currentRunePage);
    } catch (error) {
      console.error("Error occured in getCurrentRunePage event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to get current rune page");
    }
  });
  socket.on("getOwnedRunePageCount", async (callback) => {
    try {
      const currentRunePage = await lcuHandlerFactory
        .getHeadHandler()
        ?.getOwnedRunePageCount();

      if (!currentRunePage)
        return callback("Couldn't get owner rune page count");

      callback(null, currentRunePage);
    } catch (error) {
      console.error("Error occured in getOwnedRunePageCount event.", error);
      if (error instanceof Error) callback(error.message);
      else
        callback("An error occured while trying to get owner rune pages count");
    }
  });
  socket.on("editRunePageById", async (data, callback) => {
    try {
      await lcuHandlerFactory
        .getHeadHandler()
        ?.editRunePageById(data.pageId, data.updateData);

      callback(null, true);
    } catch (error) {
      console.error("Error occured in editRunePageById event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to edit rune page");
    }
  });
  socket.on("deleteRunePageById", async (pageId, callback) => {
    try {
      await lcuHandlerFactory.getHeadHandler()?.deleteRunePageById(pageId);

      callback(null, true);
    } catch (error) {
      console.error("Error occured in deleteRunePageById event.", error);
      if (error instanceof Error) callback(error.message);
      else callback("An error occured while trying to delete rune page");
    }
  });
  socket.on(
    "getRecommendedPagesByChampIdPositionAndMapId",
    async (data, callback) => {
      try {
        const recommendedRunePages = await lcuHandlerFactory
          .getHeadHandler()
          ?.getRecommendedPagesByChampIdPositionAndMapId(data);

        callback(
          !recommendedRunePages ? "Couldn't get recommended runes" : null,
          recommendedRunePages
        );
      } catch (error) {
        console.error(
          "Error occured in getRecommendedPagesByChampIdPositionAndMapId event.",
          error
        );
        if (error instanceof Error) callback(error.message);
        else
          callback(
            "An error occured while trying to get recommended rune pages for your champion"
          );
      }
    }
  );
};
