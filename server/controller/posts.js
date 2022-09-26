import  express  from "express";
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

const router = express.Router();

export const getPosts = async (req, res) =>{
   const { page } = req.query;
   try {
     const LIMIT = 5;
       const startIndex = (Number(page) - 1) * LIMIT; //get the starting index of each posts
       const total = await PostMessage.countDocuments({});

       const posts = await PostMessage.find().sort({ _id: -1}).limit(LIMIT).skip(startIndex);
       res.status(200).json({ result: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT) })
   } catch (error) {
       res.status(404).json({message: error.message})
   }
};

export const getPostsBySearch = async (req, res) =>{
    const {searchQuery, category} = req.query;
     try {
        const caption = new RegExp(searchQuery, 'i');
        const topic = new RegExp(category, 'i');
        const posts = await PostMessage.find({ $or: [{ caption }, { topic }]});

        res.json({ result: posts});
    } catch (error) {
        
    }
};

export const createPosts = async (req, res) =>{
    const post = req.body;
    const newPost = new PostMessage({ ...post, createdAt: new Date().toISOString() });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
};

export const deletePost = async (req, res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with that id');

    await PostMessage.findByIdAndRemove(id);
    res.json({message: 'Post deleted successfully'})
    
};

export const postComment = async (req, res) =>{
    const {id} = req.params;
    const {comments} = req.body;

    const post = await PostMessage.findById(id);
    
    post.comments.unshift(comments);
    
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost);
};

export const deleteComment =async (req, res) =>{
    const {id} = req.params;
    const {index} = req.body;

    const post = await PostMessage.findById(id);
    post.comments.splice(index, 1);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost);
};

export const likePost = async (req, res) =>{
    const {id} = req.params;
    const {userId} = req.body;
    if(!userId) return  res.json({message: 'Unauthenticated'});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with that id');
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(userId));
    if(index === -1){
        post.likes.push(userId);
    }else{
        post.likes = post.likes.filter((id) => id !== String(userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
    res.json(updatedPost);
};

export default router;
