import User from "../../../models/userModel";
import dbConnect from "../../../lib/dbConnect";
import jwt from "jsonwebtoken";

import { withSessionRoute } from "../../../lib/session";

async function handler(req, res) {
  await dbConnect();

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "Please provide email and password",
    });
  }

  const user = await User.findOne({
    email,
  }).select("+password");

  // check if user exists and password is correct

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      error: true,
      message: "Incorrect email or password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  req.session.user = {
    name: user.name,
    email: user.email,
  };

  req.session.token = token;

  await req.session.save();

  res.status(200).json({
    status: "success",
    token,
    data: {
      user: {
        name: user.name,
        email: user.email,
      },
    },
  });
}

export default withSessionRoute(handler);
