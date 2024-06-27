import { useSocketEventsContext } from "@/socket";
import { Button } from "./button";
import { toast } from "react-toastify";
import styles from "./cancel-search-btn.module.scss";

export function CancelSearchBtn() {
  const { emits } = useSocketEventsContext();

  function handleOnStopMatchmaking() {
    emits.stopMatchmaking((error, data) => {
      if (error) return toast.error(error);
    });
  }

  return (
    <Button
      className={styles.cancelSearchBtn}
      defaultButtonType="danger"
      onClick={handleOnStopMatchmaking}
    >
      Cancel Search
    </Button>
  );
}
