"use client";

import React, { useCallback } from "react";
import { AutoChampionPick } from "./auto-champion-pick";
import { Button, useHeadContext } from "@/components";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";
import styles from "./options.module.scss";

export function Options() {
  const {
    options: { autoAccept },
    changeClientOptions,
  } = useHeadContext();

  return (
    <div className={styles.optionsWrapper}>
      <div className={styles.generalOptions}>
        <div>
          <ClientUXActions />
        </div>
        <div>
          <Button
            defaultButtonType={autoAccept ? "success" : "secondary"}
            onClick={() => changeClientOptions({ autoAccept: !autoAccept })}
          >
            {`Auto accept match:  ${autoAccept}`}
          </Button>
        </div>
      </div>
      <div className={styles.autoChampionOptions}>
        <AutoChampionPick />
      </div>
    </div>
  );
}

function ClientUXActions() {
  const {
    options: { preventRiotClientToTurnOn },
    changeClientOptions,
  } = useHeadContext();

  const { emits } = useSocketEventsContext();

  const handleOnKillUx = useCallback(() => {
    emits.killUx((error, data) => {
      if (error || !data) return toast.error(error || "Couldn't kill UX");
      changeClientOptions({ preventRiotClientToTurnOn: true });
    });
  }, [changeClientOptions, emits]);

  const handleOnLaunchUx = useCallback(() => {
    emits.launchUx((error, data) => {
      console.log(error, data, "xpp");
      if (error || !data) return toast.error(error || "Couldn't launch UX");
      changeClientOptions({ preventRiotClientToTurnOn: false });
    });
  }, [changeClientOptions, emits]);

  return (
    <div id="client-ux-actions">
      <div id="launch-kill-ux-manualy-wrapper">
        <Button defaultButtonType="success" onClick={handleOnLaunchUx}>
          Launch UX manualy
        </Button>
        <Button defaultButtonType="danger" onClick={handleOnKillUx}>
          Kill UX manualy
        </Button>
      </div>

      <div>
        <Button
          defaultButtonType={
            preventRiotClientToTurnOn ? "success" : "secondary"
          }
          onClick={() =>
            changeClientOptions({
              preventRiotClientToTurnOn: !preventRiotClientToTurnOn,
            })
          }
        >
          {`Prevent client to turn on:  ${preventRiotClientToTurnOn}`}
        </Button>
      </div>
    </div>
  );
}
