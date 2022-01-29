import User from "../../../models/userModel";
import dbConnect from "../../../lib/dbConnect";
import jwt from "jsonwebtoken";
import { withSessionRoute } from "../../../lib/session";

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

  req.session.user = {
    name: newUser.name,
    email: newUser.email,
  };

  req.session.token = token;

  await req.session.save();

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

export default withSessionRoute(handler);
