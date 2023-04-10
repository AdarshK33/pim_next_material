
import { catalogQueryServer } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  const { user: { at = "" } = {}, loggedIn } = req.session;
	const body = req.body;
  const pageNo = body.pageNo
  const pageSize = body.pageSize
  // console.log("pageNo",pageNo)

  // http://catalog-query-handler.theretailinsightsdemos.com/api/v1/ct/products?pageNo=0&pageSize=10' \
  const config = {
    method: "get",
    url: `/ct/products?pageNo=${pageNo}&pageSize=${pageSize}`,
    // data: body,
   headers: {
      Authorization: `Bearer ${at}`,
      "Content-Type": "application/json",
    },
  };
  catalogQueryServer(config)
    .then((response) => { 
      // console.log("rrrrrrrrrrrrr",response)
      if (response.status === 200) {
        res.status(200).json(response.data);
        Promise.resolve();
      }
    })
    .catch((err) => {
      console.log("error caught in -> pages/api/catalogQuery/getAllProducts", err);
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
