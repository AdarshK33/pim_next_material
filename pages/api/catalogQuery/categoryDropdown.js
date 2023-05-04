import { catalogQueryServer } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  const { user: { at = "" } = {}, loggedIn } = req.session;
  const config = {
    method: "get",
    url: "/ct/categories",
    headers: {
      Authorization: `Bearer ${at}`,
    },
  };
  catalogQueryServer(config)
    .then((response) => {
      if (response.status === 200) {
        res.status(200).json(response.data.result);
        Promise.resolve();
      }
    })
    .catch((err) => {
      console.log(
        "error caught in -> pages/api/onboardQuery/getCategoryDropdown.js",
        err
      );
      if (err?.response) {
        const { status = {} } = err?.response;
        res.status(status).json(err.response.data.error + " " + status);
      } else res.status(500).json({ message: "something went wrong" });
      Promise.reject(err);
    });
}

export default withSession(handler);
