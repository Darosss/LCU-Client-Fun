import React from "react";
import { Button, useHeadContext } from "@/components";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";

export function SearchMatchBtn() {
  const {
    lobbyDataState: [lobbyData],
  } = useHeadContext();
  const { emits } = useSocketEventsContext();

  function searchMatch() {
    emits.searchMatch((error) => {
      if (error) return toast.error(error);
    });
  }
  return (
    <div id="search-match-btn-wrapper">
      {lobbyData?.canStartActivity ? (
        <Button defaultButtonType="primary" onClick={searchMatch}>
          Search
        </Button>
      ) : null}
    </div>
  );
}
