import React, { useState } from 'react'
import styles from "../userManagement/userManagement.module.css";
import {
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";

const AddForm = ({ classModal }) => {
  const [roleName, setRoleName] = useState()

  return (
    <>
      <div className={styles.add_title}> Add Role Name</div>
      <form>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="outlined-name"
              label="Role name"
              type="text"
              variant="standard"
              fullWidth
              onChange={(event) => setRoleName(event.target.value)}
              value={roleName}
            />
            {/* {emailNameError ? (
              <p style={{ color: "red" }}> ** Please enter email </p>
            ) : emailName && emailName.length === 100 ? (
              <p style={{ color: "red" }}> Max 100 Characters</p>
            ) : (
              <p></p>
            )} */}
          </Grid>
          {/* <Grid item xs={12}>
            <FormControl fullWidth variant="standard">
              <InputLabel id="demo-simple-select-standard-label">
                Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Role"
                value={roles}
              // onChange={roleHandler}
              >
                {roles &&
                  roles?.map((item, i) => {
                    return <MenuItem value={item.value}>{item.name}</MenuItem>;
                  })}
              </Select>
            </FormControl>
          </Grid> */}

          <Grid item xs={12}>
            <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
              <FormControlLabel control={<Checkbox />} label="Label" />
              <FormControlLabel control={<Checkbox />} label="Required" />
              <FormControlLabel control={<Checkbox />} label="Disabled" />
              <FormControlLabel control={<Checkbox />} label="Disabled" />
              <FormControlLabel control={<Checkbox />} label="Disabled" />
              <FormControlLabel control={<Checkbox />} label="Disabled" />
              <FormControlLabel control={<Checkbox />} label="Disabled" />
              <FormControlLabel control={<Checkbox />} label="Disabled" />
              <FormControlLabel control={<Checkbox />} label="Disabled" />
            </FormGroup>
            {/* {roleError ? (
              <p style={{ color: "red" }}>** Please choose role</p>
            ) : (
              <p></p>
            )} */}
          </Grid>

          <Grid
            container
            justifyContent="space-around"
            className={styles.addButton}
          >
            <Button variant="outlined" color="secondary" onClick={classModal}>
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
  )
}

export default AddForm