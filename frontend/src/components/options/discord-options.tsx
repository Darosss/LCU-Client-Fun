import { Button, useHeadContext } from "@/components";

export function DiscordOptions() {
  const {
    options: { discord },
    changeClientOptions,
  } = useHeadContext();
  return (
    <div>
      <Button
        defaultButtonType={discord.enabled ? "success" : "secondary"}
        onClick={() =>
          changeClientOptions({
            discord: { ...discord, enabled: !discord.enabled },
          })
        }
      >
        {`Discord information: ${discord.enabled}`}
      </Button>
      <input
        value={discord.channelIDForMessages || ""}
        onChange={(e) =>
          changeClientOptions({
            discord: {
              ...discord,
              channelIDForMessages: e.currentTarget.value,
            },
          })
        }
      />
    </div>
  );
}
