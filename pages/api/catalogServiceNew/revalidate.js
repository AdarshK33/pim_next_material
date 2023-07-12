import { catalogServiceNew } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  // return new Promise((resolve, reject) => {
  const { user: { at = "" } = {}, loggedIn } = req.session;

  const body = req.body;

  let id = body.model_Code;

  const arrData = [
    {
      attributeSetId: body.attributeSetId,
      // comments: body.comments,
      status: body.status,
    },
  ];
  const config = {
    method: "patch",
    url: `/catalog/comments/${id}`,
    headers: {
      Authorization: `Bearer ${at}`,
    },
    data: arrData,
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
        res.status(status).json(err.response.data);
      } else res.status(500).json({ message: "something went wrong" });
      Promise.reject(err);
    });
  // }
  // )
}

export default withSession(handler);
