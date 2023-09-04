import { getPercentFromValue } from "@helpers";
import { primaryLinearGradient } from "./colors";

export function sidebarStylsheet(width: number, height: number) {
  return `
      #sidebar {
        display:'flex';
        min-height:${height}px;
        max-height:${height}px;border:0;
      }
  
      #sidebar-options {
        min-height:${height}px;
        max-height:${height}px;
        flex-direction:'column';
        ${primaryLinearGradient}
      }
      
      #button-active {
        color:orange;
      }

      #auto-champion-pick-wrapper,#general-options-wrapper  {
        ${primaryLinearGradient}
      }

      #auto-champion-pick-search-wrapper {
        display:'flex';
        flex-direction:'row';
      }

      #auto-champion-pick-all-champions {
        display:'flex';
        flex-wrap:'wrap';
      }

      #auto-champion-roles-wrapper {
        display:'flex';
        flex-direction:'row';
        border-bottom:1px solid yellow;
      }

      #assigned-champions-to-position {
        display:'flex';
        flex-direction:'column';
      }

      #assigned-champions-to-position > QPushButton {
        color:yellow;
        padding:1px;
        padding-vertical:4px;
      }
      
      #auto-champion-roles-wrapper QLabel {
        margin: 1px; padding:1px;
        max-width:${getPercentFromValue(width, 4)}px;
      }

      #auto-champion-actions > QWidget {
        display:'flex';
        flex-direction:'row';
        flex-wrap:'wrap';
        justify-content:'center';
        align-items:'center';
      }

      
      #auto-champion-actions QPushButton {
        padding:4px; 
      }

      #auto-champion-actions QLabel{
        display:'flex';
        justify-content:'center';
        align-items:'center';
        color:white;
        flex-grow:1;
      }
  `;
}
