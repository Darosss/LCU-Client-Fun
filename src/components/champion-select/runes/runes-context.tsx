import { RunePageData } from "@lcu";
import React, { useState } from "react";

interface RunesContext {
  currentPage: RunePageData | null;
  changeCurrentPage: (value: RunePageData | null) => void;
  runePages: RunePageData[];
  changeRunePages: (value: RunePageData[]) => void;
}

export const initialRunesContextValue: RunesContext = {
  currentPage: null,
  changeCurrentPage: () => {},
  runePages: [],
  changeRunePages: () => {},
};

export const RunesContext = React.createContext<RunesContext>(
  initialRunesContextValue
);

export function RunesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentPage, setCurrentPage] = useState<RunePageData | null>(
    initialRunesContextValue.currentPage
  );

  const [runePages, setRunePages] = useState<RunePageData[]>([]);

  function changeCurrentPage(value: RunePageData | null) {
    setCurrentPage(value);
  }

  function changeRunePages(value: RunePageData[]) {
    setRunePages(value);
  }
  return (
    <RunesContext.Provider
      value={{ currentPage, changeCurrentPage, runePages, changeRunePages }}
    >
      {children}
    </RunesContext.Provider>
  );
}
