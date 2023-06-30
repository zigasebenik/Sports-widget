import './Card.css';
import germanyFLAG from '../assets/germany.jpg';
import italyFLAG from '../assets/italy.png';

import backgroundPRE from "../assets/bg-prematch.jpg";
import backgroundLIVE from "../assets/bg-live.jpg";
import backgroundPOST from "../assets/bg-postmatch.jpg";

function Card({match, tournament, category}) {

    let background = backgroundLIVE;
    let matchStatusColor = "gray";

    switch(match.status._id)
    {
        case 0:
            background = backgroundPRE;
            matchStatusColor = "gray";
            break;
        case 100:
            background = backgroundPOST;
            matchStatusColor = "green";
            break;
        default:
            background = backgroundLIVE;
            matchStatusColor = "orange";
    }

    return (

        <div className="match-card" style={{ backgroundImage: `url(${background})` }} >
            <table>
                <tbody>
                    <tr>
                        <td colSpan="3" className="group-title"> { tournament.name } { tournament.seasontypename?'- '+tournament.seasontypename:'' }</td>
                    </tr>
                    <tr>
                        <td colSpan="3" className="group-sub-title"> {category.name}</td>
                    </tr>
                    
                    <tr>
                        <td> 
                            <div className="flag-format border">
                                {<img src={"http://img.sportradar.com/ls/crest/big/"+match.teams.home.uid+".png"} alt="UNAVAIABLE" width="100%" height="100%"/>}
                            </div> 
                            <div className="country-text">{match.teams.home.name}</div> 
                        </td>
                        
                        <td className="versus-text">
                            <p className="versus-margin">VS</p>
                            <div className="normal-text">{match._dt.time}<br/>{match._dt.date} </div>
                        </td>

                        <td> 
                            <div className="flag-format">
                                <img src={"http://img.sportradar.com/ls/crest/big/"+match.teams.away.uid+".png"} alt="UNAVAIABLE" width="100%" height="100%"/>
                                
                            </div> 
                            <div className="country-text">{match.teams.away.name}</div> 
                        </td>
                    </tr>
                    

                    <tr>
                        <td></td>
                        <td>
                            <div className="match-status normal-text" style={{backgroundColor: matchStatusColor}}>{match.status.name}</div>
                        </td>     
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Card;
