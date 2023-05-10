import { catalogServiceNew } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  const body = req.body;
  const category = body.category;
  const { user: { at = "" } = {}, loggedIn } = req.session;
  let data = {
    name: body.name,
    role: body.role,
    description: body.description,
    precedence: body.precedence,
    active: body.active,
  };
  const config = {
    method: "post",
    url: `/catalog/attribute_set/${category}`,
    headers: {
      Authorization: `Bearer ${at}`,
    },
    data: data,
  };
  console.log("saq", config);

  catalogServiceNew(config)
    .then((response) => {
      console.log("res1", response);
      if (response.status === 200) {
        res.status(200).json(response.data);
        Promise.resolve();
      }
    })
    .catch((err) => {
      console.log(
        "error caught in -> pages/api/catalogServiceNew/createAttribute.js",
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
