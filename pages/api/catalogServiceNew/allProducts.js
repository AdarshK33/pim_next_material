import { catalogServiceNew } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  const body = req.body;
  // const sku = body.pageNumber
  // const sku2 = body.pageSize

  const { user: { at = "" } = {}, loggedIn } = req.session;

  //http://catalogservice-apis.theretailinsightsdemos.com/api/v1/catalog/getAllProduct?pageNo=0&pageSize=5&sortBy=updatedAt&productStatus=DRAFTED
  const config = {
    method: "get",
    url: `/catalog/getAllProduct?pageNo=${body.pageNo}&pageSize=${body.pageSize}&sortBy=${body.sortBy}&productStatus=${body.productStatus}`,
    headers: {
      Authorization: `Bearer ${at}`,
    },
    // data: body,
  };
  console.log("saqlain", config);
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
        "error caught in -> pages/api/catalogServiceNew/getAllProducts.js",
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
