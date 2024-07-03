"use client";

import React, { useMemo, useState } from "react";
import { AutoChampionPick } from "./auto-champion-pick";
import { Button, useHeadContext } from "@/components";
import styles from "./options.module.scss";
import { GeneralView } from "./general-view";

enum CurrentView {
  GENERAL = "General",
  AUTO_CHAMPS_PICK = "Auto champions pick",
  /** add
   * AUTO_CHAMPS_BANS
   */
}

export function Options() {
  const [currentView, setCurrentView] = useState<CurrentView>(
    CurrentView.GENERAL
  );

  const CurrentViewComponent = useMemo(() => {
    switch (currentView) {
      case CurrentView.AUTO_CHAMPS_PICK:
        return AutoChampionPick;

      case CurrentView.GENERAL:
      default:
        return GeneralView;
    }
  }, [currentView]);

  return (
    <div className={styles.optionsWrapper}>
      <div className={styles.optionsNavigation}>
        {Object.entries(CurrentView).map(([key, view], idx) => (
          <Button
            key={key}
            defaultButtonType={view === currentView ? "primary" : "secondary"}
            onClick={() => setCurrentView(view)}
          >
            {view}
          </Button>
        ))}
      </div>
      <div className={styles.currentView}>
        <CurrentViewComponent />
      </div>
    </div>
  );
}
