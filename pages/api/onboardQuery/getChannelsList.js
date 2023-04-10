
import {  catalogQueryServer} from "../../../utils/axios";

function handler(req, res) {

	const body = req.body;
  // const sku = body.pageNumber
  // const sku2 = body.pageSize

  // console.log("111111", sku);
  // console.log("222222", sku2);

// http://onboard-query-handler.theretailinsightsdemos.com/api/v1/fetchchannel/1/5
// 'http://catalog-query-handler.theretailinsightsdemos.com/api/v1/ct/channel?pageNo=0&pageSize=10'
  const config = {
    method: "get",
    url: `/ct/channel?pageNo=${body.pageNumber}&pageSize=${body.pageSize}`,
    // data: body,

    // url: `/fetchbrand/1/5`
  };
  catalogQueryServer(config)
    .then((response) => { 
      if (response.status === 200) {
        res.status(200).json(response.data);
        Promise.resolve();
      }
    })
    .catch((err) => {
      console.log("error caught in -> pages/api/onboard/getChannelList.js", err);
			if (err?.response?.data) {
				const { status = {} } = err?.response;
				res.status(status).json(err.response.data.error +' '+ status);
      }
      else res.status(500).json({ message: "something went wrong" });
			Promise.reject(err);

    });
 
}

export default handler;
