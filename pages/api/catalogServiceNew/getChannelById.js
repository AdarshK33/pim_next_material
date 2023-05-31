import { catalogServiceNew } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  const body = req.body;
    const id = body.channelId
    console.log("sonu",body, id);
  const { user: { at = "" } = {}, loggedIn } = req.session;

  const config = {
    method: "get",
    url: `/catalog/channel/${id}`,
    headers: {
      Authorization: `Bearer ${at}`,
    },
  };
  catalogServiceNew(config)
    .then((response) => {
      if (response.status === 200) {
        res.status(200).json(response.data);
        Promise.resolve();
      }
    })
    .catch((err) => {
      console.log("error caught in -> pages/api/login/getChannelById.js", err);
      if (err?.response?.data) {
        const { status = {} } = err?.response;
        res.status(status).json(err.response.data.error + " " + status);
      } else res.status(500).json({ message: "something went wrong" });
      Promise.reject(err);
    });
}

export default withSession(handler);