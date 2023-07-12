import { authServer } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  const body = req.body;

  const { user: { at = "" } = {}, loggedIn } = req.session;

  const config = {
    method: "get",
    url: `/auth/users?pageNo=${body.pageNo}&pageSize=${body.pageSize}&role=${body.role}`,
    headers: {
      Authorization: `Bearer ${at}`,
    },
  };
  authServer(config)
    .then((response) => {
      if (response.status === 200) {
        res.status(200).json(response.data);
        Promise.resolve();
      }
    })
    .catch((err) => {
      console.log("error caught in -> pages/api/login/filterUser.js", err);
      if (err?.response?.data) {
        const { status = {} } = err?.response;
        res.status(status).json(err.response.data);
      } else res.status(500).json({ message: "something went wrong" });
      Promise.reject(err);
    });
}

export default withSession(handler);
