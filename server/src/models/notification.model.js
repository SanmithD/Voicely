import mongoose from "mongoose";

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

export const notificationModel = mongoose.model('Notification', notificationSchema);