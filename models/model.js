import mongoose from "mongoose";
import { sweetSchema } from "./sweet";
import { userSchema } from "./user";

export const User =
  mongoose.models.User || mongoose.model("User", userSchema, "users");

export const Sweet =
  mongoose.models.Sweet || mongoose.model("Sweet", sweetSchema, "sweets");
