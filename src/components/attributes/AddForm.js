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
import styles from "./attribute.module.css";

function AddForm({ classModal }) {
  const [state, setState] = useState({
    Name: "",
    Description: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className={styles.add_title}> Add Attribute Set</div>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="outlined-name"
              label="Name"
              type="text"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-description"
              label="Description"
              type="text"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value=""
                label="Category"
                // onChange={handleChange}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Owner
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value=""
                label="Category"
                // onChange={handleChange}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Priority Sequence
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value=""
                label="Category"
                // onChange={handleChange}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={1}>Ten</MenuItem>
                <MenuItem value={2}>Two</MenuItem>
                <MenuItem value={3}>Three</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value=""
                label="Staus"
                // onChange={handleChange}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={10}>Active</MenuItem>
                <MenuItem value={20}>In-Active</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* <div className={`text-center`}> */}
          {/* <div>
              <Button onClick={classModal} variant="outlined" color="secondary">
                CANCEL
              </Button>
            </div> */}
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
              onClick={submitHandler}
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
