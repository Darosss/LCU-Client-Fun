import React, { useContext } from "react";
import { LCUContext } from "../../../LCU/lcucontext";
import { SearchMatchBtn } from "./search-match-btn";

export function DefaultQueue() {
  const { lobbyData } = useContext(LCUContext);

  return lobbyData?.localMember.isLeader ? <SearchMatchBtn /> : null;
}
