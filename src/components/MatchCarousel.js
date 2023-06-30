import './MatchCarousel.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';


function MatchCarousel({sportId = 0, max = 10}) {

    const [data, setData] = useState([]);

    let matchCounter = 0;


    useEffect(() => {

        let savedData = window.sessionStorage.getItem('data'+sportId);
        
        if(savedData != null)
        {
            setData(JSON.parse(savedData))
        }
        else
        {
            //axios.get('https://lmt.fn.sportradar.com/demolmt/en/Etc:UTC/gismo/event_fullfeed/'+sportId+'/'1'/12074')
            axios.get('https://lmt.fn.sportradar.com/demolmt/en/Etc:UTC/gismo/event_fullfeed/0/1/12074')
            .then(response => {
                var realcategoriePath = response.data.doc[0].data[sportId].realcategories;
                //console.log(realcategoriePath)
                setData(realcategoriePath)
                window.sessionStorage.setItem('data'+sportId, JSON.stringify(realcategoriePath));
            })
            .catch(error => {
                console.error(error);
            });
        }

    }, []);


    return (
        <Carousel>
            {
                data.map((category, indexCategory)=>{
                    return category.tournaments.map((tournament, indexTournament) => {
                        return tournament.matches.map((match, indexMatch)=>{
                            if(matchCounter < max)
                            {
                                matchCounter++;
                                return (
                                    <div className="carousel-item">
                                        <Card match={match} tournament={tournament} category={category}></Card>
                                    </div>
                                )
                            }  
                            else
                            {
                                return [];
                            }  
                        })
                    })
                }) 
            }  
        </Carousel>   
    );
}

    
function Carousel({ children }) {

    const [activeIndex, setActiveIndex] = useState(0);

    const updateIndex = (newIndex) => {
        if (newIndex >= React.Children.count(children)) {
            newIndex = 0;
        }
        setActiveIndex(newIndex);
    };


    useEffect(() => {
        
    
        const interval = setInterval(() => {
            updateIndex(activeIndex + 1);      
        }, 3000);

        //console.log("IZVEDBA"+activeIndex)
        
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        }; 
    }, [activeIndex, children]);


    return (
        <div className="carousel">
            <div
                className="inner"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
                {
                    React.Children.map(children, (child, index) => {
                        return React.cloneElement(child);
                    })
                }
            </div>
            <div className="indicators">    
                {   
                    React.Children.map(children, (child, index) => {
                    return (
                        <button
                            className={`${index === activeIndex ? "active" : ""}`}
                            onClick={() => {
                                updateIndex(index);
                            }}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default MatchCarousel;