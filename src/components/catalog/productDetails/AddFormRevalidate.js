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

const AddFormRevalidate = ({ classModal, attributeSetIdData }) => {
  const dispatch = useDispatch();

  const router = useRouter();
  // console.log("rrrrrrrrrrrrrrrr", router.query.PimCodeId);

  const [addComment, setAddComment] = useState();
  const [addCommentError, setAddCommentError] = useState(false);

  // useEffect(() => {
  //   let infoData = {
  //     PimCodeId: router.query.PimCodeId,
  //     attributeSetId: 1,
  //     comments: ["hello"],
  //     status: "REVALIDATE",
  //   };

  //   dispatch(revalidateApis(infoData));
  // }, []);

  const commentValidations = () => {
    if (addComment !== "" && addComment !== null && addComment !== undefined) {
      setAddCommentError(false);

      return true;
    } else {
      setAddCommentError(true);
      return false;
    }
  };
  const checkValidations = () => {
    // console.log("isChecked");
    if (commentValidations() == true) {
      return true;
    } else {
      return false;
    }
  };
  const commentHandler = (e) => {
    setAddComment(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const value = checkValidations();

    if (value === true) {
      console.log("onSubmit", addComment);
      let infoData = {
        PimCodeId: router.query.PimCodeId,
        attributeSetId: attributeSetIdData,
        comments: [addComment],
        status: "REVALIDATE",
      };
      dispatch(revalidateApis(infoData));
    }
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
              onChange={commentHandler}
              // onChange={(event) => setAddComment(event.target.value)}
            />
            {addCommentError ? (
              <p style={{ color: "red" }}> ** Please enter comments </p>
            ) : addComment && addComment.length === 100 ? (
              <p style={{ color: "red" }}> Max 100 Characters</p>
            ) : (
              <p></p>
            )}
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
