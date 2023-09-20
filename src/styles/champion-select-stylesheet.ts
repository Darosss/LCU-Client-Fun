import { getPercentFromValue } from "@helpers";
import { backgroundLinearGradient } from "./styles-helpers";
import {
  infoLinearGradient,
  primaryLinearGradient,
  successLinearGradient,
} from "./colors";

export function champselectStyleSheet(width: number, height: number) {
  const minMaxSizes = {
    actionsWidth: ~~getPercentFromValue(width, 17),
    summonerActionBtnWidth: ~~getPercentFromValue(width, 30),
    summonerActionBtnHeight: ~~getPercentFromValue(height, 5),
    summonerSpellsWidgets: ~~getPercentFromValue(width, 7),
    summonerDisplayName: ~~getPercentFromValue(width, 11),
    summonerAssignedPosition: ~~getPercentFromValue(width, 6),
    teamBansWidth: ~~getPercentFromValue(width, 30),
    teamBansWidthLabels: ~~getPercentFromValue(width, 4),
    champsWrapperWidgetsMargins: ~~getPercentFromValue(width, 34),
    champsWrapperHeight: ~~getPercentFromValue(height, 90),
    champsWrapperWidth: ~~getPercentFromValue(width, 70),
    actionsHeight: ~~getPercentFromValue(height, 5),
    championImagesWidth: ~~getPercentFromValue(width, 5),
    championImagesHeight: ~~getPercentFromValue(width, 7),
    runesWrapperWidth: ~~getPercentFromValue(width, 70),
    runesWrapperHeight: ~~getPercentFromValue(height, 80),
    currentRunePageActionsWidth: ~~getPercentFromValue(height, 5),
    runesImagesWidth: ~~getPercentFromValue(width, 4),
    runesImagesHeight: ~~getPercentFromValue(width, 4),
    runesPageBtnWidth: ~~getPercentFromValue(width, 10),
    recommendedRunesPageWidth: ~~getPercentFromValue(width, 18),
  };
  return `

    #champ-select-wrapper, #champ-select-runes-wrapper {
        flex:1;
        min-height:${minMaxSizes.champsWrapperHeight}px;
        max-height:${minMaxSizes.champsWrapperHeight}px;
        ${primaryLinearGradient}

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

    #summoner-action-btn-wrapper {
        display:'flex';
        align-items:'center';
    }

    #summoner-action-btn-wrapper > QPushButton{
        max-width:${minMaxSizes.summonerActionBtnWidth}px;
        min-width:${minMaxSizes.summonerActionBtnWidth}px;
        max-height:${minMaxSizes.summonerActionBtnHeight}px;
        min-height:${minMaxSizes.summonerActionBtnHeight}px;
        font-size: ${~~minMaxSizes.summonerActionBtnHeight / 2}px;
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
        font-weight:700;
        padding:2px;
        flex-shrink:1;
        width:100px;
    }
    
    #available-champs > QWidget {
        margin:1px;
    }

    #available-champs-images-wrapper {
        display:'flex';
        min-height:${minMaxSizes.championImagesHeight}px;
        max-height:${minMaxSizes.championImagesHeight}px;
        min-width:${minMaxSizes.championImagesWidth}px;
        max-width:${minMaxSizes.championImagesWidth}px;
    }

    #available-champs-images-wrapper:hover {
        background:green;
    }

    #available-champs-images-wrapper #champ-image {
        flex: 1;
        qproperty-alignment: 'AlignCenter';
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

    #summoner-action {
        display:'flex';
        min-height:${minMaxSizes.actionsHeight}px;
        max-height:${minMaxSizes.actionsHeight}px;
        ${backgroundLinearGradient(`rgba(12,31,44,1)`, `rgba(12,123,12,0.7)`)} 
        padding-right:5px;
    }

    #summoner-action > QWidget {
        flex-grow: 1;
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

    #champion-select-current-rune-page {
        min-height:${minMaxSizes.runesWrapperHeight}px;
        max-height:${minMaxSizes.runesWrapperHeight}px;
        min-width:${minMaxSizes.runesWrapperWidth}px;
        max-width:${minMaxSizes.runesWrapperWidth}px;
        display:'flex';
        justify-content:'center';
    }

    #champion-select-rune-page-actions {
        display:'flex';
        flex-direction:'row';
        justify-content:'center';
        min-height:${minMaxSizes.currentRunePageActionsWidth}px;
        max-height:${minMaxSizes.currentRunePageActionsWidth}px;
    }
    

    #champion-select-rune-page-actions > QLabel {
        padding:2px;
        margin-left:2px;
    }


    #champion-select-runes-pages-list {
        display:'flex';
        flex-direction:'row';
        flex-wrap:'wrap';
        max-width:700px;
    }

    #champion-select-runes-pages-list > QPushButton {
        max-width:${minMaxSizes.runesPageBtnWidth}px;
        min-width:${minMaxSizes.runesPageBtnWidth}px;
    }

    #rune-style-slots-wrapper {
        display:'flex'; 
        justify-content:'space-between';
        flex-direction:'row';
    }

    #rune-style-slots-wrapper > QWidget {
        padding:2px;
        border:2px solid yellow;
    }

    #rune-style-slot {
        display:'flex'; 
        flex-direction:'row';
        margin-top:1px; 
        border-bottom:1px solid blue;
        ${primaryLinearGradient}
    }

    #rune-style-slot > QWidget:hover {
        ${infoLinearGradient}
    }

    #rune-image {
        flex: 1;
        qproperty-alignment: 'AlignCenter';
    }

    #rune-image-wrapper {
        max-width:${minMaxSizes.runesImagesWidth}px;
        min-width:${minMaxSizes.runesImagesWidth}px;
        max-height:${minMaxSizes.runesImagesHeight}px;
        min-height:${minMaxSizes.runesImagesHeight}px;
    }

    #recommended-runnes-for-champion-wrapper {
        display:'flex'; 
        flex-direction:'row'; 
        justify-content:'space-between'; 
    }

    #recommended-runes-for-champion-actions{
        display:'flex'; 
    }

    #recommended-runes-for-champion-list {
        max-width:${minMaxSizes.recommendedRunesPageWidth}px;
        min-width:${minMaxSizes.recommendedRunesPageWidth}px;
        display:'flex';
        flex-direction:'row';
        flex-wrap:'wrap';
        border-top:2px solid blue
    }

    #recommended-runes-for-champion-list:hover{
        ${successLinearGradient}
    }

    #recommended-spells-for-champion-list {
        display:'flex';
        flex-direction:'row';
        justify-content:'space-between';
        align-items:'center';
    }
`;
}
