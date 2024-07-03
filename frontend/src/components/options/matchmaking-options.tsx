import { Button, useHeadContext } from "@/components";

export function MatchmakingOptions() {
  const {
    options: { autoAccept },
    changeClientOptions,
  } = useHeadContext();
  return (
    <div>
      <Button
        defaultButtonType={autoAccept ? "success" : "secondary"}
        onClick={() => changeClientOptions({ autoAccept: !autoAccept })}
      >
        {`Auto accept match:  ${autoAccept}`}
      </Button>
    </div>
  );
}
