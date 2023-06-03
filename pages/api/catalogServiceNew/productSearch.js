import { catalogServiceNew } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  const body = req.body;
  const { user: { at = "" } = {}, loggedIn } = req.session;

  const config = {
    method: "get",
    url: `/catalog/search?productStatus=${body.productStatus}`,
    headers: {
      Authorization: `Bearer ${at}`,
    },
    // data: body,
  };

  catalogServiceNew(config)
    .then((response) => {
      //   console.log("check adarsh", response.data);
      if (response.status === 200) {
        res.status(200).json(response.data);
        Promise.resolve();
      }
    })
    .catch((err) => {
      console.log(
        "error caught in -> api/catalogServiceNew/productSearch",
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
