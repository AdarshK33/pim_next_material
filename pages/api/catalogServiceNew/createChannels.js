import { catalogServiceNew } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  const body = req.body;
  //   const category = body.category;
  const { user: { at = "" } = {}, loggedIn } = req.session;
  let data = {
    channelName: body.channelName,
    description: body.description,
    isActive: body.isActive,
  };
  const config = {
    method: "post",
    url: `/catalog/create_channel`,
    // url: `/catalog/createChannel`,
    headers: {
      Authorization: `Bearer ${at}`,
    },
    data: data,
  };
  // console.log("saq", config);

  catalogServiceNew(config)
    .then((response) => {
      //   console.log("res1", response);
      if (response.status === 200) {
        res.status(200).json(response.data);
        Promise.resolve();
      }
    })
    .catch((err) => {
      console.log(
        "error caught in -> pages/api/catalogServiceNew/createchannel.js",
        err
      );
      if (err?.response?.data) {
        const { status = {} } = err?.response;
        res.status(status).json(err.response.data.error + " " + status);
      } else res.status(500).json({ message: "something went wrong" });
      Promise.reject(err);
    });
}

export default withSession(handler);
