import express from 'express';
import { deleteThread, getAllSingleThread, getAllThread, getSingleThread, giveLike, postReply, postSingleThread, postThread } from '../controllers/thread.controller.js';
import { authProtector } from '../middlewares/auth.middleware.js';

const threadRouter = express.Router();

threadRouter.get('/get-thread', authProtector, getAllThread);
threadRouter.get('/get-singleAll-thread', authProtector, getAllSingleThread);
threadRouter.post('/post-community-thread/:communityId', authProtector, postThread);;
threadRouter.post('/post-single-thread', authProtector, postSingleThread);;
threadRouter.get('/get-thread/:id', authProtector, getSingleThread);
threadRouter.delete('/delete-thread/:id', authProtector, deleteThread);
threadRouter.post('/reply-thread/:id', authProtector, postReply);
threadRouter.patch('/like-thread/:threadId', authProtector, giveLike);

export default threadRouter