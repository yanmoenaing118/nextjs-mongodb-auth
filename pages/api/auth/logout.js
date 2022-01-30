import { withSessionRoute } from "../../../lib/session";
async function handler(req, res) {
  await req.session.destroy();

  await new Promise((resolve, reject) => {
    setTimeout(() => resolve(""));
  }, 1000);

  res.status(200).json({
    iLoggedIn: false,
  });
}

export default withSessionRoute(handler);
