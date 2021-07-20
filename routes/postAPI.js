const express = require('express');
const router = express.Router();

const Post = require('../models/postModel');

router.post('/submit-post', (req, res) => {
  console.log(req.body);

  //do post validation, i.e. does the username exist, was position selected, filter comment etc.
  const post = new Post({
    name: req.body.name,
    position: req.body.position,
    comment: req.body.comment,
    date: new Date()
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
    .find()
    .sort({date: -1})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('Error: ', error); 
    });
});

module.exports = router;
