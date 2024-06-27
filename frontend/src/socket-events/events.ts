import { ClientToServerEvents, ServerToClientEvents } from "@/shared";
import { Socket } from "socket.io-client";
import { SocketContexType } from "./types";

export const getSocketEventsFunctions = (
  socketConnection: Socket<ServerToClientEvents, ClientToServerEvents>
): SocketContexType["events"] => {
  return {
    gameflowPhase: {
      on: (cb) => socketConnection.on("gameflowPhase", (data) => cb(data)),
      off: () => socketConnection.off("gameflowPhase"),
    },
    lobbyData: {
      on: (cb) => socketConnection.on("lobbyData", (data) => cb(data)),
      off: () => socketConnection.off("lobbyData"),
    },
    currentSummoner: {
      on: (cb) => socketConnection.on("currentSummoner", (data) => cb(data)),
      off: () => socketConnection.off("currentSummoner"),
    },
    forceRefresh: {
      on: (cb) => socketConnection.on("forceRefresh", () => cb()),
      off: () => socketConnection.off("forceRefresh"),
    },
    matchmakingSearch: {
      on: (cb) => socketConnection.on("matchmakingSearch", (data) => cb(data)),
      off: () => socketConnection.off("matchmakingSearch"),
    },
    clientOptions: {
      on: (cb) => socketConnection.on("clientOptions", (data) => cb(data)),
      off: () => socketConnection.off("clientOptions"),
    },
    championSelectPhase: {
      on: (cb) =>
        socketConnection.on("championSelectPhase", (data) => cb(data)),
      off: () => socketConnection.off("championSelectPhase"),
    },
    championSelectSummonerData: {
      on: (cb) =>
        socketConnection.on("championSelectSummonerData", (data) => cb(data)),
      off: () => socketConnection.off("championSelectSummonerData"),
    },
    receivedInvitation: {
      on: (cb) => socketConnection.on("receivedInvitation", (data) => cb(data)),
      off: () => socketConnection.off("receivedInvitation"),
    },
  };
};
