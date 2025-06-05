import mongoose from "mongoose";
import authDB from "../lib/authDB.lib.js";

const authSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password:{
        type: String,
        required: true
    }
},{ timestamps: true });

const authModel = authDB.model('User', authSchema);

export default authModel;
