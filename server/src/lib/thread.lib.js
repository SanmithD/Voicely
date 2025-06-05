import mongoose from "mongoose";

const THREAD_DB_URI = process.env.THREAD_DB_URI;

const threadDB = await mongoose.createConnection(THREAD_DB_URI);

export default threadDB;
