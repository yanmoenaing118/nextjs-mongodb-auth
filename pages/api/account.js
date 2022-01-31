import { withSessionRoute } from "../../lib/session";

const handler = async (req, res) => {
  const user = req.session.user;

  console.log(user);
  res.status(200).json(user);
};

export default withSessionRoute(handler);
