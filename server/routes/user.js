import express from "express";
import { loginUser, registerUser } from "../controller/user.js";


const router = express.Router();
router.post('/loginUser', loginUser )
router.post('/registerUser', registerUser )

export default router;