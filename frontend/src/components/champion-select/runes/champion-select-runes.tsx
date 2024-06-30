"use client";

import React from "react";
import styles from "./champion-select-runes.module.scss";
import { RunePagesList, CurrentRunePageActions } from "@/components";
import { RecommenedRunesForChampion } from "./recommend-runes-for-champion";
export function ChampionSelectRunes() {
  return (
    <div className={styles.championSelectRunesWrapper}>
      <RunePagesList />

      <RecommenedRunesForChampion />

      <CurrentRunePageActions />
    </div>
  );
}
