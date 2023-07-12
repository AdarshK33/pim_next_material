import { catalogServiceNew } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  const body = req.body;
  const id = body.category_id;

  // console.log("update adarsh", body.category_id, body.payload);

  const { user: { at = "" } = {}, loggedIn } = req.session;
  const config = {
    method: "patch",
    url: `/catalog/OnlineCategory/${id}`,
    headers: {
      Authorization: `Bearer ${at}`,
    },
    data: body.payload,
  };
  catalogServiceNew(config)
    .then((response) => {
      if (response.status === 200) {
        res.status(200).json(response.data.result);
        Promise.resolve();
      }
    })
    .catch((err) => {
      console.log(
        "error caught in -> pages/api/catalogServiceNew/update OnlineCategory",
        err
      );
      if (err?.response) {
        const { status = {} } = err?.response;
        res.status(status).json(err.response.data);
      } else res.status(500).json({ message: "something went wrong" });
      Promise.reject(err);
    });
}

export default withSession(handler);
