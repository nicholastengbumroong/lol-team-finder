import React from 'react'
import { Modal, Row } from 'react-bootstrap';  


function PlayerProfile({summonerDetails, matchList}) {



  const items = Array.isArray(matchList) ? matchList.map((match, index) => (
    <div key={index}>{match.gameId}</div>
  )) : null; 

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>{summonerDetails.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {items}
        </Row>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </div>
  )
}

export default PlayerProfile
