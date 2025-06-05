import mongoose from "mongoose";
import threadDB from "../lib/thread.lib.js";

const threadSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    media:{
        type: String
    },
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
    },
    replies:[{
        replierId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        message:{
            type: String
        },
        createdAt:{
            type: Date,
            default: Date.now
        }
    }],
    likes:{
        type: Boolean,
        default: false
    }
},{ timestamps: true });

export const threadModel = threadDB.model('Thread', threadSchema);