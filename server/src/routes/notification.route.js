import express from 'express';
import { deleteNotification, getAllNotifications, postNotification, postPersonalNotification } from '../controllers/notification.controller.js';
import { authProtector } from '../middlewares/auth.middleware.js';

const notificationRouter = express.Router();

notificationRouter.post('/post', authProtector, postNotification);
notificationRouter.post('/send/:userId', authProtector, postPersonalNotification);
notificationRouter.get('/get', authProtector, getAllNotifications);
notificationRouter.delete('/delete/:id', authProtector, deleteNotification);

export default notificationRouter