import  React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import '../css/PostForm.css'

function PostFormButton() {
  const [show, setShow] = useState(false); 

  const hideModal = () => setShow(false); 
  const showModal = () => setShow(true); 

  const handlePositionSelect = (e) => {
    e.preventDefault(); 
    console.log(`selected ${e.target.id}`);  
  }


  return (
    <>
      <Button onClick={showModal}>
        Make a Post
      </Button>

      <Modal show={show} onHide={hideModal} backdrop='static' centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Your Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Summoner Name</Form.Label>
              <Form.Control></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Position</Form.Label>
              <Form.Group className='mb-3'>
                <label htmlFor='position-fill'>
                  <img
                    src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-fill-blue.png'
                    alt=''
                    height='38px'
                    width='38px'
                  />
                </label>
                <input id='position-fill' type='radio' name='position' className='position' onClick={handlePositionSelect}></input>
                <label htmlFor='position-top'>
                  <img
                    src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top-blue.png'
                    alt=''
                    height='38px'
                    width='38px'
                  />
                </label>
                <input id='position-top' type='radio' name='position' className='position' onClick={handlePositionSelect}></input>
                <label htmlFor='position-mid'>
                  <img
                    src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle-blue.png'
                    alt=''
                    height='38px'
                    width='38px'
                  />
                </label>
                <input id='position-mid' type='radio' name='position' className='position' onClick={handlePositionSelect}></input>
                <label htmlFor='position-jungle'>
                  <img
                    src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle-blue.png'
                    alt=''
                    height='38px'
                    width='38px'
                  />
                </label>
                <input id='position-jungle' type='radio' name='position' className='position' onClick={handlePositionSelect}></input>
                <label htmlFor='position-bottom'>
                  <img
                    src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom-blue.png'
                    alt=''
                    height='38px'
                    width='38px'
                  />
                </label>
                <input id='position-bottom' type='radio' name='position' className='position' onClick={handlePositionSelect}></input>
                <label htmlFor='position-utility'>
                  <img
                    src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility-blue.png'
                    alt=''
                    height='38px'
                    width='38px'
                  />
                </label>
                <input id='position-utility' type='radio' name='position' className='position' onClick={handlePositionSelect}></input>
                
              </Form.Group>
            </Form.Group>
            <Form.Group>
              <Form.Label>Additional Comments</Form.Label>
              <Form.Control as='textarea' rows={2} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PostFormButton;
