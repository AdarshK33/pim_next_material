import React, { useState } from "react";
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
const AddFormComment = ({ classModal, valueData }) => {
  // console.log(valueData, "cccccccccccccccccccccccc");
  const submitHandler = (e) => {
    e.preventDefault();
    const value = checkValidations();

    if (value === true) {
      let infoData = {
        email: emailName,
        roleId: role,
      };
      // console.log("hello ADD infoData");

      // dispatch(createUserApi(infoData));
    }
  };
  return (
    <>
      <div className={styles.add_title}>Comment</div>
      <form>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-name"
              label="COMMENTS"
              type="text"
              variant="standard"
              multiline
              value={valueData || "**NO COMMENTS"}
              InputProps={{
                readOnly: true,
              }}
              rows={3}
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

            {/* <Button
              variant="outlined"
              onClick={submitHandler}
              type="submit"
              // variant="contained"
              color="success"
            >
              Save Changes
            </Button> */}
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AddFormComment;
