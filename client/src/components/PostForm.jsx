import  React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Form, ToggleButtonGroup, ToggleButton, Row, Col } from "react-bootstrap";
import axios from "axios";
import '../css/PostForm.css'

function PostForm(props) {
  const [show, setShow] = useState(false); 
  const toggleFormModal = () => setShow(!show); 

  const [isLoading, setIsLoading] = useState(false); 

  const initialPostState = {
    name: '', 
    position: '', 
    comment: '',
    password: '',
    summonerId: '', 
    profileIconId: 0, 
    summonerLevel: 0,
    league: {tier: '', rank: ''},
    numGames: {wins: 0, losses: 0},
    kda: {avgKills: 0, avgDeaths: 0, avgAssists: 0},
    mostPlayedChamps: []

  }

  const [postInfo,  setPostInfo] = useState(initialPostState); 
  const [validated, setValidated] = useState(false); 
  const [validatedText, setValidatedText] = useState('');

  const triggerUseEffectRef = useRef(false); 
  useEffect(() => {
    if(triggerUseEffectRef.current) {
      submitPost(postInfo); 
    }
    else {
      triggerUseEffectRef.current = true;
    }
  }, [postInfo.mostPlayedChamps]) // eslint-disable-line react-hooks/exhaustive-deps

  const clearPostState = () => {
    triggerUseEffectRef.current = false; 
    setPostInfo({...initialPostState});
  };

  const handlePositionSelect = (e) => {
    setPostInfo({...postInfo, position: e.target.value}); 
  }

  const handleChange = (e) => {
    setValidated(false); 
    setPostInfo({...postInfo, [e.target.name]: e.target.value})
  }

  const getSummonerDetails = async () => {
    axios.get(`/riotAPI/get-summoner-details?name=${postInfo.name}`)
      .then(async (res) => {
        setIsLoading(false);
        toggleFormModal();
        let matchHistoryStats = getMatchHistoryStats(res.data.matchHistory, res.data.accountObj.id);
        let mostPlayedChampsArr = await getChampObjs(getMostPlayedChamps(matchHistoryStats.champions, 3));

        setPostInfo({
          ...postInfo,
          name: res.data.accountObj.name, 
          summonerId: res.data.accountObj.id, 
          profileIconId: res.data.accountObj.profileIconId,
          summonerLevel: res.data.accountObj.summonerLevel,
          league: {tier: res.data.rankObj.tier, rank: res.data.rankObj.rank}, 
          numGames: {wins: res.data.rankObj.wins, losses: res.data.rankObj.losses},
          kda: {avgKills: matchHistoryStats.avgKills, avgDeaths: matchHistoryStats.avgDeaths, avgAssists: matchHistoryStats.avgAssists},
          mostPlayedChamps: mostPlayedChampsArr
        });
      })
      .catch((err) => {
        console.log(err); 
        setPostInfo({...postInfo, name: ''});
        setValidatedText('Summoner not found!');
        setValidated(true); 
        setIsLoading(false); 

      });
    
  }

  const getMatchHistoryStats = (matchHistory, summonerId) => {
    let totalKills = 0;
    let totalDeaths = 0;
    let totalAssists = 0; 
    let champions = {}; 
    matchHistory.forEach(match => {
      let participantId = (match.participantIdentities.find(IdObj => IdObj.player.summonerId === summonerId)).participantId;
      let targetParticipant = match.participants.find(participantObj => participantObj.participantId === participantId);
      totalKills += targetParticipant.stats.kills;
      totalDeaths += targetParticipant.stats.deaths;
      totalAssists += targetParticipant.stats.assists; 

      if (targetParticipant.championId in champions) {
        champions[targetParticipant.championId]++; 
      }
      else {
        champions[targetParticipant.championId] = 1; 
      }
    });

    let totalMatches = matchHistory.length;
    return {
      avgKills: ((!(totalKills / totalMatches)) ? 0 : (totalKills / totalMatches).toFixed(1)),
      avgDeaths: ((!(totalDeaths / totalMatches)) ? 0 : (totalDeaths / totalMatches).toFixed(1)), 
      avgAssists: ((!(totalAssists / totalMatches)) ? 0 : (totalAssists / totalMatches).toFixed(1)),
      champions 
    } 
  }

  const getMostPlayedChamps = (champsObj, numOfChamps) => {
    let mostPlayedChamps = [];
    for (let champId in champsObj) {
      mostPlayedChamps.push([champId, champsObj[champId]]);
    }
    mostPlayedChamps.sort((a, b) => {
      return b[1] - a[1]; 
    });
    return mostPlayedChamps.slice(0, numOfChamps); 
  }

  const getChampObjs = async (mostPlayedChamps) => {
    await axios.get(`/riotAPI/get-champion-data`)
      .then((res) => {
        mostPlayedChamps.forEach((champArr) => {
          let champName = res.data.keys[champArr[0]];
          champArr[0] = res.data.data[champName];
        });
      });
    return mostPlayedChamps; 
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (postInfo.name === '') {
      setValidatedText('Summoner name required!');
      setValidated(true);
      return;  
    }

    setIsLoading(true); 
    getSummonerDetails(); 
    
  }


  const submitPost = (postData) => {

    axios({
      url: '/postAPI/submit-post',
      method: 'POST',
      data: postData
    })
    .then(() => {
      console.log('Data has been sent to the server');
      props.updatePosts();
      clearPostState();  
    })
    .catch(() => {
      console.log('There was an error sending data to the server');
    });
  }


  return (
    <>
      <Button className='px-4 py-2 fw-bold' variant='outline-light' onClick={toggleFormModal}  >
        Make a Post
      </Button>

      <Modal show={show} onHide={toggleFormModal} backdrop='static' centered>
        <Modal.Header className='bg-dark text-light' closeButton closeVariant='white'>
          <Modal.Title>Create Your Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-dark text-light'>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Summoner Name</Form.Label>
              <Form.Control required onChange={handleChange} name='name' value={postInfo.name}></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {validatedText}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Position</Form.Label>
              <Form.Text className='ms-3'>{postInfo.position ? postInfo.position.substring(9) : ''}</Form.Text>
              <Form.Group className='mb-3'>
                <Row>
                  <Col className='col-9'>
                    <ToggleButtonGroup type='radio' name='radio' value={postInfo.position} onClick={handlePositionSelect}>
                      <ToggleButton id="pos-select-1" value='position-fill' variant='dark'>
                        <img className='img-fluid'
                          src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-fill.png'
                          alt=''
                        />
                      </ToggleButton>
                      <ToggleButton id="pos-select-2" value='position-top' variant='dark'>
                        <img className='img-fluid'
                          src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png'
                          alt=''
                        />
                      </ToggleButton>
                      <ToggleButton id="pos-select-3" value='position-middle' variant='dark'>
                        <img className='img-fluid'
                          src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png'
                          alt=''
                        />
                      </ToggleButton>
                      <ToggleButton id="pos-select-4" value='position-jungle' variant='dark'>
                        <img className='img-fluid'
                          src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle.png'
                          alt=''
                        />
                      </ToggleButton>
                      <ToggleButton id="pos-select-5" value='position-bottom' variant='dark'>
                        <img className='img-fluid'
                          src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom.png'
                          alt=''
                        />
                      </ToggleButton>
                      <ToggleButton id="pos-select-6" value='position-utility' variant='dark'>
                        <img className='img-fluid'
                          src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png'
                          alt=''
                        />
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Col>
                </Row>
                
                
              </Form.Group>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Additional Comments</Form.Label>
              <Form.Control className='comment prevent-validation' as='textarea' rows={2} onChange={handleChange} name='comment' value={postInfo.comment} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' className='prevent-validation' onChange={handleChange} name='password' value={postInfo.password} />
              <Form.Text>
                Your password will be needed to delete your post
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className='bg-dark text-light'>
          {isLoading ?
            <Button type='button' disabled variant='outline-light'>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              <span className="sr-only">Loading...</span>
            </Button>
            :
            <Button onClick={handleSubmit} type='submit' variant='outline-light'>
              Submit
            </Button>
          }
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PostForm;
