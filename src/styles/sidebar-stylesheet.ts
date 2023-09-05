import { getPercentFromValue } from "@helpers";
import { primaryLinearGradient } from "./colors";

export function sidebarStylsheet(width: number, height: number) {
  const sidebarSizes = {
    friendList: ~~getPercentFromValue(height, 65),
    friendChat: ~~getPercentFromValue(height, 30),
    autoChampionRolesWrapperQLabel: getPercentFromValue(width, 4),
  };
  return `
      #sidebar {
        display:'flex';
        min-height:${height}px;
        max-height:${height}px;
        border:0;
      }
  
      #auto-champion-pick-wrapper, #general-options-wrapper, #social-window-wrapper  {
        ${primaryLinearGradient}
        min-height:${height}px;
        max-height:${height}px;
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
        max-width:${sidebarSizes.autoChampionRolesWrapperQLabel}px;
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


      /* social-window styles */

      #social-tabs {
        display:'flex';
        min-height:${height}px;
        max-height:${height}px;
      }


      #social-window-wrapper {
        display:'flex';
        flex-direction:'column';
      }

      #logged-in-user-details-wrapper, #friends-list-wrapper {
        ${primaryLinearGradient}
      }

      #friends-list-wrapper {
        display:'flex';
        flex-direction:'column';
        justify-content:'space-between';
      }


      #friends-list {
        max-height:${sidebarSizes.friendList}px;
        min-height: ${sidebarSizes.friendList}px;
        border-bottom:1px solid black;
      }

      #friends-list-chat-wrapper {
        max-height:${sidebarSizes.friendChat}px;
        min-height: ${sidebarSizes.friendChat}px;
      }

      #friend-block-wrapper {
        margin-top:1px;
        display:'flex';
        flex-direction:'row';
        justify-content:'space-between';
      }

      #friend-block-wrapper > #friend-menu-wrapper {
        display:'flex';
      }

      #friend-block-wrapper QLabel {
        padding:5px;
      }

      #invitation-wrapper > QWidget {
        display:'flex';
        flex-direction:'row';
        justify-content:'space-between';
        flex-grow:1;
      }

  `;
}
