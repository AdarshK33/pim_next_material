import { catalogServiceNew } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  const { user: { at = "" } = {}, loggedIn } = req.session;
  const config = {
    method: "get",
    url: "/catalog/notification",
    headers: {
      Authorization: `Bearer ${at}`,
    },
  };
  catalogServiceNew(config)
    .then((response) => {
      if (response.status === 200) {
        // console.log(response.data.result);
        res.status(200).json(response.data.result);
        Promise.resolve();
      }
    })
    .catch((err) => {
      console.log("error caught in -> pages/api/login/notification.js", err);
      if (err?.response?.data) {
        const { status = {} } = err?.response;
        res.status(status).json(err.response.data);
      } else res.status(500).json({ message: "something went wrong" });
      Promise.reject(err);
    });
}

export default withSession(handler);
