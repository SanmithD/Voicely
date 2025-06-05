import express from 'express';
import { deleteNotification, getAllNotifications, postNotification } from '../controllers/notification.controller.js';
import { authProtector } from '../middlewares/auth.middleware.js';

const notificationRouter = express.Router();

notificationRouter.post('/post', authProtector, postNotification);
notificationRouter.get('/get', authProtector, getAllNotifications);
notificationRouter.delete('/delete/:id', authProtector, deleteNotification);

export default notificationRouter