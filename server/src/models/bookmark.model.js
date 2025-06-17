import mongoose from "mongoose";

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

export const bookmarkModel = mongoose.model('Bookmark', bookmarkSchema);
