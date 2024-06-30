"use client";

import { HeadRuneData, RunePageData, RunesData } from "@/shared";
import React, { useCallback, useContext, useState } from "react";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";

interface RunesContextType {
  currentPage: RunePageData | null;
  changeCurrentPage: (value: RunePageData | null) => void;
  fetchCurrentPageAndSet: () => void;
  emitSetCurrentRunePage: (page: RunePageData) => void;
  emitUpdateRunePages: () => void;
  runePages: RunePageData[];
  headRunesData: HeadRuneData[];
  runesData: RunesData[];
}

export const initialRunesContextValue: RunesContextType = {
  currentPage: null,
  changeCurrentPage: () => {},
  fetchCurrentPageAndSet: () => {},
  emitSetCurrentRunePage: () => {},
  runePages: [],
  emitUpdateRunePages: () => {},
  headRunesData: [],
  runesData: [],
};

export const RunesContext = React.createContext<RunesContextType>(
  initialRunesContextValue
);

export function RunesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { emits } = useSocketEventsContext();
  const [currentPage, setCurrentPage] = useState<RunePageData | null>(
    initialRunesContextValue.currentPage
  );
  const [headRunesData, setHeadRunesData] = useState<HeadRuneData[]>([]);
  const [runesData, setRunesData] = useState<RunesData[]>([]);

  const [runePages, setRunePages] = useState<RunePageData[]>([]);

  function changeCurrentPage(value: RunePageData | null) {
    setCurrentPage(value);
  }

  const emitSetCurrentRunePage = useCallback(
    (page: RunePageData) => {
      emits.setCurrentRunePage(page.id, (error, data) => {
        if (error || !data)
          return toast.error(error || "Couldn't set  current rune page");
        setCurrentPage(page);
      });
    },
    [emits]
  );

  const emitUpdateRunePages = useCallback(() => {
    emits.getRunePages((error, data) => {
      if (error || !data)
        return toast.error(error || "Couldnt' get rune pages for summoner");

      setRunePages(data);
    });
  }, [emits]);

  React.useEffect(() => {
    emits.getHeadRunesData((error, data) => {
      if (error || !data)
        return toast.error(error || "Couldnt' get head runes data");

      setHeadRunesData(data);
    });
    emits.getRunesData((error, data) => {
      if (error || !data)
        return toast.error(error || "Couldnt' get runes data");

      setRunesData(data);
    });
  }, [emits]);

  const fetchCurrentPageAndSet = useCallback(() => {
    if (runePages.length < 1) return;
    emits.getCurrentRunePage((error, data) => {
      if (error || !data)
        return toast.error(error || "Couldn't get current rune page");

      emitUpdateRunePages(); //NOTE: TODO: this is for now.. Now idc about this
      setCurrentPage(data);
    });
  }, [emitUpdateRunePages, emits, runePages.length]);

  React.useEffect(() => {
    emitUpdateRunePages();
  }, [emits, emitUpdateRunePages]);
  return (
    <RunesContext.Provider
      value={{
        currentPage,
        changeCurrentPage,
        runePages,
        emitUpdateRunePages,
        fetchCurrentPageAndSet,
        emitSetCurrentRunePage,
        headRunesData,
        runesData,
      }}
    >
      {children}
    </RunesContext.Provider>
  );
}

export const useRunesContext = (): Required<RunesContextType> => {
  const runesContext = useContext(RunesContext);
  if (!runesContext) {
    throw new Error(
      "useRunesContext must be used within a HeadContextProvider"
    );
  }
  return runesContext as RunesContextType;
};
