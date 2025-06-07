import mongoose from "mongoose";
import threadDB from "../lib/thread.lib.js";

const communitySchema = new mongoose.Schema({
    ownerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    members:[{
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        joined:{
            type: Date,
            default: Date.now
        }
    }]
},{ timestamps: true });

export const communityModel = threadDB.model('Community', communitySchema);