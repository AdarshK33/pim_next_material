import axios from "axios";
import FormData from "form-data";
import formidable from "formidable";
import fs from "fs";
import withSession from "../../../utils/session";
import { toast } from "react-toastify";

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const handler = async (req, res) => {
  const { user: { at = "" } = {}, loggedIn } = req.session;

  const { body } = req;
  // console.log("body here", body);
  const form = new formidable.IncomingForm();
  // console.log("form :>> ", form);

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error uploading file" });
      return;
    }
    const formData = new FormData();
    // console.log("fields :>> ", fields);
    // console.log("files :>> ", files);
    const file = files["file"];
    const mimeType = file.mimetype;
    // console.log(" files.mimetype :>> ", file);
    // console.log("mimeType :>> ", mimeType);

    // this works with nodejs 18 version
    // const fileData = fs.readFileSync(file.filepath);
    // const blobFile = new Blob([fileData], { type: mimeType });
    // console.log('file here', blobFile);
    // formData.append('type', fields.type);
    // formData.append(`prescription_image[]`, blobFile, file.originalFilename);

    formData.append("file", fs.createReadStream(file.filepath), {
      filename: file.originalFilename,
      contentType: file.mimeType,
    });

    // console.log("FormData:", formData.getHeaders());

    axios
      .post(`${process.env.CATALOG_NEW_SERVICE_URL}/catalog/bulk`, formData, {
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${at}`,
          ...formData.getHeaders(),
        },
      })
      .then((response) => {
        // console.log(response, "res here");
        res.status(200).json(response.data.result);
        // toast.info("Bulk File uploaded Successfully !!!");
      })
      .catch((err) => {
        console.log(
          "error caught in -> pages/api/catalogServiceNew/bulk upload",
          err
        );
        if (err?.response) {
          console.log(err?.response)
          const { status = {} } = err?.response;
          res.status(status).json(err.response.data);
        } else res.status(500).json({ message: "something went wrong" });
        Promise.reject(err);
      });
  });
};

export default withSession(handler);
