import { onboardServer,authServer,onboardQueryServer } from "../../utils/axios";

import withSession from "../../utils/session";

function handler(req, res) {
  let loggedIn = false;
  let user = {};
  if (!Object.keys(req.session).length) {
    authServer.setJwtToken("");
  }
  if (!Object.keys(req.session).length) {
    onboardQueryServer.setJwtToken("");
  }
  if (!Object.keys(req.session).length) {
    onboardServer.setJwtToken("");
  }
  else if (req.session && req.session.loggedIn) {
    loggedIn = true;
    user = req.session.user;
    res.status(200).json({ user, loggedIn });
  } else {
    user = req.session.user;
    res.status(200).json({ user, loggedIn });
  }
}

export default withSession(handler);
