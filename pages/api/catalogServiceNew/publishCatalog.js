import { catalogServiceNew } from "../../../utils/axios";
import withSession from "../../../utils/session";

function handler(req, res) {
  const body = req.body;
  const { user: { at = "" } = {}, loggedIn } = req.session;

  // https://catalogservice-apis.theretailinsightsdemos.com/api/v1/catalog/export/9?filetype=JSON
  const config = {
    method: "post",
    url: `/catalog/export/${body.channelId}?filetype=${body.filetype}`,
    headers: {
      Authorization: `Bearer ${at}`,
    },
    data: body.selectedItemIds,
  };

  // console.log("resss", config);
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
        "error caught in -> pages/api/catalogServiceNew/publishcatalog or active product csv download",
        err
      );
      if (err?.response) {
        const { status = {} } = err?.response;
        res.status(status).json(err.response.data);
      } else res.status(500).json({ message: "something went wrong" });
      Promise.reject(err);
    });
}

export default withSession(handler);
