import { backgroundLinearGradient } from "../../styles";

export function sidebarStylsheet(height: number) {
  return `
      #sidebar {
        display:'flex';
        min-height:${height}px;
        max-height:${height}px;border:0;
      
      }
  
      #sidebar-options {
        min-height:${height}px;
        max-height:${height}px;
        ${backgroundLinearGradient("rgba(25,0,36,0.6)", "rgba(43,52,136,0.7)")}
        flex-direction:'column';
      }
  
      #sidebar-options #button-enabled {
        
        ${backgroundLinearGradient("rgba(110,254,5,1)", "rgba(225,250,12,0.9)")}
        
      }
  
      #sidebar-options #button-disabled {
        
        ${backgroundLinearGradient("rgba(254,130,5,1)", "rgba(196,42,42,0.9)")}
        
      }
      
      #sidebar-options #button-default {
        
        ${backgroundLinearGradient("rgba(5,156,254,1)", "rgba(10,10,199,0.8)")}
        
      }
  `;
}
