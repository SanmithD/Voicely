import express from 'express';
import { sendReport } from '../controllers/report.controller.js';
import { authProtector } from '../middlewares/auth.middleware.js';

const reportRouter = express.Router();

reportRouter.post('/issue',authProtector, sendReport);

export default reportRouter