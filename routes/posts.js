const express = require('express');
const router = express.Router();

const Joi = require('joi');

const Post = require('../models/post');
const { schema } = require('../models/post');

const idSchema = Joi.object({
    id : Joi.string().min(10).required()
});

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
    id = idSchema.validate(req.params);
    if(id.error)
    {
        res.status(400).send(id.error.details[0].message);
        return;
    }

    try {
       
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).send(error);
    }   
});

//remove post by id
router.delete('/:id', async (req,res)=>{
    id = idSchema.validate(req.params);
    if(id.error)
    {
        res.status(400).send(id.error.details[0].message);
        return;
    }
    try {
        const post = await Post.deleteOne({_id : req.params.id});
        res.status(200).json(post);
    } catch (error) {
        res.status(404).send(error);
    }   
});

//Update post
router.patch('/:id',async (req,res)=>{
    id = idSchema.validate(req.params);
    if(id.error)
    {
        res.status(400).send(id.error.details[0].message);
        return;
    }
    const UpSchema = Joi.object({
        title : Joi.string().min(3).required(),
        description : Joi.string().min(3).required()
    });

    const result = UpSchema.validate(req.body);

    if(result.error)
    {
        res.status(400).send(result.error.details[0].message);
        return;
    }
   try {
       const updatedPost = await Post.updateOne({_id : req.params.id},{
            $set : {
                title : req.body.title,
                description : req.body.description
            }
        });
        res.status(200).json(updatedPost);
   } catch (error) {
       res.status(404).send(error);
   }
    
});

//add Post
router.post('/', async (req,res)=>{

    const POStSchema = Joi.object({
        title : Joi.string().min(3).required(),
        description : Joi.string().min(3).required()
    });

    const result = POStSchema.validate(req.body);

    if(result.error)
    {
        res.status(400).send(result.error.details[0].message);
        return;
    }
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
         res.status(400).send(err);
    }
 
  
  
});

module.exports = router;