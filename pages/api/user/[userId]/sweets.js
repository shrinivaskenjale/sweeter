import { connectDB } from "../../../../helpers/db";
import { User, Sweet } from "../../../../models/model";
import { getSession } from "next-auth/client";
import mongoose from "mongoose";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return;
  }

  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: "Not authenticated." });
    return;
  }

  await connectDB();

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
};

export default handler;
