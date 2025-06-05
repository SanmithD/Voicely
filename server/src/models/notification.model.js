import mongoose from "mongoose";
import notificationDB from "../lib/notficationDB.lib.js";

const notificationSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title:{
        type: String
    },
    content:{
        type: String
    }
},{ timestamps: true });

export const notificationModel = notificationDB.model('Notification', notificationSchema);