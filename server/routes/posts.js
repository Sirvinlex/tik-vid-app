import express from "express";
import { getPosts, createPosts, deletePost, postComment, likePost, deleteComment, getPostsBySearch } from "../controller/posts.js";

const router = express.Router();

router.get('/', getPosts )
router.get('/search', getPostsBySearch )
router.post('/', createPosts )
router.delete('/:id', deletePost )
router.post('/:id/postComment', postComment)
router.post('/:id/likePost', likePost)
router.patch('/:id/deleteComment', deleteComment)



export default router;