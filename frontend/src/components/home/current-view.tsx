import {
  CurrentPhaseTab,
  CurrentView,
  Lobbys,
  useHeadContext,
} from "@/components";
import { Options } from "@/components";

export function CurrentViewComponent() {
  const {
    currentViewState: [curentView],
  } = useHeadContext();
  switch (curentView) {
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
