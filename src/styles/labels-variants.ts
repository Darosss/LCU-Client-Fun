import {
  dangerLinearGradient,
  infoLinearGradient,
  primaryLinearGradient,
  secondaryLinearGradient,
  successLinearGradient,
} from "./colors";
import { backgroundLinearGradient } from "./styles-helpers";

const labelVariantBase = `
  display:'flex';
  align-items:'center';
  justify-content:'center';
  text-align:'center';
  qproperty-alignment: AlignCenter;


`;

export function labelVariantsStylesheet() {
  return `
    #primary-label {
      ${labelVariantBase}
      color:white;
      ${primaryLinearGradient}
    }

    #secondary-label {
      ${labelVariantBase}
      color:yellow;
      ${secondaryLinearGradient}
    }

    #danger-label {
      ${labelVariantBase}
      color:black;
      ${dangerLinearGradient}
    }

    #success-label {
      ${labelVariantBase}
      color:black;
      ${successLinearGradient}
    }
    
    #info-label {
      ${labelVariantBase}
      color:black;
      ${infoLinearGradient}
    }
  `;
}
