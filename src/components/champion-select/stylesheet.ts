import { backgroundLinearGradient } from "../styles";

export const champselectStyleSheet = `
    #champ-select-title-wrapper{
        display:flex;
        justify-content:'center';
        align-items:'center'
    }

    #champ-select-title-wrapper > QWidget {
        font-size:20px;
        display: 'flex'; 
        justify-content: 'center'
    }

    #pick-ban-button {
        font-size:32px;
        color:white;
        ${backgroundLinearGradient(`rgba(165,166,25,1)`, `rgba(0,18,36,1)`)}
    }

    #available-champs-wrapper {
        display:'flex'; 
        flex-direction:'column';
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
        font-size:20px;
    }
    #available-champs-search > QLabel{
        ${backgroundLinearGradient(`rgba(100,166,25,1)`, `rgba(44,18,36,1)`)}
        color:white;
        font-size:20px;
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
        font-size:14px;
        font-weight:700;
        padding:2px;
        flex-shrink:1;
        width:100px
    }
    #available-champs > QPushButton:hover {
        color:red;
        ${backgroundLinearGradient(`rgba(2,0,36,0.4)`, `rgba(20,20,29,0.5)`)}
    }

    #teams-champions-wrapper {
        display:'flex';
        flex-direction:'row';
        justify-content:'space-around';

    }

    #teams-champions-wrapper > QWidget {
        flex: 0 0 10%;
        margin-left:200px; margin-right:200px;
        
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
        justify-content:'center';
        

    }

    #team-view > QWidget > QWidget > QLabel{
        margin-left:5px;
        min-width:70px;
        max-width:70px;
    }
`;
