import React, { useState, useEffect, useRef } from 'react';
import { Modal, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';  

function DeleteConfirmation(props) {
  const [validated, setValidated] = useState(false); 
  const [password, setPassword]  = useState('');
  const [submitTrigger, setSubmitTrigger] = useState(false);

  const handleChange = (e) => {
    setValidated(false); 
    setPassword(e.target.value);
  }

  const initialMount = useRef(true);
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false; 
    }
    else {
      submitPassword(); 
    }
  }, [submitTrigger]);

  const submitPassword = () => {
    console.log(props); 
    axios.post('/postAPI/delete-post', {
      id: props.props.id,
      password: password
    })
    .then((res) => {
      if (res.data) {
        props.props.toggleProfileModal(); 
        props.props.updatePosts();
      }
      else {
        console.log('password does not match'); 
        setValidated(true);
        setPassword('');
      }
    })
    .catch((err) => {
      console.log(err); 
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitTrigger(current => !current); 
  }

  return (
    <div>
      <Modal.Body className='bg-dark text-light'>
          <Row>
            <Col>
            <h3>Enter your password</h3>
            </Col>
          </Row>
          <Row>
            <Form noValidate validated={validated}>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control required type='password' onChange={handleChange} value={password}/>
                <Form.Control.Feedback type='invalid'>
                  Password does not match
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Row>
          <Row className='mt-3'>
            <Col>
              <Button className='float-end' onClick={handleSubmit} type='submit' variant='outline-light'>
                Submit
              </Button>
              <Button className='float-end me-3' onClick={props.displayModalBodyDefault} variant='outline-light'>
                Cancel
              </Button>
            </Col>
          </Row>
        </Modal.Body>
    </div>
  )
}

export default DeleteConfirmation;
