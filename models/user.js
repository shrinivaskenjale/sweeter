import mongoose from "mongoose";
const { Schema } = mongoose;

export const userSchema = new Schema({
  about: {
    type: String,
    default: "Still working on it!",
    required: true,
  },
});
