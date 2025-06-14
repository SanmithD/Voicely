import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    report:{
        type: String,
        require: true
    }
},{ timestamps: true });

export const reportModel = mongoose.model("Report", reportSchema);