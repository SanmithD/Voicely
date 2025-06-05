import 'dotenv/config';
import jwt from 'jsonwebtoken';

const JWT = process.env.JWT_SECRET;

export const generateToken = (userId, res) =>{
    const token = jwt.sign({ userId },JWT,{ expiresIn: '7d' });

    res.cookie("jwt",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "None",
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
    });

    return token;
}