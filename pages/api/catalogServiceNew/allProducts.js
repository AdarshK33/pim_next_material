import { catalogServiceNew } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  const body = req.body;
  // const sku = body.pageNumber
  // const sku2 = body.pageSize

  const { user: { at = "" } = {}, loggedIn } = req.session;
  // /catalog/products?pageNo=0&pageSize=10&productStatus=DRAFT&sortBy=updatedAt
  const config = {
    method: "get",

    url: `/catalog/products?pageNo=${body.pageNo}&pageSize=10&productStatus=${body.productStatus}&sortBy=updatedAt`,

    // url: `/catalog/products_filter?pageNo=${body.pageNo}&pageSize=${body.pageSize}&productStaus=${body.productStaus}&sortBy=updatedAt`,
    headers: {
      Authorization: `Bearer ${at}`,
    },
    data: body,
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
        "error caught in -> pages/api/catalogServiceNew/getallproduct.js.js",
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
