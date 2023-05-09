import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import edit from "../../../assets/icons/edit.svg";
import Image from "next/image";

import styles from "./category.module.css";

import { Button, Card, CardContent, Typography } from "@mui/material";

import {
  Grid,
  FormControl,
  FormLabel,
  InputLabel,
  Input,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

const Category = () => {
  const data = [
    {
      id: "root-1",
      name: "Parent 1",
      children: [
        {
          id: "1",
          name: "Child - 1",
        },
        {
          id: "3",
          name: "Child - 3",
          children: [
            {
              id: "4",
              name: "Child - 4",
            },
          ],
        },
      ],
    },
    {
      id: "root-2",
      name: "Parent 2",
      children: [
        {
          id: "5",
          name: "Child - 5",
        },
        {
          id: "6",
          name: "Child - 6",
          children: [
            {
              id: "7",
              name: "Child - 7",
            },
          ],
        },
      ],
    },
  ];
  const renderTree = (nodes) => (
    <>
      {nodes.map((node) => (
        <TreeItem key={node.id} nodeId={node.id} label={node.name}>
          {Array.isArray(node.children) ? renderTree(node.children) : null}
        </TreeItem>
      ))}
    </>
  );
  return (
    <div className={styles.catogory_container}>
      {/* <Grid container> */}
      {/* ------------------------- row 1 ------------------------- */}
      {/* <Grid item xs={12} lg={12}> */}
      {/* <Grid item md={4}>
            <button
              onClick={() => setShowBrandCreationForm(true)}
              className={`btn btn-sm ${styles.add_button_text}`}
            >
          + Add New
            </button>
          </Grid> */}
      {/* <Card sx={{}}> */}
      <Grid spacing={2} justifyContent="space-between">
        <Typography variant="h7" className={styles.main_title}>
          Category
        </Typography>
        {/* <Button variant="outlined" color="success" component="label">
                + Add New

              </Button> */}
      </Grid>

      <Grid spacing={2} className={styles.category_menu}>
        <Grid md={3}>
          <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={["root-1", "root-2"]}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{
              height: 400,
              flexGrow: 1,
              maxWidth: 400,
              overflowY: "auto",
            }}
          >
            {renderTree(data)}
          </TreeView>
        </Grid>

        {/* <Grid spacing={3} md={7} className={styles.category_form}> */}
        {/* <form>
                  <Grid spacing={3}>
                    <Grid item xs={4} className={styles.category_input}>
                      <TextField
                        id="outlined-name"
                        label="Name"
                        type="text"
                        variant="standard"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={4} className={styles.category_input}>
                      <FormControl fullWidth variant="standard">
                        <InputLabel
                          id="demo-simple-select-standard-label"
                          variant="standard"
                        >
                          Parent Category
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
                    <Grid item xs={4} className={styles.category_input}>
                      <FormControl fullWidth variant="standard">
                        <InputLabel
                          id="demo-simple-select-standard-label"
                          variant="standard"
                        >
                          Sub Category
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
                    {/* <Grid item xs={6} className={styles.category_input}>
                      <TextField
                        id="outlined-description"
                        label="Slug"
                        type="text"
                        variant="standard"
                        fullWidth
                      />
                    </Grid> */}
        {/* <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        id="outlined-name"
                        label="Description"
                        type="text"
                        variant="standard"
                        multiline
                        rows={4}
                      />
                    </Grid>
                    <Grid
                      
                      spacing={2}
                      justifyContent="flex-end"
                      className={styles.addButton}
                    >
                      {/* <Button
                        // onClick={classModal}
                        variant="outlined"
                        color="secondary"
                      >
                        CANCEL
                      </Button> */}
        {/* <Button
                        variant="outlined"
                        // onClick={submitHandler}
                        type="submit"
                        // variant="contained"
                        color="success"
                      >
                        SUBMIT
                      </Button>
                    </Grid>
                    </div> */}
        {/* </Grid> */}
        {/* </form> */}
        {/* </Grid> */}
      </Grid>
      {/* </Card> */}
      {/* </Grid> */}
      {/* </Grid> */}
    </div>
  );
};

export default Category;
