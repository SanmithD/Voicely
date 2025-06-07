import express from 'express';
import { addToBookmark, getBookMarked } from '../controllers/bookmark.controller.js';
import { authProtector } from '../middlewares/auth.middleware.js';

const bookmarkRouter = express.Router();

bookmarkRouter.patch('/set/:id',authProtector, addToBookmark);
bookmarkRouter.get('/get',authProtector, getBookMarked);

export default bookmarkRouter
