import { Button } from "../common";
import styles from "./lobbys.module.scss";

type HideLobbysButtonProps = {
  showLobbys: boolean;
  onClickButton: () => void;
};

export function ToggleLobbysButton({
  showLobbys,
  onClickButton,
}: HideLobbysButtonProps) {
  return (
    <div className={styles.toggleLobbysButtonWrapper}>
      <Button
        defaultButtonType={showLobbys ? "danger" : "primary"}
        onClick={onClickButton}
      >
        {showLobbys ? "Hide lobbys" : "Show lobbys"}
      </Button>
    </div>
  );
}
