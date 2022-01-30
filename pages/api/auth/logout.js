import { withSessionRoute } from "../../../lib/session";
function handler(req, res) {
  req.session.destroy();
  res.status(200).json({});
}

export default withSessionRoute(handler);
