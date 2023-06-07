import React, { useState, useEffect } from "react";
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
import styles from "./channels.module.css";
import { updateChannelApi } from "../../../redux/actions/channel";

const UpdateForm = ({ classModal }) => {
  const dispatch = useDispatch();
  const [channelId, setChannelId] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");
  const [nameError, setNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [statusError, setStatusError] = useState(false);

  const { channelReducer } = useSelector((state) => {
    return state;
  });

  const statusArray = [
    {
      name: "Active",
      value: true,
    },
    {
      name: "In-Active",
      value: false,
    },
  ];

  useEffect(() => {
    if (statusArray && channelReducer?.channelById) {
      statusArray?.map((item) => {
        // console.log("items",typeof(channelReducer?.channelById?.isActive));
        if (item.value === channelReducer?.channelById?.isActive) {
          setStatus(item.value);
        }
      });
    }
    setName(channelReducer?.channelById?.channel);
    setDesc(channelReducer?.channelById?.description);
    setChannelId(channelReducer?.channelById?.id);
  }, [channelReducer?.channelById]);

  const submitHandler = (e) => {
    e.preventDefault();

    const value = checkValidations();

    if (value === true) {
      const info = {
        channelId: channelId,

        payload: {
          // channel: name,
          description: desc,
          isActive: status,
        },
      };

      // console.log("updateData", info);

      dispatch(updateChannelApi(info));
    }
  };

  // const nameValidations = () => {
  //     const nameValid = /^[a-zA-Z\b]+$/;
  //     if (name !== "" && name!== null && name !== undefined) {
  //       setNameError(false);

  //       return true;
  //     } else {
  //       setNameError(true);
  //       return false;
  //     }
  //   };

  const descValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (desc !== "" && desc !== null && desc !== undefined) {
      setDescError(false);

      return true;
    } else {
      setDescError(true);
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
    if (
      (statusValidations() == true) &
      (descValidations() == true)
      // (nameValidations() == true)
    ) {
      return true;
    } else {
      return false;
    }
  };

  // const nameHandler = (e) => {
  //   setName(e.target.value);
  // };

  const descHandler = (e) => {
    setDesc(e.target.value);
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  return (
    <>
      <div className={styles.add_title}> Update Channel</div>
      {channelReducer?.loading ? <p>Loading...</p> : null}
      {!channelReducer?.loading && channelReducer?.channelById ? (
        <form>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                id="outlined-name"
                label="Name"
                type="text"
                variant="standard"
                value={name}
                // onChange={nameHandler}
                disabled={true}
                fullWidth
              />
              {/* {nameError ? (
                <p style={{ color: "red" }}>** Please choose name</p>
              ) : (
                <p></p>
              )} */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-name"
                label="Description"
                type="text"
                variant="standard"
                value={desc}
                onChange={descHandler}
                // multiline
                // rows={3}
              />
              {descError ? (
                <p style={{ color: "red" }}>** Please choose description</p>
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
};

export default UpdateForm;
