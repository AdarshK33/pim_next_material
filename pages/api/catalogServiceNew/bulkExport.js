// http://catalogservice-apis.theretailinsightsdemos.com/api/v1/catalog/export/381
import { catalogServiceNew } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  const body = req.body;
  const { user: { at = "" } = {}, loggedIn } = req.session;
  // https://catalogservice-apis.theretailinsightsdemos.com/api/v1/catalog/export/382
  // console.log(body.batchDetailsId, "body.batchDetailsId");
  const config = {
    method: "get",
    url: `/catalog/export/${body.batchDetailsId}`,
    // ${body.batchDetailsId}
    headers: {
      Authorization: `Bearer ${at}`,
    },
    // data: body,
  };

  // console.log("resss", config);
  catalogServiceNew(config)
    .then((response) => {
      if (response.status === 200) {
        res.status(200).json(response.data);

        Promise.resolve();
      }
    })
    .catch((err) => {
      console.log(
        "error caught in -> pages/api/catalogServiceNew/bulkExport",
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
