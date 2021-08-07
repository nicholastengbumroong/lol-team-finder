import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react'; 
import axios from 'axios';
import PlayerProfile from './PlayerProfile';

function Post(props) {
  const {postInfo, date} = props.post; 
  const [show, setShow] = useState(false);
  const toggleProfileModal = () => setShow(!show); 

  const [matchList, setMatchList] = useState([]);
  const [summonerDetails, setSummonerDetails] = useState({name: postInfo.name, profileIconObj: null, summonerLevel: 0})

  useEffect(() => {
     

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const getMatchHistory = async () => {
  //   let res = await axios.get(`/riotAPI/get-summoner-details?name=${post.name}`);
  //   console.log(res.data);  
  //   //setMatchList(res.data); 
  // }

  const logStuff = async () => {
    console.log(date);
    console.log(postInfo);
  }


  return (
    <div>
      <h5><Button onClick={toggleProfileModal}>{postInfo.name}</Button> • <small>{date}</small></h5>
      <p>{postInfo.position}</p>
      <p>{postInfo.comment}</p>
      <Button onClick={logStuff}>debug</Button>
      <Modal show={show} onHide={toggleProfileModal} backdrop='static' size='lg' centered>
        <PlayerProfile summonerDetails={summonerDetails} matchList={matchList}></PlayerProfile>
      </Modal>
    </div>
  )
}

export default Post;
