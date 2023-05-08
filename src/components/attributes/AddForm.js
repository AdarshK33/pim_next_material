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
import styles from "./attribute.module.css";
import { useDispatch, useSelector } from "react-redux";

function AddForm({ classModal }) {
  const dispatch = useDispatch();

  const { loginReducer, catalogQueryReducer } = useSelector((state) => {
    return state;
  });

  const dropdownOptions = catalogQueryReducer?.categoryDropdown.map((item) => ({
    value: item.id,
    name: item.name,
  }));

  console.log("cccccccccccccccc", dropdownOptions);
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
      <div className={styles.add_title}> Add Attribute Set</div>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="outlined-name"
              label="Name"
              type="text"
              variant="standard"
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
              multiline
              rows={3}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <InputLabel id="demo-simple-select-standard-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Category"
                value={category}
                onChange={categoryHandler}
              >
                <MenuItem value=""></MenuItem>
                {dropdownOptions &&
                  dropdownOptions.map((item, i) => {
                    return <MenuItem value={item.value}>{item.name}</MenuItem>;
                  })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <InputLabel id="demo-simple-select-standard-label">
                Owner
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
                    return <MenuItem value={item.value}>{item.name}</MenuItem>;
                  })}
              </Select>
            </FormControl>
            {roleError ? (
              <p style={{ color: "red" }}>** Please choose role</p>
            ) : (
              <p></p>
            )}
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <InputLabel id="demo-simple-select-standard-label">
                Priority Sequence
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value=""
                label="Category"
                // onChange={handleChange}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={1}>One</MenuItem>
                <MenuItem value={2}>Two</MenuItem>
                <MenuItem value={3}>Three</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <InputLabel id="demo-simple-select-standard-label">
                Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value=""
                label="Staus"
                // onChange={handleChange}
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
              color="success"
            >
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default AddForm;
