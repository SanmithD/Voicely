import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    communityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
        index: true,  
        default: null
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
    likes:[{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        count:{
            type: Number,
            default: 0
        },
        time:{
            type: Date,
            default: Date.now
        }
    }]
},{ timestamps: true });

export const threadModel = mongoose.model('Thread', threadSchema);