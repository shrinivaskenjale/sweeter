import { connectDB } from "../../helpers/db";
import { Sweet } from "../../models/model";
import { getSession } from "next-auth/client";

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

  const currentPage = req.query.page || 1;
  const perPage = 10;

  try {
    const totalSweets = await Sweet.countDocuments();
    const sweets = await Sweet.find()
      .sort("-createdAt")
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .populate("creator")
      .exec();
    res.status(200).json({
      message: "Fetched sweets successfully.",
      sweets,
      totalSweets,
    });
  } catch (error) {
    console.log(error);
  }
};

export default handler;
