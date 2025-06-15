import mongoose from "mongoose";
import { communityModel } from "../models/community.model.js";
import { threadModel } from "../models/thread.model.js";

export const createCommunity = async (req, res) => {
  try {
    const ownerId = req.user._id;
    const { title, description } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    const newCommunity = await communityModel.create({
      ownerId,
      title,
      description,
      members: [{ userId: ownerId }],
    });

    res.status(201).json({
      success: true,
      message: "Community created",
      community: newCommunity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const joinCommunity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { communityId } = req.params;

    const community = await communityModel.findById(communityId);
    if (!community)
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });

    const isMember = community.members.some(
      (m) => m.userId.toString() === userId.toString()
    );
    if (isMember)
      return res
        .status(400)
        .json({ success: false, message: "Already a member" });

    community.members.push({ userId });
    await community.save();

    res.status(200).json({ success: true, message: "Joined community" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const leaveCommunity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { communityId } = req.params;

    const community = await communityModel.findById(communityId);
    if (!community)
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });

    const isMember = community.members.some(
      (m) => m.userId.toString() === userId.toString()
    );
    if (!isMember)
      return res
        .status(400)
        .json({ success: false, message: "You are not a member" });

    community.members = community.members.filter(
      (m) => m.userId.toString() !== userId.toString()
    );

    await community.save();

    res.status(200).json({ success: true, message: "Left community" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getCommunityThreads = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid community ID" });
    }

    const community = await communityModel.findById(id);

    if (!community)
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });

    const isMember = community.members.some(
      (m) => m.userId.toString() === userId.toString()
    );
    if (!isMember)
      return res.status(403).json({
        success: false,
        message: "Access denied: join the community first",
      });

    const threads = await threadModel.find({ communityId: id });

    res.status(200).json({ success: true, threads, community });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteCommunity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { communityId } = req.params;

    const community = await communityModel.findById(communityId);
    if (!community)
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });

    if (community.ownerId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only the owner can delete the community",
      });
    }

    await community.deleteOne();

    res.status(200).json({ success: true, message: "Community deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllCommunityThreads = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  if (!id || !userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }
  try {
    const community = await communityModel.findOne({
      _id: id,
      $or: [{ ownerId: userId }, { "members.userId": userId }],
    });
    if (!community) {
      return res.status(400).json({
        success: false,
        message: "Your not member of the community",
      });
    }
    const thread = await threadModel.find({ communityId: id });
    if (!thread) {
      return res.status(404).json({
        success: false,
        message: "Thread not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Community thread",
      thread,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

export const getCommunities = async (req, res) => {
  try {
    const response = await communityModel.find();
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All Communities",
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
