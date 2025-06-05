
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import authModel from '../models/auth.model.js';

export const authProtector = async(req, res, next) =>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(404).json({
                success: false,
                message: "Invalid token"
            });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if(!decode){
            return res.status(403).json({
            success: false,
            message: "Unauthorized"
        });
        }
        const user = await authModel.findById(decode.userId).select("-password");
        if(!user){
            return res.status(404).json({
            success: false,
            message: "User not found"
        });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error)
    }
}