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
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { updateUserApi } from "../../../redux/actions/login";

import styles from "./userManagement.module.css";

function UpdateForm({ classModal }) {
  const { loginReducer } = useSelector((state) => {
    return state;
  });

  // console.log("roleGet,getIdUser", loginReducer?.roleGet, loginReducer?.getIdUser);

  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [roleError, setRoleError] = useState(false);
  const [statusError, setStatusError] = useState(false);

  console.log("sk", email, role, status, userId);
  const statusArray = [
    {
      name: "Active",
      value: "true",
    },
    {
      name: "In-Active",
      value: "false",
    },
  ];

  useEffect(() => {
    if (loginReducer?.roleGet && loginReducer?.getIdUser) {
      loginReducer?.roleGet?.map((item, i) => {
        // console.log("items",item,loginReducer?.getIdUser?.roleId);
        if (item.value === loginReducer?.getIdUser?.roleId) {
          setRole(item.value);
        }
      });
    }
    if (statusArray && loginReducer?.getIdUser) {
      statusArray?.map((item) => {
        // console.log("items",typeof(loginReducer?.getIdUser?.status));
        if (item.value === loginReducer?.getIdUser?.status) {
          setStatus(item.value);
        }
      });
    }
    setEmail(loginReducer?.getIdUser?.email);
    // setStatus(loginReducer?.getIdUser?.status);
    setUserId(loginReducer?.getIdUser?.userId);
  }, [loginReducer?.getIdUser]);

  // console.log("hello role", role);

  // console.log("loginReducer?.getIdUser?.role", loginReducer?.roleGet);

  const submitHandler = (e) => {
    e.preventDefault();

    const value = checkValidations();

    if (value === true) {
      const updateData = {
        userId: userId,
        roleId: role,
        Status: status,
      };

      // console.log("updateData", updateData);

      dispatch(updateUserApi(updateData));
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

  const statusValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (status !== "" && status !== null && status !== undefined) {
      setStatusError(false);

      return true;
    } else {
      setStatusError(true);
      return false;
    }
  };

  const checkValidations = () => {
    // console.log("isChecked");
    if (
      (statusValidations() == true) &
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

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  return (
    <>
      <div className={styles.add_title}> Update User</div>
      {loginReducer?.loading ? <p>Loading...</p> : null}
      {!loginReducer?.loading && loginReducer?.getIdUser ? (
        <form>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                id="outlined-name"
                label="Email"
                type="text"
                variant="standard"
                disabled={true}
                value={email}
                fullWidth
              />
              {/* {emailNameError ? (
              <p style={{ color: "red" }}> ** Please enter email </p>
            ) : emailName && emailName.length === 100 ? (
              <p style={{ color: "red" }}> Max 100 Characters</p>
            ) : (
              <p></p>
            )} */}
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="standard">
                <InputLabel id="demo-simple-select-standard-label">
                  Role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Role"
                  value={role}
                  onChange={(e) => roleHandler(e)}
                >
                  <MenuItem value=""></MenuItem>
                  {loginReducer?.roleGet &&
                    loginReducer?.roleGet?.map((item, i) => {
                      return (
                        <MenuItem value={item.value}>{item.name}</MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              {roleError ? (
                <p style={{ color: "red" }}>** Please choose role</p>
              ) : (
                <p></p>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="standard">
                <InputLabel id="demo-simple-select-standard-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={status}
                  label="Staus"
                  onChange={(e) => statusHandler(e)}
                >
                  <MenuItem value=""></MenuItem>
                  {statusArray &&
                    statusArray?.map((item) => {
                      return (
                        <MenuItem value={item.value}>{item.name}</MenuItem>
                      );
                    })}
                  {/* <MenuItem value={true}>Active</MenuItem> */}
                  {/* <MenuItem value={false}>In-Active</MenuItem> */}
                </Select>
              </FormControl>
              {statusError ? (
                <p style={{ color: "red" }}>** Please choose status</p>
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
                CANCEL
              </Button>

              <Button
                variant="outlined"
                type="submit"
                // variant="contained"
                color="success"
                onClick={(e) => submitHandler(e)}
              >
                UPDATE
              </Button>
            </Grid>
            {/* </div> */}
          </Grid>
        </form>
      ) : null}
    </>
  );
}

export default UpdateForm;
