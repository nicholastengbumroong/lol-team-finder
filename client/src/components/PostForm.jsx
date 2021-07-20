import  React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import '../css/PostForm.css'

function PostForm() {
  const [show, setShow] = useState(false); 
  const [postInfo, setPostInfo] = useState({name: '', position: '', comment: ''}); 
 
  const toggleModal = () => setShow(!show); 

  const handlePositionSelect = (e) => {
    console.log(`selected ${e.target.id}`); 
    setPostInfo({...postInfo, position: e.target.id}); 
  }

  const handleChange = (e) => {
    setPostInfo({...postInfo, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log(postInfo);

    const post = {
      name: postInfo.name,
      position: postInfo.position,
      comment: postInfo.comment
    }; 

    axios({
      url: '/postAPI/submit-post',
      method: 'POST',
      data: post
    })
    .then(() => {
      console.log('Data has been sent to the server');
    })
    .catch(() => {
      console.log('There was an error sending data to the server');
    });

    toggleModal();  
  }


  return (
    <>
      <Button onClick={toggleModal}>
        Make a Post
      </Button>

      <Modal show={show} onHide={toggleModal} backdrop='static' centered>
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
