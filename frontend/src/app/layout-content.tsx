"use client";
import { ToastContainer } from "react-toastify";
import styles from "./layout.module.scss";
import { FC, ReactNode } from "react";
import { SocketEventsContextProvider } from "@/socket";
import Image from "next/image";

type LayoutContentProps = {
  children: ReactNode;
};

export const LayoutContent: FC<LayoutContentProps> = ({ children }) => {
  return (
    <SocketEventsContextProvider>
      <div className={styles.baseDetailsWrapper}>
        <div className={styles.logoWrapper}>
          <Image src="/images/logo.png" alt="lcu-client-logo" fill />
        </div>
        <h1>LCU Client</h1>
        <div> </div>
      </div>
      <ToastContainer />
      <div className={styles.contentWrapper}>{children}</div>
    </SocketEventsContextProvider>
  );
};
