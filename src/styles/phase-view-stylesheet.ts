import { getPercentFromValue } from "@helpers";
import { backgroundLinearGradient } from "./styles-helpers";
const commonLayoutPhaseView = `
    display:'flex';
    flex-direction:'column';
    align-items:'center';
`;

const comomonOnHoverPhaseView = `
    color:yellow;
`;

const commonQWidgetPhaseView = `
    font-size:26px;
    color:white;
    ${backgroundLinearGradient("rgba(25,0,36,0.6)", "rgba(43,52,136,0.7)")}
    padding:5px;
`;

export function phaseViewStylesheet(width: number, height: number) {
  const phaseViewSizes = {
    contentWidth: ~~getPercentFromValue(width, 70),
    sidebarWidth: ~~getPercentFromValue(width, 25),
    fontSize: ~~getPercentFromValue(width, 70) / 70,
  };

  return `
    #phases-wrapper {
        display:'flex';
        flex-direction:'row';
        flex-wrap:'wrap';
        justify-content:'space-between';
    }

    #phases-wrapper > QWidget {
        flex-grow:1;
        font-size: ${phaseViewSizes.fontSize}px;
    }

    #sidebar-wrapper {
        min-width:${phaseViewSizes.sidebarWidth}px;
        max-width:${phaseViewSizes.sidebarWidth}px;
    }

    #matchmaking-wrapper {
        ${commonLayoutPhaseView}
    }

    #matchmaking-wrapper QWidget {
        ${commonQWidgetPhaseView}
    }

    #waiting-for-stats-wrapper {
        ${commonLayoutPhaseView}
    }

    #waiting-for-stats-wrapper QWidget {
        ${commonQWidgetPhaseView}
    }
    #waiting-for-stats-wrapper QPushButton:hover {
        ${comomonOnHoverPhaseView}
    }
    
    #reconnect-wrapper {
        ${commonLayoutPhaseView}
    }

    #reconnect-wrapper QWidget {
        ${commonQWidgetPhaseView}
    }
    #reconnect-wrapper QPushButton:hover {
        ${comomonOnHoverPhaseView}
    }

    #in-progress-wrapper {
        ${commonLayoutPhaseView}
    }

    #in-progress-wrapper QWidget {
        ${commonQWidgetPhaseView}
    }

    #game-start-wrapper {
        ${commonLayoutPhaseView}
    }

    #game-start-wrapper QWidget {
        ${commonQWidgetPhaseView}
    }

`;
}
