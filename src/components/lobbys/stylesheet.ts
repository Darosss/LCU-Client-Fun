import { backgroundLinearGradient } from "../styles";

export const headLobbyStyleSheet = `
    #head-lobby {
        display:'flex';
        flex-direction:'column';
        justify-content:'center';
        align-items:'center'
    }

    #head-lobby > #head-lobby-header{
        font-size:18px;
    }


`;

export const lobbysStylesheet = `
    #eligible-lobbys-wrapper {
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
        padding:2px;
        min-width:500px;
        align-items:'stretch';
        justify-content:'space-around';
    }

    #custom-lobby-teams-view-team {
        display:'flex';
        justify-content:'space-between';
        border-left:1px solid yellow;
        padding:4px;
    }


    #custom-lobby-teams-view QWidget {
        font-size:15px;

    }

    #list-of-team-members {
        display:'flex';
        margin:2px;
        max-width:250px;
        min-width:250px;
    }

    #list-of-team-members > QWidget{
        display:'flex';
        flex-direction:'row';
        margin-left:3px;
    }

    #list-of-team-members QPushButton {
        min-width:60px;
        font-size:10px;   
    }

    #summoner-in-lobby-wrapper {
        display:'flex';
        flex-direction:'row';
    }

    #leader-bot-actions-wrapper {
        display:'flex';
        flex-direction:'row';
        flex-wrap:'wrap';
        justify-content:'space-between';
        
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
        font-size:20px;
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
        min-width:100px;
        flex-grow:1;
        color:white;
    }

    #show-hide-lobbys-btn {
        ${backgroundLinearGradient(`rgba(43,54,36,0.7)`, `rgba(87,20,123,0.5)`)}
        color:white;
    }


`;
