import { catalogServiceNew } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  const { user: { at = "" } = {}, loggedIn } = req.session;
  const config = {
    method: "post",
    url: "/catalog/publish/8",
    headers: {
      Authorization: `Bearer ${at}`,
    },
    data: req.body,
  };
  // console.log("resss", at);
  catalogServiceNew(config)
    .then((response) => {
      if (response.status === 200) {
        // const csvData = new Blob([response], {
        //   type: "text/csv;charset=utf-8;",
        // });
        // const csvURL = window.URL.createObjectURL(csvData);
        // const tempLink = document.createElement("a");
        // tempLink.href = csvURL;
        // tempLink.setAttribute("download", "catalog.csv");
        // tempLink.click();
        res.status(200).json(response.data);
        // console.log("response.data.result", response.data);
        Promise.resolve();
      }
    })
    .catch((err) => {
      console.log(
        "error caught in -> pages/api/catalogServiceNew/category",
        err
      );
      if (err?.response) {
        const { status = {} } = err?.response;
        res.status(status).json(err.response.data.error + " " + status);
      } else res.status(500).json({ message: "something went wrong" });
      Promise.reject(err);
    });
}

export default withSession(handler);
