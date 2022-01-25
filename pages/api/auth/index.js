import { withSessionRoute } from "../../../lib/session";

async function handler(req, res) {
  const user = req.session.user;
  const token = req.session.token;

  console.log(user, token);

  if (!user || !token) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized access:(",
      isLoggedIn: false,
    });
  }

  res.status(200).json({ user, token, isLoggedIn: true });
}

export default withSessionRoute(handler);
