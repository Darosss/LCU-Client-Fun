"use client";
import { ToastContainer } from "react-toastify";
import styles from "./layout.module.scss";
import { FC, ReactNode } from "react";
import { SocketEventsContextProvider } from "../socket-events";

type LayoutContentProps = {
  children: ReactNode;
};

export const LayoutContent: FC<LayoutContentProps> = ({ children }) => {
  return (
    <SocketEventsContextProvider>
      <div className={styles.userDetailsWrapper}></div>
      <ToastContainer />
      <div className={styles.contentWrapper}>{children}</div>
    </SocketEventsContextProvider>
  );
};
