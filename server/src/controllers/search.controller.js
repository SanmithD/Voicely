import { communityModel } from "../models/community.model.js";
import { searchModel } from "../models/search.model.js";
import { threadModel } from "../models/thread.model.js";

export const searchThread = async (req, res) => {
  const { data } = req.query;
  const userId = req.user._id;

  if (!data || typeof data !== "string") {
    return res.status(400).json({
      success: false,
      message: "Invalid search query",
    });
  }

  try {
    const threads = await threadModel.find();
    const community = await communityModel.find();

    const searchText = data.toLowerCase();

    const result = threads.filter((thread) => {
      const title = thread.title?.toLowerCase() || "";
      const content = thread.content?.toLowerCase() || "";
      const communityTitle = community.title?.toLowerCase() || "";

      return (
        title.includes(searchText) ||
        content.includes(searchText) ||
        communityTitle.includes(searchText)
      );
    });

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No matching threads found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Search results",
      result,
    });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getRecentSearches = async (req, res) => {
  const userId = req.user._id;
  try {
    const response = await searchModel.findOne({ userId });
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Recent searches",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

export const saveHistory = async (req, res) => {
  const { threadId } = req.params;
  const userId = req.user._id;
  try {
    const existing = await searchModel.findOne({ threadId });
    if (!existing) {
        const data = await threadModel.findOne({ _id: threadId })
        const saveData = new searchModel({
            userId,
            threadId,
            data
      });
      if (!saveData) {
        return res.status(400).json({
          success: false,
          message: "Failed to save search",
        });
      }
      await saveData.save();
    }
    res.status(200).json({
          success: true,
          message: "history saved",
        });
  } catch (error) {
    res.status(500).json({
          success: false,
          message: "Server error",
        });
        console.log(error)
  }
};

export const removeSearches = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await searchModel.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "data removed",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};
