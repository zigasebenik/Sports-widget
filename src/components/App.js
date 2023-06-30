//import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import MatchCarousel from './MatchCarousel';

function App() {

    const [activeTab, setActiveTab] = useState("tab1");

    const handleTab1 = () => {
        // update the state to tab1
        setActiveTab("tab1");
      };
      const handleTab2 = () => {
        // update the state to tab2
        setActiveTab("tab2");
      };

    return(

        <div className="Tabs">
            {/* Tab nav */}

            <table className="nav">
                <thead>
                    <tr>
                        <th className={activeTab === "tab1" ? "active" : ""}  onClick={handleTab1}>Max number of matches</th>
                        <th className={activeTab === "tab2" ? "active" : ""}  onClick={handleTab2}>Sport1 and Sport2</th>
                    </tr>
                </thead>
                
            </table>

            
            
            <div className="outlet">
                {activeTab === "tab1" ? 
                    <MatchCarousel  max={10} isActive={activeTab === "tab1"}/> : 
                    (<div><MatchCarousel sportId={1} /> <MatchCarousel sportId={2} isActive={activeTab === "tab2"}/></div>)}
            </div>
        </div>

    );
    
}


export default App;
