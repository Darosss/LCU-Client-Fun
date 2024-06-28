"use client";
import { FC } from "react";
import styles from "./home-content.module.scss";
import { Sidebar } from "@/components";
import { ClientContent } from "./client-content";

export const HomeContent: FC = () => {
  return (
    <div className={styles.homeContentWrapper}>
      <div className={styles.clientContent}>
        <ClientContent />
      </div>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
    </div>
  );
};
