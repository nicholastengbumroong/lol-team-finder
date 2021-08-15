import React, { useState } from 'react';
import { Modal, Row, Col, Button, ListGroup, Collapse } from 'react-bootstrap';
import axios from 'axios';
import '../css/VerifyConfirmation.css';

function VerifyConfirmation(props) {
  const vProfileIconId = 10; 

  const [showVerifyFeedback, setShowVerifyFeedback] = useState(false);
  const [didVerifySucceed, setDidVerifySucceed] = useState(false); 

  const handleSubmit = async () => {
    const name = props.props.postInfo.name;
    axios.get(`/riotAPI/verify-post?name=${name}&vProfileIconId=${vProfileIconId}`)
    .then((res) => {
      if (res.data) {
        axios.post('postAPI/update-verification', {
          id: props.props.id
        })
        .then(() => {
          setDidVerifySucceed(true); 
          props.props.updatePosts();
          setShowVerifyFeedback(true);
        });
      }
      else {
        setShowVerifyFeedback(true);
      }
      
    })
    .catch((err) => {
      console.log(err); 
    });
  }

  return (
    <div>
      <Modal.Body className='bg-dark text-light'>
        <Row>
          <Col>
            <h3>Verify your post</h3>
          </Col>
        </Row>
        <Row>
          <ListGroup variant='flush'>
            <ListGroup.Item className='bg-dark text-light verify-listgroup-item'>
              <b className='me-2'>1.</b> Log in to your League client.
            </ListGroup.Item>
            <ListGroup.Item className='bg-dark text-light verify-listgroup-item'>
                <b className='me-2'>2.</b> Change your profile icon to the one shown below.
              <Row className='justify-content-center my-4 ms-4'>
                <Col className=''>
                  <img src={`http://ddragon.leagueoflegends.com/cdn/${props.props.version}/img/profileicon/${vProfileIconId}.png`}
                    alt={vProfileIconId}
                    className='img-fluid'
                  />
                </Col> 
              </Row>
              
            </ListGroup.Item>
            <ListGroup.Item className='bg-dark text-light verify-listgroup-item'>
              <b className='me-2'>3.</b> After you have changed your icon, return to this page and click the verify button below.
            </ListGroup.Item>
          </ListGroup>
        </Row>
        <Row className='mt-3'>
          <Col>
            <Button className='float-end' onClick={handleSubmit} type='submit' variant='outline-light'>
              Verify
            </Button>
            <Button className='float-end me-3' onClick={props.displayModalBodyDefault} variant='outline-light'>
              Cancel
            </Button>
          </Col>
        </Row>
        <Collapse in={showVerifyFeedback}>
          {didVerifySucceed ? 
          <div className='text-success'>
            Your post has been successfully verified!
          </div> :
          <div className='text-danger'>
            There was an error verifying your post.
          </div>
          }
        </Collapse>
      </Modal.Body>
    </div>
  )
}

export default VerifyConfirmation;
