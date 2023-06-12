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
import styles from "./attribute.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateAttributeSetApis } from "../../../redux/actions/catalogServiceNew";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateForm({ classModal }) {
  // console.log("classModal", classModal);
  const dispatch = useDispatch();

  const { loginReducer } = useSelector((state) => {
    return state;
  });
  const { attribute_set_get_by_id, loading } = useSelector(
    (state) => state.catalogServiceNewReducer
  );

  // : {},
  // attribute_set_update: {},

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");
  const [precedence, setPrecedence] = useState("");
  const [active, setActive] = useState("");
  const [category, setCategory] = useState("");
  const [nameError, setNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [precedError, setPrecedError] = useState(false);
  const [activeError, setActiveError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  const precedenceArray = [
    {
      name: "Zero",
      value: 0,
    },
    {
      name: "One",
      value: 1,
    },
    {
      name: "Two",
      value: 2,
    },

    {
      name: "Three",
      value: 3,
    },
    {
      name: "Four",
      value: 4,
    },
    {
      name: "Five",
      value: 5,
    },
    {
      name: "Six",
      value: 6,
    },
    {
      name: "Seven",
      value: 7,
    },
    {
      name: "Eight",
      value: 8,
    },
    {
      name: "Nine",
      value: 9,
    },
  ];

  useEffect(() => {
    if (loginReducer?.roleGet) {
      loginReducer?.roleGet?.map((item, i) => {
        if (item.name === attribute_set_get_by_id?.role) {
          setRole(item.name);
        }
      });
    }
    if (precedenceArray) {
      precedenceArray?.map((item) => {
        // console.log("hello value", item);
        if (item.value === attribute_set_get_by_id?.precedence) {
          setPrecedence(item.value);
        }
      });
    }
    setName(attribute_set_get_by_id?.name);
    // console.log("hello precedence", attribute_set_get_by_id?.precedence);

    setDescription(attribute_set_get_by_id?.description);
  }, [attribute_set_get_by_id]);

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const descHandler = (e) => {
    setDescription(e.target.value);
  };

  const roleHandler = (e) => {
    setRole(e.target.value);
  };

  const precedenceHandler = (e) => {
    setPrecedence(e.target.value);
  };

  const activeHandler = (e) => {
    setActive(e.target.value);
  };

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const categoryValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (category !== "" && category !== null && category !== undefined) {
      setCategoryError(false);

      return true;
    } else {
      setCategoryError(true);
      return false;
    }
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

  const precedValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (precedence !== "" && precedence !== null && precedence !== undefined) {
      setPrecedError(false);

      return true;
    } else {
      setPrecedError(true);
      return false;
    }
  };

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
      (roleValidations() == true) &
      (nameValidations() == true) &
      (descValidations() == true) &
      (precedValidations() == true)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const value = checkValidations();

    if (value === true) {
      let updateData = {
        payload: {
          name: name,
          role: role,
          description: description,
          precedence: precedence,
        },
        attribute_set_id: attribute_set_get_by_id?.id,
      };

      // console.log("hello updateData", updateData);

      dispatch(updateAttributeSetApis(updateData));
      classModal();
    }
  };
  return (
    <>
      <div className={styles.add_title}> Update Attribute Set</div>
      {loading ? <p>Loading...</p> : null}
      {!loading && attribute_set_get_by_id?.name ? (
        <form>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="outlined-name"
                label="Name"
                type="text"
                variant="standard"
                value={name}
                onChange={nameHandler}
                fullWidth
              />
              {nameError ? (
                <p style={{ color: "red" }}>** Please enter name</p>
              ) : (
                <p></p>
              )}
            </Grid>
            <Grid item xs={6}>
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

              {descError ? (
                <p style={{ color: "red" }}>** Please enter description</p>
              ) : (
                <p></p>
              )}
            </Grid>

            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="standard">
                <InputLabel id="demo-simple-select-standard-label">
                  Priority Sequence
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Category"
                  value={precedence}
                  onChange={precedenceHandler}
                >
                  <MenuItem value="xyz"></MenuItem>
                  {precedenceArray &&
                    precedenceArray?.map((item) => {
                      return (
                        <MenuItem value={item.value}>{item.name}</MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              {precedError ? (
                <p style={{ color: "red" }}>** Please choose precedence</p>
              ) : (
                <p></p>
              )}
            </Grid>
            {/* <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-name"
              label="Precedence"
              type="text"
              variant="standard"
              value={precedence}
              onChange={precedenceHandler}
            />
          </Grid> */}

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
                // disabled={isLoading}
                color="success"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          <ToastContainer />
        </form>
      ) : null}
    </>
  );
}

export default UpdateForm;
