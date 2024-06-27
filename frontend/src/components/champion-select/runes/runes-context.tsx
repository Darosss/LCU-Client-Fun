import { HeadRuneData, RunePageData, RunesData } from "@/shared";
import React, { useContext, useState } from "react";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";

interface RunesContextType {
  currentPage: RunePageData | null;
  changeCurrentPage: (value: RunePageData | null) => void;
  fetchCurrentPageAndSet: () => void;
  emitSetCurrentRunePage: (page: RunePageData) => void;
  runePages: RunePageData[];
  changeRunePages: (value: RunePageData[]) => void;
  headRunesData: HeadRuneData[];
  runesData: RunesData[];
}

export const initialRunesContextValue: RunesContextType = {
  currentPage: null,
  changeCurrentPage: () => {},
  fetchCurrentPageAndSet: () => {},
  emitSetCurrentRunePage: () => {},
  runePages: [],
  changeRunePages: () => {},
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

  function fetchCurrentPageAndSet() {
    if (runePages.length < 1) return;
    emits.getCurrentRunePage((error, data) => {
      if (error || !data)
        return toast.error(error || "Couldn't get current rune page");

      setCurrentPage(data);
    });
  }

  function emitSetCurrentRunePage(page: RunePageData) {
    emits.setCurrentRunePage(page.id, (error, data) => {
      if (error || !data)
        return toast.error(error || "Couldn't set  current rune page");
      setCurrentPage(page);
    });
  }

  function changeRunePages(value: RunePageData[]) {
    setRunePages(value);
  }

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
  return (
    <RunesContext.Provider
      value={{
        currentPage,
        changeCurrentPage,
        runePages,
        changeRunePages,
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
