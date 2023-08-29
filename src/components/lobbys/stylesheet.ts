import { backgroundLinearGradient } from "../styles";

export const headLobbyStyleSheet = `
    #head-lobby {
        display:'flex';
        flex-direction:'column';
        justify-content:'center';
        align-items:'center'
    }

    #head-lobby > #head-lobby-header{
        
    }


`;

export function lobbysStylesheet(
  minWidthTeam: number,
  minMaxWidthOpts: number
) {
  return `
    #eligible-lobbys-wrapper {
        position:'relative';
        display:'flex';
        flex-direction:'column';
        justify-content:'center';
        align-items:'center';
    }

    #eligible-lobbys-wrapper > QWidget {
        display:'flex';
        flex-direction:'row';
        flex-wrap:'wrap';
        justify-content:'space-between';
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


    #custom-lobby > QWidget > QLabel{
        color:white;

    }

    #custom-lobby QPushButton{
        ${backgroundLinearGradient("rgba(25,0,36,0.6)", "rgba(43,52,136,0.7)")}
        color:white;
        
    }

    #custom-lobby-teams-view{
        display:'flex';
        flex-direction:'row';
        border:1px solid yellow;
        min-height:200px;
        padding:1px;
        flex-wrap:'wrap';
    }

    #custom-lobby-teams-options{
        min-width:${minMaxWidthOpts};
        max-width:${minMaxWidthOpts};
    }


    #custom-lobby-teams-view-team {
        min-width:${minWidthTeam};
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


    #leave-lobby-btn{
        ${backgroundLinearGradient("rgba(2,0,36,1)", "rgba(136,52,64,1)")}
        color:white;
    }

    #hide-show-lobbys-list-btn {
        ${backgroundLinearGradient(`rgba(100,166,25,1)`, `rgba(44,18,36,1)`)}
        
        color:white;
    }

    #eligible-lobbys-filter-wrapper {
        display:'flex';
        flex-direction:'row';
        margin-vertical:5px;
    }

    #eligible-lobbys-filter-wrapper > QWidget {
        ${backgroundLinearGradient(`rgba(100,166,25,1)`, `rgba(44,18,36,1)`)}
        color:white;
        padding:0;
    }
   

    #lobbys-list {
        display:'flex';
        flex-direction:'row';
        flex-wrap:'wrap';
    }

    #lobbys-list > QWidget {
        ${backgroundLinearGradient(`rgba(2,0,36,0.7)`, `rgba(87,20,29,0.5)`)}
        flex: 0 0 20%;
        flex-grow:1;
        color:white;
    }

    #show-hide-lobbys-btn {
        ${backgroundLinearGradient(`rgba(43,54,36,0.7)`, `rgba(87,20,123,0.5)`)}
        color:white;
    }


`;
}
