import bcrypt from 'bcrypt';
import { generateToken } from '../config/token.config.js';
import authModel from "../models/auth.model.js";
import { threadModel } from '../models/thread.model.js';

export const signup = async(req, res) =>{
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "All the fields are required"
        });
    }
    try {
        if(password.length < 5){
            return res.status(400).json({
            success: false,
            message: "Password must be at least 5 characters"
        });
        }
        const user = await authModel.findOne({ email });
        if(user){
            return res.status(400).json({
            success: false,
            message: "User already exists"
        });
        }
        //hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new authModel({
            username : "Anonymous",
            email,
            password: hashedPassword
        });

        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                success: true,
                message: "New user signup",
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email
            });
        }else{
            res.status(400).json({
                success: false,
                message: "Invalid user data"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
}

export const login = async (req, res) =>{
    const { email, password } = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({
            success: false,
            message: "All field are required"
        });
        }
        const user = await authModel.findOne({ email });
        if(!user){
            return res.status(404).json({
            success: false,
            message: "User not found"
        });
        }
        const isPassword = bcrypt.compare(password, user.password);
        if(!isPassword){
            return res.status(500).json({
            success: false,
            message: "Invalid credentials"
        });
        }
        const token = generateToken(user._id, res);
        res.status(200).json({
            success: true,
            message: "Login success",
            username: user.username,
            _id: user._id,
            email: user.email,
            token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error)
    }
}

export const profile = async(req, res) =>{
    const userId = req.user._id;
    if(!userId){
        return res.status(404).json({
            success: false,
            message: "Invalid user id"
        });
    }
    try {
        const response = await threadModel.find({ userId: userId });
        if(!response){
            return res.status(404).json({
            success: false,
            message: "Not found"
        });
        }
        res.status(200).json({
            success: true,
            message: "Posted thoughts",
            response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error)
    }
}