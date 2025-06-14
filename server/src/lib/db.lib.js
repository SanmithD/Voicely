import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        const response = await mongoose.connect(process.env.MONGO_URI);
        console.log(response.connection.host);
    } catch (error) {
        console.log(error);
    }
}

export default connectDB