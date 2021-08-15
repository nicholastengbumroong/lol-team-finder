import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';  

import DeleteConfirmation from './DeleteConfirmation';


function PlayerProfile(props) {

  const [modalBodyContent, setModalBodyContent] = useState();

  useEffect(() => {
      displayModalBodyDefault();
  }, []);

  const displayModalBodyDefault = () => {
    setModalBodyContent(() => {
      return (
        <Modal.Body className='bg-dark text-light'>
          <Row>
            <Col>
            <h2>Is this you?</h2>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col className='text-center'>
              <Button>Verify</Button>
            </Col>
          </Row>
          <Row>
            <Col className='text-center'>
              <Button onClick={displayDeleteConfirmation}>Delete</Button>
            </Col>
          </Row>
        </Modal.Body>
      )
    });
  }

  const displayDeleteConfirmation = () => {
    setModalBodyContent(() => {
      return (
        <DeleteConfirmation props={props} displayModalBodyDefault={displayModalBodyDefault}></DeleteConfirmation>
      )
    });
  }


  return (
    <div>
      <Modal.Header className='bg-dark text-light' closeButton closeVariant='white'>
        <Modal.Title>
          <Row className='d-inline-flex'>
            <Col className='col-2'>
              <img src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/profileicon/${props.postInfo.profileIconId}.png`}
                alt={props.postInfo.profileIconId}
                className='img-fluid rounded-circle'
              />
            </Col>
            <Col className='ps-0 my-auto'>
              {props.postInfo.name}
            </Col>
          </Row>
        </Modal.Title>
      </Modal.Header>
      {modalBodyContent}
      
    </div>
  )
}

export default PlayerProfile
