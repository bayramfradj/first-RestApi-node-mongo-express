const express = require('express');
const router = express.Router();

const Post = require('../models/post');

//all posts
router.get('/', async (req,res)=>{
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).send(error);
    }   
});

//get post by id
router.get('/:id', async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).send(error);
    }   
});

//add Post
router.post('/', async (req,res)=>{
    const post = new Post({
        title : req.body.title,
        description : req.body.description
    });

    try{
          const savedPost = await post.save();
    res.status(201).json(savedPost);
    }
    catch(err)
    {
         res.status(404).send(err);
    }
 
  
  
});

module.exports = router;