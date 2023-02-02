
import { onboardQueryServer } from "../../../utils/axios";

function handler(req, res) {
  const config = {
    method: "get",
    url: "/getMarketplace/dropdown"
  };
  onboardQueryServer(config)
    .then((response) => {
      if (response.status === 200) {
        res.status(200).json(response.data);
      }
    })
    .catch((err) => {
      console.log("error caught in -> pages/api/onboardQuery/getMarketplace.js", err);
			if (err?.response?.data) {
				const { status = {} } = err?.response;
				res.status(status).json(err.response.data.error +' '+ status);
      }
      else res.status(500).json({ message: "something went wrong" });
    });
}

export default handler;
