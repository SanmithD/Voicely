import mongoose from "mongoose";

const searchSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    threadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread'
    },
    data:{
        type : String,
    }
},{ timestamps: true });

export const searchModel = mongoose.model('Search', searchSchema);