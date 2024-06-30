import { ClientToServerEvents, ServerToClientEvents } from "@/shared";
import { Server } from "http";
import { Server as IOServer } from "socket.io";
import { addSocketOnEvents } from "./socket-on";

class SocketHandler {
  private io: IOServer<ClientToServerEvents, ServerToClientEvents>;
  private static instance: SocketHandler;
  private constructor(httpServer: Server) {
    this.io = new IOServer(httpServer, {
      cors: { origin: "*" }
      // TOOD: make env vars for origin
    });

    addSocketOnEvents(this.io);
  }

  public static getInstance(httpServer?: Server) {
    if (!SocketHandler.instance) {
      if (!httpServer)
        throw new Error(
          "httpServer must be provided for the first initialization"
        );
      SocketHandler.instance = new SocketHandler(httpServer);
    }
    return SocketHandler.instance;
  }

  public getIO(): IOServer<ClientToServerEvents, ServerToClientEvents> {
    return this.io;
  }
}

export { SocketHandler };
