import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectDB from './lib/db.lib.js';
import authRouter from './routes/auth.route.js';
import bookmarkRouter from './routes/bookmark.route.js';
import communityRouter from './routes/community.route.js';
import notificationRouter from './routes/notification.route.js';
import reportRouter from './routes/report.route.js';
import searchRouter from './routes/search.route.js';
import threadRouter from './routes/thread.route.js';

connectDB();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json({ limit: "10mb" }));
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["GET, POST, DELETE, PUT, PATCH"],
    credentials: true
}));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/thread', threadRouter);
app.use('/api/bookmark', bookmarkRouter);
app.use('/api/community', communityRouter);
app.use('/api/report', reportRouter);
app.use('/api/find', searchRouter);

app.get('/',(req, res)=>{
    res.send("Hello World")
})

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
});