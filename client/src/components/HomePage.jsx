import React, { useState } from 'react';
import axios from 'axios'; 

function HomePage() {
  const [summoner, setSummoner] = useState({name: ''});
  const [matchHistory, setMatchHistory] = useState([])

  const handleSubmit = e => {
    e.preventDefault(); 
    console.log(summoner.name); 

    axios.get('/riotAPI/get-summoner', {
        params: {
          name: summoner.name
        }
      })
      .then((res) => {
        setMatchHistory(res.data);
      });
    
    console.log(matchHistory);
  }


  return (
    <>
    
    </>
  )
}

export default HomePage