import { getPercentFromValue } from "../../../helpers/node-gui-responsive-helpers";
import { backgroundLinearGradient } from "../../styles";

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
        ${backgroundLinearGradient("rgba(25,0,36,0.6)", "rgba(43,52,136,0.7)")}
        flex-direction:'column';
      }
      
      #button-active {
        color:orange;
      }

      #button-enabled {
        ${backgroundLinearGradient("rgba(110,254,5,1)", "rgba(225,250,12,0.9)")}
      }
  
      #button-disabled {
        ${backgroundLinearGradient("rgba(254,130,5,1)", "rgba(196,42,42,0.9)")}
      }
      
      #button-default {
        ${backgroundLinearGradient("rgba(5,156,254,1)", "rgba(10,10,199,0.8)")}
        color:white;
      }

      #auto-champion-pick-wrapper {
        ${backgroundLinearGradient("rgba(25,0,36,0.6)", "rgba(43,52,136,0.7)")}
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

      #auto-champion-roles-wrapper #assigned-champions-to-position {
        display:'flex';
        flex-direction:'column';
      }

      #auto-champion-roles-wrapper #assigned-champions-to-position-header {
        color:yellow;
        padding:1px;
        padding-vertical:4px;
      }
      
      #auto-champion-roles-wrapper QWidget{
        color:white;
      }

      #auto-champion-roles-wrapper > QWidget {
        display:'flex';
        flex-direction:'row';
      }

      #auto-champion-roles-wrapper QLabel {
        margin: 1px; padding:1px;
        color:white;
        max-width:${getPercentFromValue(width, 4)}px;
        ${backgroundLinearGradient("rgba(25,0,36,0.6)", "rgba(43,52,136,0.7)")}
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
        ${backgroundLinearGradient("rgba(25,0,36,0.6)", "rgba(43,52,136,0.7)")}
      }
  `;
}
