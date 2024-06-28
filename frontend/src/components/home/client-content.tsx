import { useState } from "react";
import { useHeadContext } from "../lcu";
import { Button } from "../common";
import { CurrentView, CurrentViewComponent } from "./current-view";
import styles from "./client-content.module.scss";

export function ClientContent() {
  const { currentPhase } = useHeadContext();
  const [currentView, setCurrentView] = useState<CurrentView>(
    currentPhase === "None" ? CurrentView.LOBBY : CurrentView.CURRENT_PHASE
  );
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
        <CurrentViewComponent currentView={currentView} />
      </div>
    </div>
  );
}
