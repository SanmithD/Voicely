import cloudinary from "../config/cloudinary.config.js";
import { communityModel } from "../models/community.model.js";
import { threadModel } from "../models/thread.model.js";

export const postThread = async(req, res) =>{
    const { title, content, media } = req.body;
    const { communityId } = req.params;
    const userId = req.user._id;
    if(!userId){
        return res.status(404).json({
            success: false,
            message: "Invalid request"
        });
    }
    try {

        const community = await communityModel.findOne({
            _id: communityId,
            $or:[
                { ownerId: userId },
                { 'members.userId': userId }
            ]
        });

        // if(!community){
        //     return res.status(403).json({
        //         success: false,
        //         message: "Your not a member of community"
        //     })
        // }

        let mediaUrl;
        if(media){
            const mediaUploader = await cloudinary.uploader.upload(media);
            mediaUrl = mediaUploader.secure_url;
        }
        const newThread = new threadModel({
            userId,
            title,
            communityId: communityId || null,
            media: mediaUrl || null,
            content
        });
        if(!newThread){
            return res.status(400).json({
            success: false,
            message: "Fail to post thought"
        });
        }
        await newThread.save();
        res.status(201).json({
            success: true,
            message: "Thought posted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
}

export const getAllThread = async(req, res) =>{
    try {
        const response = await threadModel.find();
        if(!response){
            return res.status(404).json({
            success: false,
            message: "Not found"
        });
        }
        res.status(200).json({
            success: true,
            message: "All Thoughts",
            response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error)
    }
}

export const deleteThread = async(req, res) =>{
    const userId = req.user._id;
    if(!userId){
        return res.status(404).json({
            success: false,
            message: "Invalid user id"
        });
    }
    try {
        const response = await threadModel.findOneAndDelete({userId : userId});
        if(!response){
            return res.status(404).json({
            success: false,
            message: "Not found"
        });
        }
        res.status(200).json({
            success: true,
            message: "Thought deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error)
    }
}

export const postReply = async(req, res) =>{
    const { id } = req.params;
    const { message } = req.body;
    const replierId = req.user._id;
    if(!id){
        return res.status(404).json({
            success: false,
            message: "Invalid id"
        });
    }
    try {
        if(!message){
            return res.status(400).json({
            success: false,
            message: "Enter reply"
        }); 
        }
        const thread = await threadModel.findById(id);
        if(!thread){
            return res.status(404).json({
            success: false,
            message: "Not found"
        });
        }
        thread.replies.push({ replierId, message });
        
        await thread.save();
        res.status(201).json({
            success: true,
            message: "Replied to thought"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error)
    }
}

export const giveLike = async(req, res) =>{
    const userId = req.user._id;
    const { threadId } = req.params;
    if(!userId){
        return res.status(400).json({
            success: false,
            message: "Invalid user"
        })
    }
    try {
        let likeCount;
        const thread = await threadModel.findById(threadId);
        if(!thread){
            return res.status(404).json({
            success: false,
            message: "Not found"
        })
        }
        const checkUser = thread.likes.findIndex(
            (like) => like.userId && like.userId.toString() === userId.toString()
        )
        if(checkUser === -1){
            thread.likes.push({ userId, count: 1 });
        }else{
            thread.likes.splice(checkUser, 1)
        }
        await thread.save();
        res.status(200).json({
            success: true,
            message: checkUser ? "Liked" : "Unlike",
            liked: checkUser === -1,
            thread: thread.likes.length
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error)
    }
}

export const getSingleThread = async(req, res) =>{
    const { id } = req.params;
    if(!id){
        return res.status(400).json({
            success: false,
            message: "Invalid request"
        })
    }
    try {
        const response = await threadModel.findById(id);
        if(!response){
        return res.status(400).json({
            success: false,
            message: "Invalid request"
        })
    }
    res.status(200).json({
            success: true,
            message: "Request success",
            response
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error)
    }
}