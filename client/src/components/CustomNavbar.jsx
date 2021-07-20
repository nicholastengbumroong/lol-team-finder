import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import PostForm from './PostForm';


function CustomNavbar() {

  return (
    <Navbar fixed='top' bg="dark" variant="dark">
      <Nav className='container-fluid'>
        <Nav.Item>
          <Navbar.Brand className='ms-3' href="#home">React-Bootstrap</Navbar.Brand>
        </Nav.Item>
        <Nav.Item className='ml-auto'>
          <PostForm></PostForm>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

export default CustomNavbar;
