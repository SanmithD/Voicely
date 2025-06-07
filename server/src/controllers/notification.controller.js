import { notificationModel } from '../models/notification.model.js';

export const postNotification = async(req, res) =>{
    const { title, content } = req.body;
    const userId = req.user._id;
    try {
        if(!title || !content){
            return res.status(400).json({
                success: false,
                message: "Enter details"
            });
        }
        const response = new notificationModel({
            userId,
            title,
            content
        });
        if(!response){
            return res.status(400).json({
            success: false,
            message: "Fail to post notification"
        });
        }
        await response.save();
        res.status(200).json({
            success: true,
            message: "Notification posted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
}

export const getAllNotifications = async(req, res) =>{
    try {
        const response = await notificationModel.find();
        if(!response){
            return res.status(404).json({
            success: false,
            message: "No notifications found"
        });
        }
        res.status(200).json({
            success: true,
            message: "All Notifications",
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

export const deleteNotification = async(req, res) =>{
    const { id } = req.params;
    if(!id){
        return res.status(404).json({
            success: false,
            message: "Invalid id"
        });
    }
    try {
        const response = await notificationModel.findByIdAndDelete(id);
        if(!response){
            return res.status(404).json({
            success: false,
            message: "Not found"
        });
        }
        res.status(200).json({
            success: true,
            message: "Notification deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error)
    }
}

export const postPersonalNotification = async(req, res) =>{
    const { title, content } = req.body;
    const { userId } = req.params;
    try {
        if(!title || !content){
            return res.status(400).json({
                success: false,
                message: "Enter details"
            });
        }
        const response = new notificationModel({
            userId,
            title,
            content
        });
        if(!response){
            return res.status(400).json({
            success: false,
            message: "Fail to post notification"
        });
        }
        await response.save();
        res.status(200).json({
            success: true,
            message: "Notification posted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
}