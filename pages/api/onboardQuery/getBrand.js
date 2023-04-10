
import { catalogQueryServer } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  const { user: { at = "" } = {}, loggedIn } = req.session;
  // console.log("Brand loggedIn",at,loggedIn)
	const body = req.body;
  // const sku = body.pageNumber
  // const sku2 = body.pageSize

  // console.log("111111", sku);
  // console.log("222222", sku2);

// http://onboard-query-handler.theretailinsightsdemos.com/api/v1/fetchbrand/1/5
// 'http://catalog-query-handler.theretailinsightsdemos.com/api/v1/ct/brand?pageNo=0&pageSize=10'
  const config = {
    method: "get",
    url: `/ct/brand?pageNo=${body.pageNumber}&pageSize=${body.pageSize}`,
    // data: body,
   headers: {
      Authorization: `Bearer ${at}`,
      "Content-Type": "application/json",
    },
  };
  catalogQueryServer(config)
    .then((response) => { 
      if (response.status === 200) {
        res.status(200).json(response.data);
        Promise.resolve();
      }
    })
    .catch((err) => {
      console.log("error caught in -> pages/api/onboard/getBrand.js", err);
			if (err?.response?.data) {
				const { status = {} } = err?.response;
				res.status(status).json(err.response.data.error +' '+ status);
      }
      else res.status(500).json({ message: "something went wrong" });
			Promise.reject(err);

    });
 
}

// export default handler;
export default withSession(handler);
