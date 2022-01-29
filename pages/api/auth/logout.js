import { withSessionRoute } from "../../../lib/session";
async function handler(req, res) {
  await req.session.destroy();

  res.status(200).json({
    iLoggedIn: false,
  });
}

export default withSessionRoute(handler);
