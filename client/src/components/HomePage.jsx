import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios'; 
import '../css/HomePage.css'
import Post from './Post';

function HomePage() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts(); 
  }, []); 

  const getPosts = () => {
    axios.get('/postAPI/get-posts')
      .then((res) => {
        setPosts(res.data); 
        console.log('Data has been retrieved from the database'); 
      })
      .catch(() => {
        console.log('Error retrieving data'); 
      });
  }

  const items = posts.map((post, index) => (
    <Row key={post._id + index}>
      <Post post={post}></Post>
    </Row>
  ));
    
  return (
    <div className='homepage-parent'>
      <Container>
        {items} 
      </Container>
    </div>
  )
}

export default HomePage