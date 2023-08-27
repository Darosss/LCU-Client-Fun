import React, { useState } from "react";
import { lcuClientHandlerObj } from "../../LCU/LCUClientHandler";

interface LobbysContext {}

export const initialLobbysContextValue: LobbysContext = {};

export const LobbysContext = React.createContext<LobbysContext>(
  initialLobbysContextValue
);

export function LobbysContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  React.useEffect(() => {}, []);

  return <LobbysContext.Provider value={{}}>{children}</LobbysContext.Provider>;
}
