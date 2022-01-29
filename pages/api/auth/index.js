import { withSessionRoute } from "../../../lib/session";

async function handler(req, res) {
  const user = req.session.user;
  const token = req.session.token;

  res.status(200).json({ user, token });
}

export default withSessionRoute(handler);
