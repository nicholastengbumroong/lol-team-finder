import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios'; 
import '../css/HomePage.css'
import Post from './Post';
import PostForm from './PostForm';


const VERSION = '11.15.1'; 
const LOCALE = 'en_US'; 

function HomePage() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts(); 
  }, []); 

  const getPosts = () => {
    axios.get('/postAPI/get-posts')
      .then((res) => {
        console.log(res.data); 
        setPosts(res.data); 
        console.log('Data has been retrieved from the database'); 
      })
      .catch(() => {
        console.log('Error retrieving data'); 
      });
  }

  const items = posts.map((post, index) => (
    <Row key={post._id + index}>
      <Post post={post} version={VERSION} locale={LOCALE}></Post>
    </Row>
  ));
    
  return (
    <div className='homepage-parent'>
      <div className='d-flex justify-content-center pb-2'>
        <PostForm updatePosts={getPosts}></PostForm>   
      </div>
      
      <Container>
        {items} 
      </Container>
    </div>
  )
}

export default HomePage