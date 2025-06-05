import mongoose from "mongoose";

const AUTHDB = process.env.AUTH_DB_URI;

const authDB = await mongoose.createConnection(AUTHDB);

export default authDB;
