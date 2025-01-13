import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  message: {
    type: String,
    required: [true, "Please enter your message"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    messages: [messageSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
