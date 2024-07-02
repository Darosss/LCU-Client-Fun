import { ActionsChampSelectSessionData } from "@/shared";
import styles from "./current-action.module.scss";

type CurrentActionProps = {
  userAction: ActionsChampSelectSessionData;
};
export function CurrentAction({ userAction }: CurrentActionProps) {
  const infoClassColor =
    userAction.type === "ban"
      ? styles.ban
      : userAction.type === "pick"
      ? styles.pick
      : "";
  return (
    <div
      className={`${styles.currentActionWrapper} ${infoClassColor}`}
    >{`Champ select ${userAction ? ` - Your time to ${userAction.type}!` : ""}
    `}</div>
  );
}
