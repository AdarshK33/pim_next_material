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
import { createChannelAttributesApi } from "../../../../redux/actions/channel";

import styles from "./channelAddAttributes.module.css";

function AddForm({ classModal, dataID }) {
  const { loginReducer } = useSelector((state) => {
    return state;
  });

  // console.log("dataID", dataID);

  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const [nameError, setNameError] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const value = checkValidations();

    if (value === true) {
      let infoData = {
        keyName: name,
        channelId: dataID,
        inputType: "text",
        mandatory: true,
        readOnly: true,
        aliasKeyName: name,
        structureType: "ARRAY",
      };
      // console.log("hello infoData", infoData);

      dispatch(createChannelAttributesApi(infoData));
      classModal();
    }
  };

  const nameValidations = () => {
    const nameValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name !== "" && name !== null && name !== undefined) {
      setNameError(false);

      return true;
    } else {
      setNameError(true);

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

  const statusValidations = () => {
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
      nameValidations() == true

      //  &
      // (marketValidations() == true)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className={styles.add_modal_title}> Add Channel Attributes</div>
      <form>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="outlined-name"
              label="KeyName"
              type="text"
              variant="standard"
              fullWidth
              onChange={(event) => setName(event.target.value)}
            />
            {nameError ? (
              <p style={{ color: "red" }}> ** Please enter KeyName </p>
            ) : name && name.length === 100 ? (
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
              CANCEL
            </Button>

            <Button
              variant="outlined"
              type="submit"
              // variant="contained"
              color="success"
              onClick={(e) => submitHandler(e)}
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
