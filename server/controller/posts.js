// import mongoose from "mongoose";
import  express  from "express";
import PostMessage from "../models/postMessage.js";

// import router from "../routes/posts.js";

const router = express.Router();

export const getPosts = async (req, res) =>{
   try {

       const posts = await PostMessage.find();
       res.status(200).json(posts);
   } catch (error) {
       res.status(404).json({message: error.message})
   }
};

export const createPosts = async (req, res) =>{
    const post = req.body;
    console.log(post, 'sever')
    const newPost = new PostMessage({ ...post, /*creator: req.userId,*/ createdAt: new Date().toISOString() });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
};



export default router;
