import { backgroundLinearGradient } from "../styles";
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

export const phaseViewStylesheet = `
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
