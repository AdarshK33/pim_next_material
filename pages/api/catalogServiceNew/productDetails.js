import { catalogServiceNew } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  const body = req.body;

  const { user: { at = "" } = {}, loggedIn } = req.session;
  // const PimCode = body.PimCode;
  const config = {
    method: "get",
    url: `/catalog/product/${body.PimCode}`,
    headers: {
      Authorization: `Bearer ${at}`,
    },
    // data: body,
  };
  catalogServiceNew(config)
    .then((response) => {
      // console.log("res1", response);
      if (response.status === 200) {
        res.status(200).json(response.data);
        Promise.resolve();
      }
    })
    .catch((err) => {
      console.log(
        "error caught in -> pages/api/catalogServiceNew/getallproductdetails.js.js",
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
