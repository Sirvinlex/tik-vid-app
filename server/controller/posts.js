// import mongoose from "mongoose";
import  express  from "express";
import mongoose from "mongoose";
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
    const newPost = new PostMessage({ ...post, /*creator: req.userId,*/ createdAt: new Date().toISOString() });
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
    
    post.comments.push(comments);
    
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost);
    // const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    // res.json(updatedPost);
};

export default router;
