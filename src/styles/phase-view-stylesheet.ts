import { getPercentFromValue } from "@helpers";
import { primaryLinearGradient } from "./colors";
const commonLayoutPhaseView = `
    display:'flex';
    flex-direction:'column';
    align-items:'center';
`;

const commonQWidgetPhaseView = `
    font-size:26px;
    color:white;
    padding:5px;
`;

export function phaseViewStylesheet(width: number, height: number) {
  const phaseViewSizes = {
    contentWidth: ~~getPercentFromValue(width, 70),
    contentHeight: ~~getPercentFromValue(height, 95),
    sidebarWidth: ~~getPercentFromValue(width, 25),
    fontSize: ~~getPercentFromValue(width, 70) / 70,
  };

  return `
    #phases-wrapper {
        display:'flex';
        flex-direction:'row';
        flex-wrap:'wrap';
        justify-content:'space-between';
        min-height:${phaseViewSizes.contentHeight}px;
        max-height:${phaseViewSizes.contentHeight}px;
    }

    #phase-view-tab-item-wrapper {
        ${primaryLinearGradient};
        min-height:${phaseViewSizes.contentHeight}px;
        max-height:${phaseViewSizes.contentHeight}px;
    }


    #content-wrapper{
        min-height:${phaseViewSizes.contentHeight}px;
        max-height:${phaseViewSizes.contentHeight}px;
    }

    #phases-wrapper > QWidget {
        flex-grow:1;
        font-size: ${phaseViewSizes.fontSize}px;
    }

    #sidebar-wrapper {
        min-width:${phaseViewSizes.sidebarWidth}px;
        max-width:${phaseViewSizes.sidebarWidth}px;
    }

    #matchmaking-wrapper, #waiting-for-stats-wrapper, #reconnect-wrapper, #in-progress-wrapper, #game-start-wrapper, #game-start-wrapper {
        ${commonLayoutPhaseView}
    }

    #matchmaking-wrapper QWidget {
        ${commonQWidgetPhaseView}
    }

    #waiting-for-stats-wrapper QWidget {
        ${commonQWidgetPhaseView}
    }
    
    #reconnect-wrapper QWidget {
        ${commonQWidgetPhaseView}
    }

    #in-progress-wrapper QWidget {
        ${commonQWidgetPhaseView}
    }

    #game-start-wrapper QWidget {
        ${commonQWidgetPhaseView}
    }

`;
}
