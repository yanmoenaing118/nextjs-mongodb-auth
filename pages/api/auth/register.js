import User from "../../../models/userModel";
import dbConnect from "../../../lib/dbConnect";

async function handler(req, res) {
  await dbConnect();

  const newUser = await User.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
}

export default handler;
