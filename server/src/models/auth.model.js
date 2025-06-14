import mongoose from "mongoose";

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

const authModel = mongoose.model('User', authSchema);

export default authModel;
