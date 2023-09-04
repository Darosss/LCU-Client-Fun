import { getPercentFromValue } from "@helpers";
import { backgroundLinearGradient } from "./styles-helpers";
import { infoLinearGradient, primaryLinearGradient } from "./colors";

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
    champsWrapperWidth: ~~getPercentFromValue(width, 70),
  };
  return `

    #champ-select-wrapper {
        min-width:${minMaxSizes.champsWrapperWidth}px;
        max-width:${minMaxSizes.champsWrapperWidth}px;

    }
    #champ-select-title-wrapper{
        display:flex;
        justify-content:'center';
        align-items:'center';
        ${primaryLinearGradient}
        
    }

    #champ-select-title-wrapper > QWidget {
        color:white;
        display: 'flex'; 
        flex-direction:'row';
        justify-content: 'center';
        align-items:'center';
        min-width:${minMaxSizes.champsWrapperWidth}px;
        max-width:${minMaxSizes.champsWrapperWidth}px;
    }

    #time-left-text-wrapper QLabel{
        font-size: 20px;
        min-width:${minMaxSizes.champsWrapperWidth}px;
        max-width:${minMaxSizes.champsWrapperWidth}px;
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
        ${infoLinearGradient}
        padding:5px;
    }

    #bans-in-phase-wrapper QLabel {
        min-width:${minMaxSizes.teamBansWidthLabels}px;
        max-width:${minMaxSizes.teamBansWidthLabels}px;
        padding:5px;
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

    #available-champs {
        display:'flex';
        flex-direction:'row';
        flex-wrap:'wrap';
        justify-content:'center';
        align-items:'center';

    }

    #available-champs > QPushButton {
        border:1px solid blue;
        font-weight:700;
        padding:2px;
        flex-shrink:1;
        width:100px;
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

`;
}
