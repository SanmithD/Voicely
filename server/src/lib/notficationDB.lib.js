import mongoose from "mongoose";

const NOTIFICATION_DB_URI = process.env.NOTIFICATION_DB_URI;

const notificationDB = await mongoose.createConnection(NOTIFICATION_DB_URI);

export default notificationDB;
