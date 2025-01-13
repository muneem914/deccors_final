import mongoose, { mongo } from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter blog title"],
      maxLength: [80, "Blog title must be within 80 characters"],
    },
    subTitle: {
      type: String,
      maxLength: [100, "Blog subTitle must be within 80 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add blog description"],
    },
    quote1: {
      type: String,
    },
    quote2: {
      type: String,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        name: {
          type: String,
          required: [true, "Please enter your name"],
        },
        email: {
          type: String,
          required: [true, "Please enter your email"],
        },
        message: {
          type: String,
          required: [true, "Please enter a comment"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
