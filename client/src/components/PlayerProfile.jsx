import React from 'react'
import { Modal, Row } from 'react-bootstrap';  


function PlayerProfile({postInfo}) {

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>{postInfo.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
        </Row>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </div>
  )
}

export default PlayerProfile
