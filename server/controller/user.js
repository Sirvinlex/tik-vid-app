import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import dotenv from 'dotenv';
dotenv.config()

export const loginUser = async (req, res) =>{
    const { email, password } = req.body;
    

    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message: 'User does not exist'});
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message: 'Invalid Credentials'});
        const token = jwt.sign({email: existingUser.email,  id: existingUser._id }, process.env.AUTH_KEY,);

        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

export const registerUser = async (req, res) =>{
    const { name, email, password, } = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: 'User with this email already exist'});
        const hashedPassword = await bcrypt.hash(password, 12)

        const result = User.create({ email, password: hashedPassword, name })
        const token = jwt.sign({email: result.email, id: result._id }, process.env.AUTH_KEY,);
        res.status(200).json({result, token, message:'Registration successful, proceed to Login'});
        
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });

    }
};