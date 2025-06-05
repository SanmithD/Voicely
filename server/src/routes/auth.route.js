import express from 'express';
import { login, profile, signup } from '../controllers/auth.controller.js';
import { authProtector } from '../middlewares/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/profile', authProtector, profile);

export default authRouter;
