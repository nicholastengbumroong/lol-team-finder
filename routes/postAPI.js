const express = require('express');
const router = express.Router();

const Post = require('../models/postModel');




router.post('/submit-post', (req, res) => {
  //TODO: post validation, i.e. does the username exist, was position selected, filter comment etc.
  console.log(req.body); 

  req.body.comment = req.body.comment.trim(); 
  const password = req.body.password;
  delete req.body.password; 

  const post = new Post({
    postInfo: req.body,
    date: new Date(),
    isVerified: false,
    password: password
  });

  post.save((error) => {
    if (error) {
      res.status(500).json({ msg: 'Internal server errors' });
      return; 
    }
    return res.json({ msg: 'Data has been saved'});
  });
});

router.get('/get-posts', (req, res) => {
  Post  
    .find({}, '-password')
    .sort({date: -1})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('Error: ', error); 
    });
});

const verifyPassword = (dbPassword, clientPassword) => {
  //TODO: look into hashing/salting/encryption etc. 
  if (dbPassword === clientPassword) {
    return true;
  }
  else {
    return false; 
  }
}

router.post('/delete-post', (req, res) => {
  Post.findById(req.body.id, 'password')
    .then((post) => {
      if (verifyPassword(post.password, req.body.password)) { 
        Post.findByIdAndDelete(post.id).exec(); 
        res.json(true);
      }
      else {
        res.json(false);
      }
    })
    .catch((err) => {
      console.log(err); 
    });
});

router.post('/update-verification', (req, res) => {
  Post.findByIdAndUpdate(req.body.id, {isVerified: true}).exec(); 
  res.json('Post has been verified');
});

module.exports = router;
