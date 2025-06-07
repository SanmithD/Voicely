import mongoose from "mongoose";
import authDB from "../lib/authDB.lib.js";

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

export const reportModel = authDB.model("Report", reportSchema);