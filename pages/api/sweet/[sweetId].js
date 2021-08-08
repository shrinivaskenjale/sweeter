import { getSession } from "next-auth/client";
import { connectDB } from "../../../helpers/db";
import { Sweet } from "../../../models/model";

const handler = async (req, res) => {
  await connectDB();

  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: "You are not authenticated." });
    return;
  }

  if (req.method === "GET") {
    try {
      const sweet = await Sweet.findById(req.query.sweetId);
      if (!sweet) {
        res.status(404).json({ message: "Sweet not found." });
        return;
      }
      res.status(200).json({ message: "Fetched sweet.", sweet });
    } catch (error) {
      console.log(error);
    }
  }

  if (req.method === "DELETE") {
    try {
      const sweet = await Sweet.findById(req.query.sweetId);
      if (!sweet) {
        res.status(404).json({ message: "Sweet not found." });
        return;
      }

      if (sweet.creator.toString() !== session.user._id.toString()) {
        res.status(403).json({ message: "You are not authorized." });
        return;
      }

      const response = await Sweet.findByIdAndDelete(req.query.sweetId);
      res.status(200).json({ message: "Deleted sweet." });
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
