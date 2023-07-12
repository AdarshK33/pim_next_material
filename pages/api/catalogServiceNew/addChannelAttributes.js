import { catalogServiceNew } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  const body = req.body;

  const { user: { at = "" } = {}, loggedIn } = req.session;

  const config = {
    method: "post",
    url: `/catalog/channelAttributes`,
    headers: {
      Authorization: `Bearer ${at}`,
    },
    data: [body],
  };

  // console.log("helo config", config);
  catalogServiceNew(config)
    .then((response) => {
      // console.log("res1", response);
      if (response) {
        res.status(200).json(response.data);
        Promise.resolve();
      }
    })
    .catch((err) => {
      console.log(
        "error caught in -> pages/api/catalogServiceNew/addChannelAttributes.js",
        err
      );
      if (err?.response?.data) {
        const { status = {} } = err?.response;
        res.status(status).json(err.response.data);
      } else res.status(500).json({ message: "something went wrong" });
      Promise.reject(err);
    });
}

export default withSession(handler);
