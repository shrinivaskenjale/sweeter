import { connectDB } from "../../../../helpers/db";
import { User, Sweet } from "../../../../models/model";
import { getSession } from "next-auth/client";
import mongoose from "mongoose";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: "Not authenticated." });
    return;
  }

  await connectDB();

  if (req.method === "GET") {
    const userId = req.query.userId;
    const currentPage = req.query.page || 1;
    const perPage = 10;

    const ObjectId = mongoose.Types.ObjectId; //objctid constructor

    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ message: "User does not exist." });
        return;
      }
      const totalSweets = await Sweet.countDocuments({
        creator: ObjectId(userId),
      });
      const sweets = await Sweet.find({ creator: ObjectId(userId) })
        .sort("-createdAt")
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .populate("creator")
        .exec();
      res.status(200).json({
        message: "Fetched sweets successfully.",
        sweets,
        totalSweets,
        user,
      });
    } catch (error) {
      console.log(error);
    }
  } else if (req.method === "POST") {
    const userId = req.query.userId;
    const newAbout = req.body.about.trim();

    if (newAbout.length < 5 || newAbout.length > 120) {
      // validation failed
      res.status(422).json({
        message:
          "About should be minimum 5 characters long and maximum 20 characters long.",
      });
      return;
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ message: "User not found." });
        return;
      }

      if (user._id.toString() !== session.user._id.toString()) {
        res.status(403).json({ message: "You are not authorized." });
        return;
      }

      user.about = newAbout;

      await user.save();
      res.status(200).json({ message: "Updated user." });
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
