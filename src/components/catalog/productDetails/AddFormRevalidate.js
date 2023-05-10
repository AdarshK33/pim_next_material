import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Grid,
  FormControl,
  FormLabel,
  InputLabel,
  Input,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import styles from "./productDetails.module.css";

import { useDispatch, useSelector } from "react-redux";
import { revalidateApis } from "../../../../redux/actions/catalogServiceNew";
import { useRouter } from "next/router";

const AddFormRevalidate = ({ classModal }) => {
  const dispatch = useDispatch();

  const router = useRouter();
  // console.log("rrrrrrrrrrrrrrrr", router.query.PimCodeId);

  const [addComment, setAddComment] = useState(["hello"]);

  useEffect(() => {
    let infoData = {
      PimCodeId: router.query.PimCodeId,
      attributeSetId: 1,
      comments: ["hello"],
      status: "REVALIDATE",
    };

    dispatch(revalidateApis(infoData));
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();

    // let infoData = {
    //   attributeSetId: 1,
    //   comments: [addComment],
    //   status: "REVALIDATE",
    // };

    // dispatch(revalidateApis(infoData));
  };
  return (
    <>
      <div className={styles.add_title}>Add issues to revalidate</div>
      <form>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-name"
              label="Text input box here"
              type="text"
              variant="standard"
              multiline
              rows={3}
              onChange={(event) => setAddComment(event.target.value)}
            />
          </Grid>
          <Grid
            container
            justifyContent="space-around"
            className={styles.addButton}
          >
            <Button onClick={classModal} variant="outlined" color="secondary">
              Close
            </Button>

            <Button
              variant="outlined"
              onClick={submitHandler}
              type="submit"
              // variant="contained"
              color="success"
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </>
  );
};

export default AddFormRevalidate;
