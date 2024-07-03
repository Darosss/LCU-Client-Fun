import { ClientToServerEvents, ServerToClientEvents } from "@/shared";
import { Server, Socket } from "socket.io";
import { lcuHandlerFactory } from "@/lcu";
import { onHeadEvents } from "./head-events";
import { onLCUHeadEvents } from "./lcu-head-events";
import { onLobbyEvents } from "./lobby-events";
import { onCustomLobbyEvents } from "./custom-lobby-events";
import { onRunesEvents } from "./runes-events";
import { onChampionSelectEvents } from "./champion-select-events";
import { onSocialEvents } from "./social-events";

export function addSocketOnEvents(
  io: Server<ClientToServerEvents, ServerToClientEvents, any, any>
) {
  io.on(
    "connection",
    (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
      socket.on("disconnect", () => {
        console.log("disconnected!", socket.id);
      });
      console.log("connected!", socket.id);
      setTimeout(async () => {
        const headHandler = lcuHandlerFactory.getHeadHandler();
        if (!headHandler) return;

        headHandler
          .getCurrentSummoner()
          .then((summonerData) => socket.emit("currentSummoner", summonerData));

        const gameFlowPhase = await headHandler.getGameflowPhase();
        if (!gameFlowPhase) return;
        socket.emit("gameflowPhase", gameFlowPhase);

        //this probably can be removed
        if (
          gameFlowPhase === "Lobby" ||
          gameFlowPhase === "Matchmaking" ||
          gameFlowPhase === "ReadyCheck" ||
          gameFlowPhase === "ChampSelect"
        ) {
          const lobbyData = await lcuHandlerFactory
            .getLobbyHandler()
            ?.getLobbyData();

          socket.emit("lobbyData", lobbyData!);
        }
      }, 1500);

      onHeadEvents(socket);
      if (!lcuHandlerFactory.getFullInitialized()) return;

      onLCUHeadEvents(socket);
      onLobbyEvents(socket);
      onCustomLobbyEvents(socket);
      onChampionSelectEvents(socket);
      onRunesEvents(socket);
      onSocialEvents(socket);
    }
  );
}
