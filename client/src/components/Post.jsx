import React from 'react';
import { Button, Modal, Container, Col, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react'; 
import '../css/Post.css'
//import axios from 'axios';
import PlayerProfile from './PlayerProfile';
import moment from 'moment'

function Post(props) {

  //TODO: replace champion object with just the full image name 

  const {postInfo, date} = props.post;
  const {
    name,
    position,
    comment,
    profileIconId,
    league,
    numGames,
    kda,
    mostPlayedChamps
  } = postInfo; 

  const version = props.version; 

  const [show, setShow] = useState(false);
  const toggleProfileModal = () => setShow(!show); 

  useEffect(() => {
     

  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const logStuff = async () => {
    console.log(date);
    console.log(postInfo);

  }

  const getWinRate = () => {
    let totalGames = numGames.wins + numGames.losses; 
    let winRate = numGames.wins / totalGames; 
    return (winRate * 100).toFixed(); 
  }

  const champs = mostPlayedChamps.map((champ, index) => (
    <Col className='col-3 py-2' key={champ[0].id + index}>
      <img className='img-fluid' 
        src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ[0].image.full}`}
        alt={champ[0].name}
      />
    </Col>
  ));
  


  return (
      <div className='mt-3 pt-2 border border-primary border-2'>
        <Container>
          <Row>
            <Col className='d-inline-flex col-3 my-auto'>
              <Col className='profile-icon'>
                <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`}
                  alt={profileIconId}
                  className='img-fluid rounded-circle'
                />
              </Col>
              <h4 className='my-auto' onClick={toggleProfileModal}>{name}</h4> 
            </Col>
            {/*
            <Col className='my-auto'>
              <Button onClick={logStuff}>log</Button>
            </Col>
            */}
            <Col className='my-auto text-end'>
              {moment(date).fromNow()}
            </Col>
            
          </Row>

          <Row className='mt-2 border-bottom border-top'>
            <Col>
              <small>Tier</small>
            </Col>
            <Col>
              <small>Position</small>
            </Col>
            <Col>
              <small>Latest Champions</small>
            </Col>
            <Col>
              <small>KDA</small>
            </Col>
            <Col>
              <small>Win Rate</small>
            </Col>
            <Col>
              <small>Comment</small>
            </Col>
          </Row>

          <Row>
            <Col className='my-auto d-inline-flex'>
              <Col className='col-2 me-1'>
                <img className='img-fluid' 
                  src={process.env.PUBLIC_URL + `images/ranked-emblems/Emblem_${league.tier}.png`}
                  alt={league.tier}
                />
              </Col>
              <b className='my-auto'>{league.tier + ' ' + league.rank}</b>
            </Col>
            <Col className='my-auto'>
              <Col className='col-3'>
                <img className='img-fluid' 
                  src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-${position}.png`}
                  alt={position}
                />
              </Col>
            </Col>
            <Col className='d-inline-flex my-auto'>
              {champs} 
            </Col>
            <Col className='my-auto'>
              <b>{kda.avgKills + ' / ' + kda.avgDeaths + ' / ' + kda.avgAssists}</b>
            </Col>
            <Col className='my-auto'>
              <b>{numGames.wins + 'W ' + numGames.losses + 'L (' + getWinRate() + '%)'}</b>
            </Col>
            <Col className='my-auto border'>
              <b>{comment}</b>
            </Col>
          </Row>
        </Container>


        <Modal show={show} onHide={toggleProfileModal} backdrop='static' size='lg' centered>
          <PlayerProfile postInfo={postInfo}></PlayerProfile>
        </Modal>
      </div>
  )
}

export default Post;
