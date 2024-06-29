"use client";

import { ITooltip, Tooltip } from "react-tooltip";
import styles from "./tooltip-custom.module.scss";

type CustomTooltipProps = {
  defaultTooltipProps?: Omit<ITooltip, "className">;
  className?: string;
};

export function TooltipCustom({
  defaultTooltipProps,
  className,
}: CustomTooltipProps) {
  return (
    <Tooltip
      {...defaultTooltipProps}
      className={`${className ? className : ""} ${styles.baseTooltipStyles}`}
    />
  );
}
