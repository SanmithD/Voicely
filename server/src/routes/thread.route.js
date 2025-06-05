import express from 'express';
import { deleteThread, getAllThread, postReply, postThread } from '../controllers/thread.controller.js';
import { authProtector } from '../middlewares/auth.middleware.js';

const threadRouter = express.Router();

threadRouter.post('/post-thread', authProtector, postThread);
threadRouter.get('/get-thread', authProtector, getAllThread);
threadRouter.delete('/delete-thread', authProtector, deleteThread);
threadRouter.post('/reply-thread/:id', authProtector, postReply);

export default threadRouter