import mongoose from "mongoose";
const { Schema } = mongoose;

export const userSchema = new Schema({
  about: {
    type: String,
    default: "Hey there! I am using Sweeter.",
    required: true,
  },
});
