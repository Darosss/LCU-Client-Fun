import { ServerToClientEvents, ClientToServerEvents } from "@/shared";
import { Socket } from "socket.io-client";
import { SocketContexType } from "./types";

export const getSocketEmitsFunctions = (
  socketConnection: Socket<ServerToClientEvents, ClientToServerEvents>
): SocketContexType["emits"] => {
  return {
    refreshAccount: (callback) =>
      socketConnection.emit("refreshAccount", (error, data) =>
        callback(error, data)
      ),

    changeClientOptions: (changeData, callback) =>
      socketConnection.emit(
        "changeClientOptions",
        changeData,
        async (error, data) => {
          callback(error, data);
        }
      ),
    killUx: (callback) =>
      socketConnection.emit("killUx", (error, data) => callback(error, data)),
    launchUx: (callback) =>
      socketConnection.emit("launchUx", (error, data) => callback(error, data)),
    showEligibleLobbys: (callback) =>
      socketConnection.emit("showEligibleLobbys", (error, data) =>
        callback(error, data)
      ),
    createLobby: (createData, callback) =>
      socketConnection.emit("createLobby", createData, async (error, data) => {
        callback(error, data);
      }),
    createCustomLobby: (createData, callback) =>
      socketConnection.emit(
        "createCustomLobby",
        createData,
        async (error, data) => {
          callback(error, data);
        }
      ),
    leaveLobby: (callback) =>
      socketConnection.emit("leaveLobby", (error, data) =>
        callback(error, data)
      ),
    searchMatch: (callback) =>
      socketConnection.emit("searchMatch", (error, data) =>
        callback(error, data)
      ),
    stopMatchmaking: (callback) =>
      socketConnection.emit("stopMatchmaking", (error, data) =>
        callback(error, data)
      ),
    changeRolePositionPreference: (changePositionData, callback) =>
      socketConnection.emit(
        "changeRolePositionPreference",
        changePositionData,
        async (error, data) => {
          callback(error, data);
        }
      ),
    getAvailableChampionsBots: (callback) =>
      socketConnection.emit("getAvailableChampionsBots", (error, data) =>
        callback(error, data)
      ),
    startCustomChampSelect: (callback) =>
      socketConnection.emit("startCustomChampSelect", (error, data) =>
        callback(error, data)
      ),
    addBotToCustomLobby: (addData, callback) =>
      socketConnection.emit("addBotToCustomLobby", addData, (error, data) =>
        callback(error, data)
      ),
    managePlayerInLobby: (manageData, callback) =>
      socketConnection.emit("managePlayerInLobby", manageData, (error, data) =>
        callback(error, data)
      ),
    editExistingBotInCustomLobby: (manageData, callback) =>
      socketConnection.emit(
        "editExistingBotInCustomLobby",
        manageData,
        (error, data) => callback(error, data)
      ),
    removeExistingBotInCustomLobby: (manageData, callback) =>
      socketConnection.emit(
        "removeExistingBotInCustomLobby",
        manageData,
        (error, data) => callback(error, data)
      ),
    reconnectToCurrentMatch: (callback) =>
      socketConnection.emit("reconnectToCurrentMatch", (error, data) =>
        callback(error, data)
      ),
    manageMatchReadyCheck: (readyCheckData, callback) =>
      socketConnection.emit(
        "manageMatchReadyCheck",
        readyCheckData,
        (error, data) => callback(error, data)
      ),
    getChampionSelectPhaseData: (callback) =>
      socketConnection.emit("getChampionSelectPhaseData", (error, data) =>
        callback(error, data)
      ),
    getChampionSelectSessionTimer: (callback) =>
      socketConnection.emit("getChampionSelectSessionTimer", (error, data) =>
        callback(error, data)
      ),
    dismissStatsAfterMatch: (callback) =>
      socketConnection.emit("dismissStatsAfterMatch", (error, data) =>
        callback(error, data)
      ),
    getChampionSelectSummonerCellId: (cellId, callback) =>
      socketConnection.emit(
        "getChampionSelectSummonerCellId",
        cellId,
        (error, data) => callback(error, data)
      ),
    getAvailableChampsBySummonerId: (summonerId, callback) =>
      socketConnection.emit(
        "getAvailableChampsBySummonerId",
        summonerId,
        (error, data) => callback(error, data)
      ),
    getAllChampionsIdsForChampSelect: (callback) =>
      socketConnection.emit("getAllChampionsIdsForChampSelect", (error, data) =>
        callback(error, data)
      ),
    champSelectAction: (actionData, callback) =>
      socketConnection.emit("champSelectAction", actionData, (error, data) =>
        callback(error, data)
      ),
    getChampionsData: (callback) =>
      socketConnection.emit("getChampionsData", (error, data) =>
        callback(error, data)
      ),
    getRunePages: (callback) =>
      socketConnection.emit("getRunePages", (error, data) =>
        callback(error, data)
      ),
    createRunePage: (data, callback) =>
      socketConnection.emit("createRunePage", data, (error, data) =>
        callback(error, data)
      ),
    editRunePageById: (data, callback) =>
      socketConnection.emit("editRunePageById", data, (error, data) =>
        callback(error, data)
      ),
    deleteRunePageById: (pageId, callback) =>
      socketConnection.emit("deleteRunePageById", pageId, (error, data) =>
        callback(error, data)
      ),
    setCurrentRunePage: (pageId, callback) =>
      socketConnection.emit("setCurrentRunePage", pageId, (error, data) =>
        callback(error, data)
      ),
    getOwnedRunePageCount: (callback) =>
      socketConnection.emit("getOwnedRunePageCount", (error, data) =>
        callback(error, data)
      ),
    getCurrentRunePage: (callback) =>
      socketConnection.emit("getCurrentRunePage", (error, data) =>
        callback(error, data)
      ),
    getRecommendedPagesByChampIdPositionAndMapId: (data, callback) =>
      socketConnection.emit(
        "getRecommendedPagesByChampIdPositionAndMapId",
        data,
        (error, data) => callback(error, data)
      ),
    getHeadRunesData: (callback) =>
      socketConnection.emit("getHeadRunesData", (error, data) =>
        callback(error, data)
      ),
    getRunesData: (callback) =>
      socketConnection.emit("getRunesData", (error, data) =>
        callback(error, data)
      ),
    getSummonerSpellsData: (callback) =>
      socketConnection.emit("getSummonerSpellsData", (error, data) =>
        callback(error, data)
      ),
    changeSummonerSpells: (data, callback) =>
      socketConnection.emit("changeSummonerSpells", data, (error, data) =>
        callback(error, data)
      ),
    getCurrentFriendsList: (callback) =>
      socketConnection.emit("getCurrentFriendsList", (error, data) =>
        callback(error, data)
      ),
    manageInvitationToLobby: (data, callback) =>
      socketConnection.emit("manageInvitationToLobby", data, (error, data) =>
        callback(error, data)
      ),
    getQueuesData: (callback) =>
      socketConnection.emit("getQueuesData", (error, data) =>
        callback(error, data)
      ),
    invitePlayerToLobby: (data, callback) =>
      socketConnection.emit("invitePlayerToLobby", data, (error, data) =>
        callback(error, data)
      ),
  };
};
