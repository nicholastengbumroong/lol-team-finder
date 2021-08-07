import  React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import '../css/PostForm.css'

function PostForm(props) {
  const [show, setShow] = useState(false); 
  const toggleFormModal = () => setShow(!show); 

  const initialPostState = {
    name: '', 
    position: '', 
    comment: '',
    summonerId: '', 
    profileIconId: 0, 
    summonerLevel: 0,
    league: {tier: '', rank: ''},
    numGames: {wins: 0, losses: 0},
    kda: {avgKills: 0, avgDeaths: 0, avgAssists: 0},
    mostPlayedChamps: []

  }

  const [postInfo,  setPostInfo] = useState(initialPostState); 

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
    console.log(`selected ${e.target.id}`); 
    setPostInfo({...postInfo, position: e.target.id}); 
  }

  const handleChange = (e) => {
    setPostInfo({...postInfo, [e.target.name]: e.target.value})
  }

  const getSummonerDetails = async () => {
    let res = await axios.get(`/riotAPI/get-summoner-details?name=${postInfo.name}`); 
    console.log(res.data); 
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
    //console.log(totalKills, totalDeaths, totalAssists); 
    return {
      avgKills: totalKills / totalMatches,
      avgDeaths: totalDeaths / totalMatches, 
      avgAssists: totalAssists / totalMatches,
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
    //let champIds = Object.keys(postInfo.mostPlayedChamps); 
    // let champData = {}; 
    // axios.get(`/riotAPI/get-champion-data`)
    //   .then((res) => {
    //     mostPlayedChamps.forEach((champArr) => {
    //       let champName = res.data.keys[champArr[0]];
    //       champData[champName] = res.data.data[champName]; 
    //       champData[champName]['frequency'] = champArr[1]; 
    //     });
    //   });
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
    console.log(postInfo.name); 
    getSummonerDetails();
     
    toggleFormModal();  
  }


  const submitPost = (postData) => {
  
    console.log(postData);

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
      <Button onClick={toggleFormModal}>
        Make a Post
      </Button>

      <Modal show={show} onHide={toggleFormModal} backdrop='static' centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Your Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Summoner Name</Form.Label>
              <Form.Control onChange={handleChange} name='name' value={postInfo.name}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Position</Form.Label>
              <Form.Text className='ms-3'>{postInfo.position}</Form.Text>
              <Form.Group className='mb-3'>
                <label htmlFor='position-fill'>
                  <img
                    src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-fill-blue.png'
                    alt=''
                    height='38px'
                    width='38px'
                  />
                </label>
                <input id='position-fill' type='radio' className='position' onClick={handlePositionSelect}></input>
                <label htmlFor='position-top'>
                  <img
                    src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top-blue.png'
                    alt=''
                    height='38px'
                    width='38px'
                  />
                </label>
                <input id='position-top' type='radio' className='position' onClick={handlePositionSelect}></input>
                <label htmlFor='position-mid'>
                  <img
                    src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle-blue.png'
                    alt=''
                    height='38px'
                    width='38px'
                  />
                </label>
                <input id='position-mid' type='radio' className='position' onClick={handlePositionSelect}></input>
                <label htmlFor='position-jungle'>
                  <img
                    src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle-blue.png'
                    alt=''
                    height='38px'
                    width='38px'
                  />
                </label>
                <input id='position-jungle' type='radio' className='position' onClick={handlePositionSelect}></input>
                <label htmlFor='position-bottom'>
                  <img
                    src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom-blue.png'
                    alt=''
                    height='38px'
                    width='38px'
                  />
                </label>
                <input id='position-bottom' type='radio' className='position' onClick={handlePositionSelect}></input>
                <label htmlFor='position-utility'>
                  <img
                    src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility-blue.png'
                    alt=''
                    height='38px'
                    width='38px'
                  />
                </label>
                <input id='position-utility' type='radio' className='position' onClick={handlePositionSelect}></input>
                
              </Form.Group>
            </Form.Group>
            <Form.Group>
              <Form.Label>Additional Comments</Form.Label>
              <Form.Control className='comment' as='textarea' rows={2} onChange={handleChange} name='comment' value={postInfo.comment} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PostForm;
