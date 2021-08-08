import { connectDB } from "../../../helpers/db";
import { Sweet } from "../../../models/model";

import { getSession } from "next-auth/client";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  await connectDB();

  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: "Not authenticated." });
    return;
  }

  const title = req.body.title.trim();
  const content = req.body.content.trim();
  const imageUrl = req.body.imageUrl;

  // validate inputs
  if (title.length < 5 || content.length < 10) {
    // validation failed
    res.status(422).json({
      message:
        "Title should be minimum 5 characters long and content should be minimum 10 characters long.",
    });
    return;
  }

  // validation passed
  const sweet = new Sweet();
  sweet.title = title;
  sweet.content = content;
  sweet.creator = session.user._id;
  if (imageUrl) {
    sweet.imageUrl = imageUrl;
  }

  try {
    const response = await sweet.save();

    res.status(201).json({
      message: "Sweet created.",
      sweet: response,
    });
  } catch (error) {
    console.log(error);
  }
};
export default handler;
