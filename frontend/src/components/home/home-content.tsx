"use client";
import { FC } from "react";
import styles from "./home-content.module.scss";
import { CurrentPhaseStage, Sidebar } from "@/components";

export const HomeContent: FC = () => {
  return (
    <div className={styles.homeContentWrapper}>
      <div className={styles.clientContent}>
        <CurrentPhaseStage />
      </div>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
    </div>
  );
};
