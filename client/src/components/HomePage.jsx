import React, { useState, useEffect, useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios'; 
import '../css/HomePage.css'
import Post from './Post';
import PostForm from './PostForm';
import Filter from './Filter';
import CustomNavbar from './CustomNavbar';


const VERSION = '11.15.1'; 
const LOCALE = 'en_US'; 

function HomePage() {

  const [posts, setPosts] = useState([]);

  const [filteredTier, setFilteredTier] = useState([]);
  const [filteredPosition, setFilteredPosition] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  

  const didMount = useRef(false);
  const didInitialFilter = useRef(false); 

  useEffect(() => {
    if (didMount.current) {
      if (didInitialFilter.current) {
        filterCombo();
      }
      else {
        filterTier();
        filterPosition(); 
        didInitialFilter.current = true;
      }
    }
    else { // only occurs on initial render
      getPosts();
      didMount.current = true;
    }
  }, [posts, filteredTier, filteredPosition]) // eslint-disable-line react-hooks/exhaustive-deps

  const getPosts = () => {
    axios.get('/postAPI/get-posts')
      .then((res) => {
        setPosts(res.data); 
        didInitialFilter.current = false; 
        console.log('Data has been retrieved from the database'); 
      })
      .catch(() => {
        console.log('Error retrieving data'); 
      });
  }

  const filterTier = (selectedTier = 'all tiers') => {
    selectedTier = selectedTier.toUpperCase(); 
    if (selectedTier === 'ALL TIERS') {
      setFilteredTier(posts); 
    }
    else {
      let items = posts.filter((post) => post.postInfo.league.tier === selectedTier);
      setFilteredTier(items);
    }
  }

  const filterPosition = (selectedPositions = []) => {
    if (!selectedPositions.length) {
       setFilteredPosition(posts); 
    }
    else {
      let items = posts.filter((post) => selectedPositions.includes(post.postInfo.position));
      setFilteredPosition(items); 
    }
  }

  const filterCombo = () => {
    let items = filteredTier.filter((post) => filteredPosition.includes(post));
    setFilteredPosts(items); 
  }

  // const resetFilter = () => {
  //   filterPosition([]);
  //   filterTier('all tiers');
  // }

  const items = filteredPosts.map((post, index) => (
    <Row key={post._id + index}>
      <Post post={post} version={VERSION} locale={LOCALE}></Post>
    </Row>
  ));
    
  return (
    <div className='homepage-parent'>
      <CustomNavbar updatePosts={getPosts}/>
      <Container>
        <Filter filterTier={filterTier} filterPosition={filterPosition}></Filter>
      </Container>

      <Container>
        {items} 
      </Container>
    </div>
  )
}

export default HomePage;