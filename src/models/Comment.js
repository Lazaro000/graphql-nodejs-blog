import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CommentSchema = model('Comment', commentSchema);
