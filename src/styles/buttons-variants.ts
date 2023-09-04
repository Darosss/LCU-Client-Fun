import {
  dangerLinearGradient,
  infoLinearGradient,
  primaryLinearGradient,
  secondaryLinearGradient,
  successLinearGradient,
} from "./colors";

const buttonVariantBase = `
`;

export function buttonVariantsStylesheet() {
  return `
    #primary-button {
      ${buttonVariantBase}
      color:white;
      ${primaryLinearGradient}
    }

    #primary-button:hover{
      color:gray;
    }

    #secondary-button {
      ${buttonVariantBase}
      color:yellow;
      ${secondaryLinearGradient}
    }
    
    #secondary-button:hover{
      color:white;
    }

    #danger-button {
      ${buttonVariantBase}
      color:black;
      ${dangerLinearGradient}
    }
    
    #danger-button:hover{
      color:white;
    }

    #success-button {
      ${buttonVariantBase}
      color:black;
      ${successLinearGradient}
    }
    
    #success-button:hover{
      color:white;
    }

    
    #info-button {
      ${buttonVariantBase}
      color:black;
      ${infoLinearGradient}
    }
    
    #info-button:hover{
      color:gray;
    }
  `;
}
