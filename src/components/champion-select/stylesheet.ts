import { getPercentFromValue } from "@helpers";
import { backgroundLinearGradient } from "../styles";

export function champselectStyleSheet(width: number, height: number) {
  return `
    #champ-select-title-wrapper{
        display:flex;
        justify-content:'center';
        align-items:'center';
        ${backgroundLinearGradient(`rgba(90,166,25,1)`, `rgba(0,18,36,1)`)}

    }

    #champ-select-title-wrapper > QWidget {
        color:white;
        display: 'flex'; 
        flex-direction:'row';
        justify-content: 'center';
        align-items:'center';
    }

    #champ-select-title-wrapper > #time-left-text {
        font-size: 20px;
    }

    #champ-select-title-wrapper > #bans-in-phase-wrapper{
        display:'flex';
        flex-direction:'row';
        justify-content:'space-between';
    }

    #bans-in-phase-wrapper > QWidget {
        background:red;
        display:'flex';
        flex-direction:'row';
        justify-content:'space-between';
        margin-horizontal:  ${~~getPercentFromValue(width, 8)}px;
        width:${~~getPercentFromValue(width, 17)}px;
        ${backgroundLinearGradient(`rgba(90,166,25,1)`, `rgba(0,18,36,1)`)}
        padding:5px;
    }

    #bans-in-phase-wrapper > #bans-in-phase-ally QLabel{
        color:yellow;
        border:1px solid yellow;
    }

    #bans-in-phase-wrapper > #bans-in-phase-enemy QLabel {
        color:red;
        border:1px solid red;
    }

 

    #pick-ban-button {
        color:white;
        ${backgroundLinearGradient(`rgba(165,166,25,1)`, `rgba(0,18,36,1)`)}
    }

    #available-champs-wrapper {
        display:'flex'; 
        flex-direction:'column';
        max-height:${getPercentFromValue(height, 70)}px;
        overflow:'hidden';
    }

    #available-champs-search {
        display: 'flex';
        justify-content:'center';
        align-items:'center';
        flex-direction:'row';
    }

    #available-champs-search > QLineEdit{
        ${backgroundLinearGradient(`rgba(100,166,25,1)`, `rgba(44,18,36,1)`)}
        color:white;
    }
    #available-champs-search > QLabel{
        ${backgroundLinearGradient(`rgba(100,166,25,1)`, `rgba(44,18,36,1)`)}
        color:white;
        border:1px solid white;
    }

    #available-champs {
        display:'flex';
        flex-direction:'row';
        flex-wrap:'wrap';
        justify-content:'center';
        align-items:'center';

    }

    #available-champs > QPushButton {
        ${backgroundLinearGradient(`rgba(2,0,36,0.7)`, `rgba(87,20,29,0.5)`)}
        border:1px solid blue;
        font-weight:700;
        padding:2px;
        flex-shrink:1;
        width:100px;
        color:yellow;
    }
    #available-champs > QPushButton:hover {
        color:red;
        ${backgroundLinearGradient(`rgba(2,0,36,0.4)`, `rgba(20,20,29,0.5)`)}
    }

    #available-champs #disabled-champion-btn {
        color:red;
        ${backgroundLinearGradient(`rgba(12,31,44,1)`, `rgba(12,123,12,0.7)`)} 
    }

    #teams-champions-wrapper {
        display:'flex';
        flex-direction:'row';
        justify-content:'space-around';

    }

    #teams-champions-wrapper > QWidget {
        flex: 0 0 10%;
        margin-left:${~~getPercentFromValue(width, 34)}px; 
        margin-right:${~~getPercentFromValue(width, 34)}px;
        
    }

    #team-view {
        display:'flex';
    }

    #team-view > QWidget {
        display:'flex';
        flex-direction:'column';
        border-bottom:2px solid black;
        margin-top:5px;
    }

    #team-view QWidget {
        color:black;
        font-weight:700;
    }

    #team-view > QWidget > QWidget {
        display:'flex';
        flex-direction:'row';
        padding-vertical:4px;
        min-width:${getPercentFromValue(width, 17)}px;
        max-width:${getPercentFromValue(width, 17)}px;
    }

    #team-view > QWidget > QWidget > QLabel{
        margin-left:5px;
    }

    #team-summoners-blocks-wrapper > QWidget {
        border:1px solid yellow;
    }

    #summoner-role-champion-wrapper{
        ${backgroundLinearGradient(
          `rgba(90,254,99,1)`,
          `rgba(225,250,12,0.7)`
        )} 
    }

    #summoner-spells-wrapper {
        ${backgroundLinearGradient(`rgba(45,123,99,1)`, `rgba(12,123,12,0.7)`)} 
    }

    #summoner-current-action {
        ${backgroundLinearGradient(`rgba(12,31,44,1)`, `rgba(12,123,12,0.7)`)} 
    }


    #current-summoner-spells-btn-wrapper {
        display:'flex';
        flex-direction:'row';
        margin-bottom:5px;
    }  

    #current-summoner-spells-btn-wrapper > QPushButton {
        ${backgroundLinearGradient(`rgba(120,240,240,1)`, `rgba(90,90,12,0.7)`)}
        border:1px solid yellow;
        padding:6px;
    }

    #change-summoner-spell-view {
        display:'flex';
        flex-wrap:'wrap';
        flex-direction:'row';
        max-width:${getPercentFromValue(width, 17)}px;
    }

    #change-summoner-spell-btn {
        ${backgroundLinearGradient(`rgba(90,90,12,0.7)`, `rgba(120,240,240,1)`)}
    }
`;
}
