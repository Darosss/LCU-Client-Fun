import {
  dangerLinearGradient,
  infoLinearGradient,
  primaryLinearGradient,
  secondaryLinearGradient,
  successLinearGradient,
} from "./colors";
import { backgroundLinearGradient } from "./styles-helpers";

const lineEditVariantBase = `
`;

export function lineEditVariantsStylesheet() {
  return `
    #primary-line-edit {
      ${lineEditVariantBase}
      color:white;
      ${primaryLinearGradient}
      }

    #secondary-line-edit {
      ${lineEditVariantBase}
      color:yellow;
      ${secondaryLinearGradient}
    }

    #danger-line-edit {
      ${lineEditVariantBase}
      color:black;
      ${dangerLinearGradient}
    }

    #success-line-edit {
      ${lineEditVariantBase}
      color:black;
      ${successLinearGradient}
    }
    
    #info-line-edit {
      ${lineEditVariantBase}
      color:black;
      ${infoLinearGradient}
    }
  `;
}
