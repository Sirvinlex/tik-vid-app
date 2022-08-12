import express from "express";
import { getPosts, createPosts } from "../controller/posts.js";
// import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', getPosts )
router.get('/', createPosts )



export default router;