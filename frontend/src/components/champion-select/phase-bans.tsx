import React, { useMemo, useState } from "react";
import { useChampionSelectContext } from "./champion-select-context";
import { useSocketEventsContext } from "@/socket";
import { useHeadContext } from "@/components";
import styles from "./phase-bans.module.scss";

type BannedChampsType = {
  name: string;
  isAlly?: boolean;
  isEnemy?: boolean;
};

export function PhaseBans() {
  const { emits } = useSocketEventsContext();
  const { champSelectSessionData } = useChampionSelectContext();
  const { championsData } = useHeadContext();
  const [bannedChamps, setBannedChamps] = useState<
    Map<string, BannedChampsType>
  >(new Map());

  React.useEffect(() => {
    const onlyBanActions = champSelectSessionData.actions.banActions;

    onlyBanActions.map((ban) => {
      const { championId } = ban;
      if (championId === 0 || !ban.completed) return;

      const currentBanData = bannedChamps.get(String(ban.championId));

      if (!currentBanData) {
        const foundBannedChampData = championsData.find(
          (champData) => champData.id === ban.championId
        );

        foundBannedChampData
          ? setBannedChamps((prevState) => {
              prevState.set(String(ban.championId), {
                name: foundBannedChampData.name,
                isAlly: ban.isAllyAction,
                isEnemy: !ban.isAllyAction,
              });

              return new Map(prevState);
            })
          : null;
      } else if (ban.isAllyAction && !currentBanData.isAlly) {
        setBannedChamps((prevState) => {
          prevState.set(String(ban.championId), {
            ...prevState.get(String(ban.championId))!,
            isAlly: true,
          });
          new Map(prevState);

          return prevState;
        });
      } else if (!ban.isAllyAction && !currentBanData.isEnemy) {
        setBannedChamps((prevState) => {
          prevState.set(String(ban.championId), {
            ...prevState.get(String(ban.championId))!,
            isEnemy: true,
          });

          return new Map(prevState);
        });
      }
    });
  }, [champSelectSessionData.actions.banActions, emits]);

  const { allyBans, enemyBans } = useMemo(() => {
    const allyBans: string[] = [];
    const enemyBans: string[] = [];

    [...bannedChamps.values()].forEach((data) => {
      if (data.isAlly) {
        allyBans.push(data.name);
      }
      if (data.isEnemy) {
        enemyBans.push(data.name);
      }
    });

    return { allyBans, enemyBans };
  }, [bannedChamps]);

  return (
    <div className={styles.phaseBansWrapper}>
      <div>
        {allyBans.map((name, index) => (
          <div key={index}>{name} </div>
        ))}
      </div>
      <div className={styles.bansHeader}>
        <h3>Bans</h3>{" "}
      </div>

      <div>
        {enemyBans.map((name, index) => (
          <div key={index}>{name} </div>
        ))}
      </div>
    </div>
  );
}
