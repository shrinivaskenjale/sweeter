import mongoose from "mongoose";
const { Schema } = mongoose;

export const sweetSchema = new Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String },
    content: { type: String, required: true },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
