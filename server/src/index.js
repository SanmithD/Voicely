import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import authRouter from './routes/auth.route.js';
import notificationRouter from './routes/notification.route.js';
import threadRouter from './routes/thread.route.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json({ limit: "5mb" }));
app.use(cors());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/thread', threadRouter);

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
});