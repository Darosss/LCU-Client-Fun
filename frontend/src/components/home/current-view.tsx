import { CurrentPhaseTab, Lobbys } from "@/components";
import { Options } from "@/components";

export enum CurrentView {
  LOBBY = "Lobby",
  CURRENT_PHASE = "Current phase",
  RUNES = "Runes",
  OPTIONS = "Options",
}

type CurrentViewComponentProps = {
  currentView: CurrentView;
};

export function CurrentViewComponent({
  currentView,
}: CurrentViewComponentProps) {
  switch (currentView) {
    case CurrentView.CURRENT_PHASE:
      return <CurrentPhaseTab />;
    case CurrentView.RUNES:
      return <>Runes</>;
    case CurrentView.OPTIONS:
      return <Options />;
    case CurrentView.LOBBY:
    default:
      return <Lobbys />;
  }
}
