import { catalogServiceNew } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  // return new Promise((resolve, reject) => {
  const { user: { at = "" } = {}, loggedIn } = req.session;

  const body = req.body;

  let id = body.modelCode;
  const config = {
    method: "patch",
    url: `/catalog/comments/${id}`,
    headers: {
      Authorization: `Bearer ${at}`,
    },
    data: body,
  };
  catalogServiceNew(config)
    .then((response) => {
      if (response.status === 200) {
        res.status(200).json(response.data);
        Promise.resolve();
      }
    })
    .catch((err) => {
      console.log("error caught in -> api/catalogServiceNew/revalidte", err);
      // console.log(err.response);
      if (err?.response?.data) {
        const { status = {} } = err?.response;
        res.status(status).json(err.response.data.error + " " + status);
      } else res.status(500).json({ message: "something went wrong" });
      Promise.reject(err);
    });
  // }
  // )
}

export default withSession(handler);
