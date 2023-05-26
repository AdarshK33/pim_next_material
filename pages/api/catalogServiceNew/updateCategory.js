import { catalogServiceNew } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  const body = req.body;
  const id = body.categoryId;

  const { user: { at = "" } = {}, loggedIn } = req.session;
  const config = {
    method: "patch",
    url: `/catalog/category/${id}`,
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
        "error caught in -> pages/api/catalogServiceNew/category",
        err
      );
      if (err?.response) {
        const { status = {} } = err?.response;
        res.status(status).json(err.response.data.error + " " + status);
      } else res.status(500).json({ message: "something went wrong" });
      Promise.reject(err);
    });
}

export default withSession(handler);
