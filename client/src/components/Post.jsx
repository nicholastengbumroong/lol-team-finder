import React, { useState } from 'react';
import { Modal, Container, Col, Row, Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../css/Post.css'
import PlayerProfile from './PlayerProfile';
import moment from 'moment'

function Post(props) {

  //TODO: replace champion object with just the full image name 

  const {postInfo, date, isVerified, _id} = props.post;
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

  const getWinRate = () => {
    let totalGames = numGames.wins + numGames.losses; 
    let winRate = numGames.wins / totalGames; 
    if (!winRate) {
      return 0;
    }
    else {
      return (winRate * 100).toFixed(); 
    }
    
  }

  const champs = mostPlayedChamps.map((champ, index) => (
    <Col className='col-3 py-2' key={champ[0].id + index}>
      <img className='img-fluid' 
        src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ[0].image.full}`}
        alt={champ[0].name}
      />
    </Col>
  ));
  

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Verified
    </Tooltip>
  );


  return (
      <div className='mb-3 pt-2 border rounded-3 border-dark border-2 bg-dark'>
        <Container>
          <Row className='text-light'>
            <Col className='d-inline-flex col-3 my-auto'>
              <Col className='profile-icon'>
                <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`}
                  alt={profileIconId}
                  className='img-fluid rounded-circle'
                />
              </Col>
              <Col className='d-inline-flex my-auto'>
                <h4 className='my-auto me-2' onClick={toggleProfileModal}>{name}</h4>
                <OverlayTrigger 
                  placement='top' 
                  delay={{ show: 200, hide: 200 }}
                  overlay={renderTooltip}
                >
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-check2" viewBox="0 0 16 16">
                      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                    </svg> 
                  </div>
                  
                </OverlayTrigger>
                
              </Col>
              
            </Col>

            <Col className='my-auto text-end'>
              {moment(date).fromNow()}
            </Col>
            
          </Row>

          <Row className='text-white-50 mt-2 border-bottom border-top border-light'>
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

          <Row className='text-light my-2 flex-nowrap'>
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
            <Col className='my-auto comment-textbox'>
              <div className='my-1'>
                {comment}
              </div>
            </Col>
          </Row>
        </Container>


        <Modal show={show} onHide={toggleProfileModal} backdrop='static' size='lg' centered>
          <PlayerProfile  
            postInfo={postInfo}  
            id={_id} 
            version={version}
            toggleProfileModal={toggleProfileModal}
            updatePosts={props.updatePosts}
          />
        </Modal>
      </div>
  )
}

export default Post;
