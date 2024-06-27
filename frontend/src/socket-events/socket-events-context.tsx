"use client";

import { FC, createContext, useContext, useEffect, useMemo } from "react";
import { getSocketEventsFunctions } from "./events";
import { getSocketEmitsFunctions } from "./emits";
import { SocketContexType } from "./types";
import { ioConnection } from "./socket";
type SocketEventsContextProviderProps = {
  children: React.ReactNode;
};

export const SocketEventsContext = createContext<SocketContexType | null>(null);

export const SocketEventsContextProvider: FC<
  SocketEventsContextProviderProps
> = ({ children }) => {
  const emits = useMemo<SocketContexType["emits"]>(() => {
    return getSocketEmitsFunctions(ioConnection);
  }, []);

  const events = useMemo<SocketContexType["events"]>(() => {
    return getSocketEventsFunctions(ioConnection);
  }, []);

  useEffect(() => {
    if (!ioConnection || !events) return;

    events.forceRefresh.on(() => {
      ioConnection.disconnect();
      ioConnection.connect();
    });

    return () => {
      events.forceRefresh.off();
    };
  }, [events]);

  useEffect(() => {
    ioConnection.connect();
    return () => {
      ioConnection.disconnect();
    };
  }, []);

  return (
    <SocketEventsContext.Provider value={{ emits, events }}>
      {children}
    </SocketEventsContext.Provider>
  );
};

export const useSocketEventsContext = (): Required<SocketContexType> => {
  const socketEventsContext = useContext(SocketEventsContext);
  if (!socketEventsContext) {
    throw new Error(
      "useSocketEventsContext must be used within a SocketEventsContextProvider"
    );
  }
  return socketEventsContext as SocketContexType;
};
