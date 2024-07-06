import { ClientUXActions } from "./client-ux-actions";
import { DiscordOptions } from "./discord-options";
import { MatchmakingOptions } from "./matchmaking-options";

export function GeneralView() {
  return (
    <div>
      <div>
        <ClientUXActions />
      </div>
      <div>
        <MatchmakingOptions />
      </div>
      <div>
        <DiscordOptions />
      </div>
    </div>
  );
}
