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
const AddFormRevalidate = ({ classModal }) => {
  const [roleError, setRoleError] = useState(false);
  const [role, setRole] = useState("");

  const [categoryError, setCategoryError] = useState(false);
  const [category, setCategory] = useState("");

  const roleValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (role !== "" && role !== null && role !== undefined) {
      setRoleError(false);

      return true;
    } else {
      setRoleError(true);
      return false;
    }
  };
  const categoryValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (role !== "" && role !== null && role !== undefined) {
      setRoleError(false);

      return true;
    } else {
      setRoleError(true);
      return false;
    }
  };
  const checkValidations = () => {
    // console.log("isChecked");
    if ((categoryValidations() == true) & (roleValidations() == true)) {
      return true;
    } else {
      return false;
    }
  };
  const roleHandler = (e) => {
    setRole(e.target.value);
  };
  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const value = checkValidations();

    if (value === true) {
      let infoData = {
        email: emailName,
        roleId: role,
      };
      console.log("hello ADD infoData");

      // dispatch(createUserApi(infoData));
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
    </>
  );
};

export default AddFormRevalidate;
