import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import PostForm from './PostForm';



function CustomNavbar(props) {

  return (
    <Navbar fixed='top' bg="dark" variant="dark">
      <Nav className='container-fluid'>
        <Nav.Item>
          <Navbar.Brand className='ms-3' href="#home">LoL Team Finder</Navbar.Brand>
        </Nav.Item>
        <Nav.Item>
          <PostForm updatePosts={props.updatePosts}></PostForm>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

export default CustomNavbar;
