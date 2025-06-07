import mongoose from "mongoose";
import threadDB from "../lib/thread.lib.js";

const bookmarkSchema = new mongoose.Schema({
  threadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

bookmarkSchema.index({ threadId: 1, userId: 1 }, { unique: true });

export const bookmarkModel = threadDB.model('Bookmark', bookmarkSchema);
