import User from "../../../models/userModel";
import dbConnect from "../../../lib/dbConnect";
import jwt from "jsonwebtoken";

async function handler(req, res) {
  await dbConnect();

  const { name, email, password, passwordConfirm } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "success",
    token,
    data: {
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    },
  });
}

export default handler;
