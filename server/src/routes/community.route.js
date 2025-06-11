import express from 'express';
import { createCommunity, deleteCommunity, getAllCommunityThreads, getCommunities, getCommunityThreads, joinCommunity } from '../controllers/community.controller.js';
import { authProtector } from '../middlewares/auth.middleware.js';

const communityRouter = express.Router();

communityRouter.post('/create', authProtector, createCommunity);
communityRouter.post('/join/:communityId', authProtector, joinCommunity);
communityRouter.post('/leave', authProtector, createCommunity);
communityRouter.get('/get/:id', authProtector, getCommunityThreads);
communityRouter.get('/getCommunity', authProtector, getCommunities);
communityRouter.delete('/delete/:communityId', authProtector, deleteCommunity);
communityRouter.get('/get-thread/:id', authProtector, getAllCommunityThreads);

export default communityRouter