import { backgroundLinearGradient } from "../../styles";

export const roleAndChampionStyle = `
  ${backgroundLinearGradient(`rgba(90,254,99,1)`, `rgba(225,250,12,0.7)`)} 
  border:1px solid yellow;
`;

export const summonerSpellsStyle = `
  ${backgroundLinearGradient(`rgba(45,123,99,1)`, `rgba(12,123,12,0.7)`)} 
  border:1px solid yellow;
`;

export const currentActionStyle = `
  ${backgroundLinearGradient(`rgba(12,31,44,1)`, `rgba(12,123,12,0.7)`)} 
  border:1px solid yellow;
`;

export const summonerSpellBtnStyle = `
  ${backgroundLinearGradient(`rgba(120,240,240,1)`, `rgba(90,90,12,0.7)`)} 
`;

export const changeSummonerSpellViewStyle = `
    display:'flex';
  flex-wrap:'wrap';
  flex-direction:'row';
  max-width:150px;  
`;

export const changeSummonerSpellBtnStyle = `
  ${backgroundLinearGradient(`rgba(90,90,12,0.7)`, `rgba(120,240,240,1)`)} 
`;

export const currentSummonerSpellsBtnWrapper = `
  display:'flex';
  flex-direction:'row';
  margin-bottom:5px;
`;

export const activeChangeSummonerSpellBtnStyle = `
  color:'yellow';
`;
