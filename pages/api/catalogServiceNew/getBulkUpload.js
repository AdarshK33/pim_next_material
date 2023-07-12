import { catalogServiceNew } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  // return new Promise((resolve, reject) => {
  const body = req.body;

  const { user: { at = "" } = {}, loggedIn } = req.session;
  const config = {
    method: "get",
    url: `/catalog/bulk/${body.pageNo}/10`,
    headers: {
      Authorization: `Bearer ${at}`,
    },
    // data: body,
  };

  catalogServiceNew(config)
    .then((response) => {
      // console.log(response,"hello syncCommandServer")
      if (response.status === 200) {
        res.status(200).json(response.data.result);
        Promise.resolve();
      }
    })
    .catch((err) => {
      console.log("error caught in -> api/catalogServiceNew/bulkListing", err);
      // console.log(err.response);
      if (err?.response?.data) {
        const { status = {} } = err?.response;
        res.status(status).json(err.response.data);
      } else res.status(500).json({ message: "something went wrong" });
      Promise.reject(err);
    });
  // }
  // )
}

export default withSession(handler);
