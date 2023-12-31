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
  CircularProgress,
} from "@mui/material";
import styles from "./channels.module.css";
import { useDispatch, useSelector } from "react-redux";
//   import { createAttributeSetApi } from "../../../redux/actions/catalogServiceNew";
import { ToastContainer } from "react-toastify";
import { createChannelApi } from "../../../redux/actions/channel";

function AddForm({ classModal }) {
  console.log("classModal", classModal);
  const dispatch = useDispatch();

  // const { loginReducer, catalogQueryReducer, loading } = useSelector(
  //   (state) => {
  //     return state;
  //   }
  // );
  // const [isLoading, setIsLoading] = useState(false);

  // console.log("catalogQueryReducer", catalogQueryReducer);

  // const dropdownOptions = catalogQueryReducer?.catagories?.map((item) => ({
  //   value: item.id,
  //   name: item.name,
  // }));

  // console.log("cccccccccccccccc", dropdownOptions);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState("");
  const [nameError, setNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [activeError, setActiveError] = useState(false);

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const descHandler = (e) => {
    setDescription(e.target.value);
  };

  const activeHandler = (e) => {
    setActive(e.target.value);
  };

  const nameValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (name !== "" && name !== null && name !== undefined) {
      setNameError(false);

      return true;
    } else {
      setNameError(true);
      return false;
    }
  };

  const descValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (
      description !== "" &&
      description !== null &&
      description !== undefined
    ) {
      setDescError(false);

      return true;
    } else {
      setDescError(true);
      return false;
    }
  };

  // const roleValidations = () => {
  //   const nameValid = /^[a-zA-Z\b]+$/;
  //   if (role !== "" && role !== null && role !== undefined) {
  //     setRoleError(false);

  //     return true;
  //   } else {
  //     setRoleError(true);
  //     return false;
  //   }
  // };

  const activeValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (active !== "" && active !== null && active !== undefined) {
      setActiveError(false);

      return true;
    } else {
      setActiveError(true);
      return false;
    }
  };

  const checkValidations = () => {
    // console.log("isChecked");
    if (
      // (roleValidations() == true) &
      (nameValidations() == true) &
      (descValidations() == true) &
      (activeValidations() == true)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const submitHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const value = checkValidations();

    if (value === true) {
      let data = {
        channelName: name,
        description: description,
        isActive: active,
      };
      // console.log("hello ADD infoData", data);

      dispatch(createChannelApi(data));
      setIsLoading(false);
      classModal();
    }
  };
  return (
    <>
      <div className={styles.add_title}> Add Channels</div>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="outlined-name"
              label="Name"
              type="text"
              variant="standard"
              value={name}
              onChange={nameHandler}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-name"
              label="Description"
              type="text"
              variant="standard"
              value={description}
              onChange={descHandler}
            // multiline
            // rows={3}
            />
          </Grid>

          {/* <Grid item xs={6}>
              <FormControl fullWidth variant="standard">
                <InputLabel id="demo-simple-select-standard-label">
                  Role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Role"
                  value={role}
                  onChange={roleHandler}
                >
                  <MenuItem value=""></MenuItem>
                  {loginReducer?.roleGet &&
                    loginReducer?.roleGet?.map((item, i) => {
                      return <MenuItem value={item.name}>{item.name}</MenuItem>;
                    })}
                </Select>
              </FormControl>
              {roleError ? (
                <p style={{ color: "red" }}>** Please choose role</p>
              ) : (
                <p></p>
              )}
            </Grid> */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="standard">
              <InputLabel id="demo-simple-select-standard-label">
                Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={active}
                onChange={activeHandler}
                label="Status"
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>In-Active</MenuItem>
              </Select>
            </FormControl>
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
              onClick={submitHandler}
              type="submit"
              // variant="contained"
              disabled={isLoading}
              color="success"
            >
              {isLoading ? <CircularProgress size={12} /> : "Submit"}
            </Button>
          </Grid>
        </Grid>
        <ToastContainer />
      </form>
    </>
  );
}

export default React.memo(AddForm);


