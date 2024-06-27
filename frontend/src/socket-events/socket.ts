import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "@/shared";

export const ioConnection = io(process.env.NEXT_PUBLIC_BACKEND_URL) as Socket<
  ServerToClientEvents,
  ClientToServerEvents
>;
