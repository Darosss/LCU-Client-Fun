import { useState } from "react";
import { Button, CurrentView, useHeadContext } from "@/components";
import { CurrentViewComponent } from "./current-view";
import styles from "./client-content.module.scss";

export function ClientContent() {
  const {
    currentViewState: [currentView, setCurrentView],
  } = useHeadContext();

  return (
    <div className={styles.clientContentWrapper}>
      <div className={styles.clientNavigationWrapper}>
        <ul className={styles.clientNavigation}>
          {Object.entries(CurrentView).map((view) => (
            <li key={view[0]}>
              <Button
                defaultButtonType={
                  view[1] === currentView ? "primary" : "secondary"
                }
                onClick={() => setCurrentView(view[1])}
              >
                {view[1]}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.clientContent}>
        <CurrentViewComponent />
      </div>
    </div>
  );
}
