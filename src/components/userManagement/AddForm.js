import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

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
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createUserApi } from "../../../redux/actions/login";

import styles from "./userManagement.module.css";

function AddForm({ classModal }) {
  const { loginReducer } = useSelector((state) => {
    return state;
  });

  // console.log("roleGet", loginReducer?.roleGet);

  const dispatch = useDispatch();

  const [emailName, setEmailName] = useState("");
  const [roleError, setRoleError] = useState(false);
  const [role, setRole] = useState("");
  const [emailNameError, setEmailNameError] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const value = checkValidations();

    if (value === true) {
      let infoData = {
        email: emailName,
        roleId: role,
      };
      // console.log("hello infoData", infoData);

      dispatch(createUserApi(infoData));
    }
  };

  const emailValidations = () => {
    const nameValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailName !== "" && emailName !== null && emailName !== undefined) {
      setEmailNameError(false);

      return true;
    } else {
      setEmailNameError(true);

      return false;
    }
  };

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

  const checkValidations = () => {
    // console.log("isChecked");
    if (
      (emailValidations() == true) &
      (roleValidations() == true)

      //  &
      // (marketValidations() == true)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const roleHandler = (e) => {
    setRole(e.target.value);
  };
  return (
    <>
      <div className={styles.add_title}> Add User</div>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="outlined-name"
              label="Email"
              type="text"
              variant="standard"
              fullWidth
              onChange={(event) => setEmailName(event.target.value)}
            />
            {emailNameError ? (
              <p style={{ color: "red" }}> ** Please enter email </p>
            ) : emailName && emailName.length === 100 ? (
              <p style={{ color: "red" }}> Max 100 Characters</p>
            ) : (
              <p></p>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Role"
                value={role}
                onChange={roleHandler}
              >
                <MenuItem value=""></MenuItem>
                {loginReducer?.roleGet &&
                  loginReducer?.roleGet?.map((item, i) => {
                    return <MenuItem value={item.value}>{item.label}</MenuItem>;
                  })}
              </Select>
            </FormControl>
            {roleError ? (
              <p style={{ color: "red" }}>** Please choose role</p>
            ) : (
              <p></p>
            )}
          </Grid>

          <Grid
            container
            spacing={2}
            justifyContent="space-around"
            className={styles.addButton}
          >
            <Button onClick={classModal} variant="outlined" color="secondary">
              CANCEL
            </Button>

            <Button
              variant="outlined"
              onClick={(e) => submitHandler(e)}
              type="submit"
              // variant="contained"
              color="success"
            >
              SUBMIT
            </Button>
          </Grid>
          {/* </div> */}
        </Grid>
      </form>
    </>
  );
}

export default AddForm;
