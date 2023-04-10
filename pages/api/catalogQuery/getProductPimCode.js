
import { catalogQueryServer } from "../../../utils/axios";

function handler(req, res) {
  const body = req.body;
  const pim_code = body.code
 const brandName =body.brand
 console.log(pim_code,"pim_code")
 const config = {
   method: "get",
   url: `/ct/products/${pim_code}/${brandName}`
 };
  catalogQueryServer(config)
    .then((response) => {
      if (response.status === 200) {
        res.status(200).json(response.data.result);
         Promise.resolve();
      }
    })
    .catch((err) => {
      console.log("error caught in -> pages/api/catalogQuery/getProductPimCode", err);
			if (err?.response?.data) {
				const { status = {} } = err?.response;
				res.status(status).json(err.response.data.error +' '+ status);
      }
      else res.status(500).json({ message: "something went wrong" });
       Promise.reject(err);
    });
}

export default handler;
