import { getPercentFromValue } from "@helpers";
import { primaryLinearGradient, successLinearGradient } from "./colors";

export function lobbysStylesheet(width: number, height: number) {
  const lobbysSizes = {
    contentWidth: ~~getPercentFromValue(width, 70),
    oneMemberWrapper: ~~getPercentFromValue(height, 20),
    oneMemberWraperQLabel: ~~getPercentFromValue(width, 12),
    positionSelectorWrapperChilds: ~~getPercentFromValue(width, 25),
    customLobbyTeamOptions: ~~getPercentFromValue(width, 10),
    customLobbyTeamsViewTeam: ~~getPercentFromValue(width, 25),
  };
  return `
    #eligible-lobbys-wrapper {
        position:'relative';
        flex-direction:'column';
        justify-content:'center';
        align-items:'center';
    }

    #eligible-lobbys-wrapper > QWidget {
        min-width:${lobbysSizes.contentWidth}px;
        max-width:${lobbysSizes.contentWidth}px;
    }


    #search-match-btn-wrapper {
        display:'flex';
        justify-content:'center';
        align-items:'center';
    }

    #search-match-btn-wrapper QPushButton {
        padding:10px;
    }

    #default-queue-wrapper > QWidget {
        flex-grow:1; 
    }

    #default-queue-wrapper #position-selector {
        display:'flex';
        flex-direction:'row';
        justify-content:'space-around';
    }

    #possible-positions-selection {
        display:'flex';
        flex-direction:'row';
        flex-wrap:'wrap';
    }

    #lobby-members-wrapper {
        display:'flex';
        justify-content:'space-between';
        align-items:'center';
        flex-direction:'row';
        ${primaryLinearGradient}
    }

    #lobby-members-wrapper #lobby-one-member-wrapper {
        display:'flex';
        justify-content:'space-around';
        align-items:'center';   
        ${successLinearGradient}
        min-height:${lobbysSizes.oneMemberWrapper}px;  

    }
    
    #lobby-members-wrapper #lobby-one-member-wrapper QLabel {
        font-size:${lobbysSizes.oneMemberWraperQLabel}px;
        font-weight:800;
        min-width:${lobbysSizes.oneMemberWraperQLabel}px;
        max-width:${lobbysSizes.oneMemberWraperQLabel}px;
        padding:3px;
        margin-top:1px;
    }

    #lobby-members-wrapper #lobby-one-member-position-preferences-wrapper {
        display:'flex';
        justify-content:'center';
        align-items:'center';

    }

    #default-queue-wrapper #position-selector {
        display:'flex';
        justify-content:'space-around';
    }

    #default-queue-wrapper #position-selector > QWidget {
        min-width:${lobbysSizes.positionSelectorWrapperChilds}px;
        max-width:${lobbysSizes.positionSelectorWrapperChilds}px;
    }

    #custom-lobby {
        display:'flex';
        flex-direction:'row';
    }

    #custom-lobby > QWidget{
        display:'flex';
        flex-direction:'column';
        align-items:'center';
        justify-content:'center';
        
    }

    #custom-lobby-teams-view{
        display:'flex';
        flex-direction:'row';
        border:1px solid yellow;
        min-height:200px;
        flex-wrap:'wrap';
        min-width:${lobbysSizes.contentWidth}px;
        max-width:${lobbysSizes.contentWidth}px;
    }

    #custom-lobby-teams-options{
        min-width:${lobbysSizes.customLobbyTeamOptions}px;
        max-width:${lobbysSizes.customLobbyTeamOptions}px;
    }

    #custom-lobby-teams-view-team {
        min-width:${lobbysSizes.customLobbyTeamsViewTeam}px;
        display:'flex';
        justify-content:'space-between';
        border-left:1px solid yellow;
        padding:2px;
    }

    #custom-lobby-teams-view QPushButton {
        padding:5px;
    }

    #list-of-team-members {
        display:'flex';
    }

    #list-of-team-members > QWidget{
        display:'flex';
        flex-direction:'row';
        flex-wrap:'wrap';
    }

    #list-of-team-members > QWidget > QWidget{
        display:'flex';
        flex-direction:'row';
    }

    #summoner-in-lobby-wrapper {
        display:'flex';
        flex-direction:'row';
    }

    #leader-bot-actions-wrapper {
        display:'flex';
        flex-direction:'row';
        flex-wrap:'wrap';
    }

    #leader-bot-actions-change-bot {
        display:flex;
        flex-direction:'row';
        justify-content: 'space-between';
        align-items:'center';
    }

    #leader-bot-actions-change-bot > QLineEdit {
        margin-left:5px;
    }

    #eligible-lobbys-filter-wrapper {
        display:'flex';
        flex-direction:'row';
        margin-vertical:5px;
    }

    #lobbys-list {
        display:'flex';
        flex-direction:'row';
        flex-wrap:'wrap';
    }

    #lobbys-list > QWidget {
        flex-grow:1;
    }

    #default-queue-wrapper {
        display:'flex';
        flex-direction:'row';
    }
`;
}
