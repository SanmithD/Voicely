import mongoose from "mongoose";
import { bookmarkModel } from "../models/bookmark.model.js";

export const addToBookmark = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid thread ID",
    });
  }

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid user",
    });
  }

  try {
    const threadId = new mongoose.Types.ObjectId(id);

    // Check if a bookmark already exists
    const existingBookmark = await bookmarkModel.findOne({ threadId, userId });

    if (existingBookmark) {
      await bookmarkModel.deleteOne({ _id: existingBookmark._id });

      return res.status(200).json({
        success: true,
        message: "Removed from bookmarks",
      });
    } else {
      await bookmarkModel.create({ threadId, userId });

      return res.status(201).json({
        success: true,
        message: "Added to bookmarks",
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const getBookMarked = async (req, res) =>{
    const userId = req.user._id;
    if(!userId){
        return res.status(400).json({
            success : false,
            message: "Invalid user"
        })
    }
    try {
        const response = await bookmarkModel.find({ userId }).populate("threadId");
        if(!response){
            return res.status(404).json({
            success : false,
            message: "Not found"
        })
        }
        res.status(200).json({
            success : true,
            message: "Saved threads",
            response
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message: "Server error"
        })
        console.log(error)
    }
}