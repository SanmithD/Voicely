import express from 'express';
import { getRecentSearches, removeSearches, saveHistory, searchThread } from '../controllers/search.controller.js';
import { authProtector } from '../middlewares/auth.middleware.js';

const searchRouter = express.Router();

searchRouter.get('/search', authProtector, searchThread);
searchRouter.delete('/remove/:id', authProtector, removeSearches);
searchRouter.get('/recent', authProtector, getRecentSearches);
searchRouter.post('/saveHistory/:threadId', authProtector, saveHistory);

export default searchRouter