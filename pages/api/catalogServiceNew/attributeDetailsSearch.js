import { catalogServiceNew } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  const body = req.body;
  const { user: { at = "" } = {}, loggedIn } = req.session;
  const config = {
    method: "get",

    url: `/catalog/attributes/search/${body.id}?search=${body.search}&pageNo=${body.pageNo}&pageSize=10`,
    //http://catalogservice-apis.theretailinsightsdemos.com/api/v1/catalog/attributes/search/58?search=abc&pageNo=0&pageSize=10
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
        "error caught in -> pages/api/catalogServiceNew/attribute details search.js",
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
