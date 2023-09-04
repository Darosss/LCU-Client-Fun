import { buttonVariantsStylesheet } from "./buttons-variants";
import { champselectStyleSheet } from "./champion-select-stylesheet";
import { labelVariantsStylesheet } from "./labels-variants";
import { lineEditVariantsStylesheet } from "./line-edits-variants";
import { lobbysStylesheet } from "./lobbys-stylesheet";
import { phaseViewStylesheet } from "./phase-view-stylesheet";
import { sidebarStylsheet } from "./sidebar-stylesheet";
import { backgroundLinearGradient } from "./styles-helpers";

export function appStylesheet(width: number, height: number) {
  return `

    #main-app {
        ${backgroundLinearGradient("rgba(25,0,36,0.6)", "rgba(43,52,136,0.7)")}
    }

        
    ${buttonVariantsStylesheet()}
    ${labelVariantsStylesheet()}
    ${lineEditVariantsStylesheet()}
    ${lobbysStylesheet(width, height)}
    ${phaseViewStylesheet(width, height)}
    ${sidebarStylsheet(width, height)}
    ${champselectStyleSheet(width, height)}
    `;
}
