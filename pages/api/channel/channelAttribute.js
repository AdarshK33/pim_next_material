import { catalogQueryServer, catalogServiceNew } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  const body = req.body;
  const channelFilter = body.channelFilter;
  const pageNo = body.pageNo;
  const pageSize = body.pageSize;
  const { user: { at = "" } = {}, loggedIn } = req.session;
  const config = {
    method: "get",
    // url:`/ct/channel/mapping/${channelFilter}?pageNo=${pageNo}&pageSize=${pageSize}`,
    url: `/catalog/channel/mapping/${channelFilter}?pageNo=${pageNo}&pageSize=${pageSize}`,
    headers: {
      Authorization: `Bearer ${at}`,
    },
  };
  catalogServiceNew(config)
    .then((response) => {
      if (response.status === 200) {
        // console.log('response inside if', response.data.result.content)
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
