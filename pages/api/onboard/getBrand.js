
import { server } from "../../../utils/axios";

function handler(req, res) {
  const config = {
    method: "get",
    url: "/brand"
  };
  server(config)
    .then((response) => {
      if (response.status === 200) {
        console.log("API SUCCESS from id", response.data);
        res.status(200).json(response.data);
      }
    })
    .catch((err) => {
      console.log("error caught in -> pages/api/onboard/brnad.js", err);
      console.log(err.response);
			if (err?.response?.data) {
				const { status = {} } = err?.response;
				res.status(status).json(err.response.data);
      }
      else res.status(500).json({ message: "something went wrong" });
    });
}

export default handler;
