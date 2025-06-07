import express from 'express';
import { deleteAccount, deleteUserProfile, getUserProfile, login, profile, signup } from '../controllers/auth.controller.js';
import { authProtector } from '../middlewares/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/profile', authProtector, profile);
authRouter.delete('/delete', authProtector, deleteAccount);
authRouter.delete('/delete/:id', authProtector, deleteUserProfile);
authRouter.get('/view-profile/:id', authProtector, getUserProfile);

export default authRouter;
