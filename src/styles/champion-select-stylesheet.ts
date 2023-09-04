import { getPercentFromValue } from "@helpers";
import { backgroundLinearGradient } from "./styles-helpers";

export function champselectStyleSheet(width: number, height: number) {
  const minMaxSizes = {
    actionsWidth: ~~getPercentFromValue(width, 17),
    summonerSpellsWidgets: ~~getPercentFromValue(width, 7),
    summonerDisplayName: ~~getPercentFromValue(width, 11),
    summonerAssignedPosition: ~~getPercentFromValue(width, 6),
    teamBansWidth: ~~getPercentFromValue(width, 30),
    teamBansWidthLabels: ~~getPercentFromValue(width, 4),
    champsWrapperWidgetsMargins: ~~getPercentFromValue(width, 34),
    champsWrapperHeight: ~~getPercentFromValue(height, 70),
  };
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
        display:'flex';
        flex-direction:'row';
        justify-content:'space-around';
        min-width:${minMaxSizes.teamBansWidth}px;
        max-width:${minMaxSizes.teamBansWidth}px;
        ${backgroundLinearGradient(`rgba(90,166,25,1)`, `rgba(0,18,36,1)`)}
        padding:5px;
    }

    #bans-in-phase-wrapper QLabel {
        min-width:${minMaxSizes.teamBansWidthLabels}px;
        max-width:${minMaxSizes.teamBansWidthLabels}px;
        color:white;
        padding:5px;
    }

    #bans-in-phase-wrapper > #bans-in-phase-ally QLabel{
        ${backgroundLinearGradient(
          `rgba(48,103,25,0.59)`,
          `rgba(89,197,43,0.59)`
        )}
    }

    #bans-in-phase-wrapper > #bans-in-phase-enemy QLabel {
        ${backgroundLinearGradient(
          `rgba(202,31,37,0.8)`,
          `rgba(101,69,70,0.8)`
        )}
    }

    #pick-ban-button {
        color:white;
        ${backgroundLinearGradient(`rgba(165,166,25,1)`, `rgba(0,18,36,1)`)}
    }

    #available-champs-wrapper {
        display:'flex'; 
        flex-direction:'column';
        max-height:${minMaxSizes.champsWrapperHeight}px;
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
        margin-left:${minMaxSizes.champsWrapperWidgetsMargins}px; 
        margin-right:${minMaxSizes.champsWrapperWidgetsMargins}px;
        
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
        min-width:${minMaxSizes.actionsWidth}px;
        max-width:${minMaxSizes.actionsWidth}px;
    }

    #team-view > QWidget > QWidget > QLabel{
        margin-left:5px;
    }

    #summoner-assigned-position{
        min-width:${minMaxSizes.summonerAssignedPosition}px;
        max-width:${minMaxSizes.summonerAssignedPosition}px;
    }

    #summoner-display-name{
        min-width:${minMaxSizes.summonerDisplayName}px;
        max-width:${minMaxSizes.summonerDisplayName}px;
    }

    #team-summoners-blocks-wrapper > QWidget {
        border:1px solid yellow;
    }

    #summoner-role-champion-wrapper {
        ${backgroundLinearGradient(`rgba(90,254,99,1)`, `rgba(225,250,12,0.7)`)}
         
    }

    #summoner-spells-wrapper {
        ${backgroundLinearGradient(`rgba(45,123,99,1)`, `rgba(12,123,12,0.7)`)} 
        display:'flex';
        flex-direction:'row';
    }

    #summoner-spells-wrapper QLabel {
        min-width:${minMaxSizes.summonerSpellsWidgets}px;
        max-width:${minMaxSizes.summonerSpellsWidgets}px;
    }

    #summoner-current-action {
        ${backgroundLinearGradient(`rgba(12,31,44,1)`, `rgba(12,123,12,0.7)`)} 
    }
    
    #summoner-current-action QWidget {
        padding-right:3px;
        min-width:${minMaxSizes.actionsWidth}px;
        max-width:${minMaxSizes.actionsWidth}px;
    }

    #current-summoner-spells-btn-wrapper {
        display:'flex';
        flex-direction:'row';
        justify-content:'center';
        min-width:${minMaxSizes.actionsWidth}px;
        max-width:${minMaxSizes.actionsWidth}px;
    }  

    #current-summoner-spells-btn-wrapper > QPushButton {
        ${backgroundLinearGradient(`rgba(120,240,240,1)`, `rgba(90,90,12,0.7)`)}
        border:1px solid yellow;
        padding-vertical:4px;
        min-width:${minMaxSizes.summonerSpellsWidgets}px;
        max-width:${minMaxSizes.summonerSpellsWidgets}px;
    }

    #change-summoner-spell-view {
        display:'flex';
        flex-wrap:'wrap';
        flex-direction:'row';
    }

    #change-summoner-spell-btn {
        ${backgroundLinearGradient(`rgba(90,90,12,0.7)`, `rgba(120,240,240,1)`)}
    }
`;
}
