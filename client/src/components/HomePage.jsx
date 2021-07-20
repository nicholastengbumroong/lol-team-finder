import React, { useState, useEffect } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import axios from 'axios'; 
import '../css/HomePage.css'

function HomePage() {
  // const [summoner, setSummoner] = useState({name: ''});
  // const [matchHistory, setMatchHistory] = useState([])

  // const handleSubmit = e => {
  //   e.preventDefault(); 
  //   console.log(summoner.name); 

  //   axios.get('/riotAPI/get-summoner', {
  //       params: {
  //         name: summoner.name
  //       }
  //     })
  //     .then((res) => {
  //       setMatchHistory(res.data);
  //     });
    
  //   console.log(matchHistory);
  // }


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
     <h5><b>{post.name}</b> • <small>{post.date}</small></h5>
      <p>{post.position}</p>
      <p>{post.comment}</p>
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