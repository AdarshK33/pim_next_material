import { catalogServiceNew } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  console.log("calling channel mapping api", req.body)
  const { user: { at = "" } = {}, loggedIn } = req.session;
  const body = req.body;
  const channelFilter = body.channelFilter;
  const pageNo = body.pageNo;
  const pageSize = body.pageSize;
  // const {user: {at =""} ={}, loggedIn} = req.session;
  const config = {
    method: "post",
    url: `/catalog/channel_mapping`,
    data: body,
    headers: {
      Authorization: `Bearer ${at}`,
      "Content-Type": "application/json",
    },
  };
  catalogServiceNew(config)
    .then((response) => {
      if (response.status === 200) {
        res.status(200).json(response.data);
      }
    })
    .catch((err) => {
      if (err?.response?.data) {
        const { status = {} } = err?.response;
        res.status(status).json(err.response.data.error + " " + status);
      } else res.status(500).json({ message: "something went wrong" });
    });
}

export default withSession(handler);
