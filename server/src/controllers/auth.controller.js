import bcrypt from "bcrypt";
import { generateToken } from "../config/token.config.js";
import authModel from "../models/auth.model.js";
import { bookmarkModel } from "../models/bookmark.model.js";
import { communityModel } from "../models/community.model.js";
import { threadModel } from "../models/thread.model.js";
import { sendMail } from "../service/email.service.js";

export const signup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All the fields are required",
    });
  }
  try {
    if (password.length < 5) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 5 characters",
      });
    }
    const user = await authModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new authModel({
      username: "Anonymous",
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        success: true,
        message: "New user signup",
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid user data",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }
    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isPassword = bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(500).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = generateToken(user._id, res);
    res.status(200).json({
      success: true,
      message: "Login success",
      username: user.username,
      _id: user._id,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

export const profile = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res.status(404).json({
      success: false,
      message: "Invalid user id",
    });
  }
  try {
    const profile = await authModel.findOne({ _id: userId }).select("-password")
    const response = await threadModel.find({ userId: userId });
    const bookmark = await bookmarkModel.find({ userId }).populate('userId').populate('threadId');
    const userCommunityThreads = await communityModel.findOne({ $or: [
      { ownerId: userId },
      { 'members.userId': userId }
    ] });
    if (!response || !profile) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Posted thoughts",
      profile,
      response,
      bookmark,
      community: userCommunityThreads
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

export const deleteAccount = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }
  try {
    const response = await authModel.findByIdAndDelete(userId);
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Account deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

export const getUserProfile = async(req, res) =>{
  const { id } = req.params;
  if(!id){
    return res.status(400).json({
      success: false,
      message: "Invalid request"
    })
  }
  try {
    const response = await authModel.findById(id).select("-password");
    const userThreads = await threadModel.findOne({ userId: id });
    const userCommunityThreads = await communityModel.findOne({ $or: [
      { ownerId: id },
      { 'members.userId': id }
    ] });
    if(!response || !userThreads){
      return res.status(404).json({
        success: false,
        message: "Request failed"
      });
    };
    res.status(200).json({
        success: true,
        message: "User profile",
        response,
        userThreads,
        userCommunityThreads
      });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Server error"
      });
      console.log(error)
  }
}

export const checkAuth = async(req, res) =>{
  try {
    res.status(200).json(
      req.user
    )
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
    console.log(error);
  }
}

export const deleteUserProfile = async(req, res) =>{
  const { id } = req.params;
  if(!id){
    return res.status(400).json({
      success : false,
      message: "Invalid request"
    });
  };
  try {
    const msg = `
    Dear user <br/>
    Your Voicely account has been <strong>deleted</strong> by the admin due violation of voicely privacy police rule
    <br/>
    Thank for understanding
    `
    const { email } = await authModel.findById(id);
    const response = await authModel.findByIdAndDelete(id);
    if(!response){
      return res.status(404).json({
        success: false,
        message: "Request failed"
      });
    }
    const isDeleted = sendMail(email, "Account suspended", msg);
    if(!isDeleted){
      return res.status(400).json({
        success: false,
        message: "Fail to send mail"
      })
    }
    res.status(200).json({
        success: true,
        message: "Account deleted",
      });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Server error"
      });
      console.log(error);
  }
}

let userEmail;

export const resetPass = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    userEmail = email;
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    //change link after frontend
    const resetLink = `http://your-frontend.com/reset-password?token=${token}`;

    await sendMail(
      email,
      "Reset Password - Voicely",
      `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 15 minutes.</p>`
    );

    return res.status(200).json({
      success: true,
      message: "Reset link sent to your email",
    });
  } catch (error) {
    console.error("Reset email error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const changePassword = async(req, res) =>{
  const { password } = req.body;
  if(!password){
    return res.status(404).json({
        success: false,
        message: "Request failed"
      });
  }
  try {
    const hashPassword = await bcrypt.hash(password, 10)
    const user = await authModel.findOneAndUpdate({ email: userEmail },{
      password: hashPassword
    },{ new: true });
    if(!user){
      return res.status(404).json({
        success: false,
        message: "fail change password"
      });
    }
    res.status(200).json({
        success: true,
        message: "Password Changed"
      });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Server error"
      });
      console.log(error);
  }
}