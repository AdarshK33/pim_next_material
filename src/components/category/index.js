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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  Box,
} from "@mui/material";

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesApi,
  getCategoriesListApi,
  addCategoryApi,
} from "../../../redux/actions/catalogServiceNew";

import AddCategory from "./addCategory";

const Category = () => {
  const dispatch = useDispatch();

  const { catagories } = useSelector((state) => state.catalogQueryReducer);
  const { categoryList } = useSelector(
    (state) => state.catalogServiceNewReducer
  );

  // console.log(categoryList, "categoryList");

  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [slug, setSlug] = useState("");

  const [nameError, setNameError] = useState(false);
  const [descError, setDescError] = useState(false);

  console.log(selectedNodeId, "hello selectedNodeId");

  useEffect(() => {
    dispatch(getCategoriesApi());
    dispatch(getCategoriesListApi());
  }, []);

  useEffect(() => {
    if (selectedNodeId) {
      setName(selectedNodeId?.name);
      setDescription();
      let parentObj = findNestedCategoryById(
        categoryList,
        selectedNodeId?.parentCategoryId
      );
    }
  }, [selectedNodeId]);

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
  const renderTree = (nodes) => {
    return (
      <>
        {nodes?.length > 0 &&
          nodes.map((node) => (
            <TreeItem
              key={node.id}
              nodeId={node.id}
              label={node.name}
              style={{ margin: 10 }}
              // onLabelClick={handleNodeSelect(nodes)}
            >
              {/* <ChevronRightIcon /> */}
              {Array.isArray(node.categories)
                ? renderTree(node.categories)
                : null}
            </TreeItem>
          ))}
      </>
    );
  };
  const handleNodeSelect = (event, nodeId) => {
    setSelectedNodeId(findNestedCategoryById(categoryList, nodeId));

    setShowAddForm(false);
    setNameError(false);
    setDescError(false);
    setName("");
    setDescription("");
  };

  //   /*-----------------  selected catagory menu------------------*/
  function findNestedCategoryById(categories, id) {
    for (let category of categories) {
      if (category.id === id) {
        return category;
      } else if (category.categories.length > 0) {
        const nestedCategory = findNestedCategoryById(category.categories, id);
        if (nestedCategory) {
          return nestedCategory;
        }
      }
    }
    return null;
  }

  //   /*-----------------  selected catagory menu------------------*/

  const submitHandler = (e) => {
    e.preventDefault();

    const value = checkValidations();

    if (value === true) {
      if (!selectedNodeId && showAddForm == false) {
        const addParentInfo = {
          // new categopry
          //  precedence is not required
          name: name,
          description: description,
          slug: "string", // now empty sending
          // precedence:
        };

        dispatch(addCategoryApi(addParentInfo));
      }
      if (selectedNodeId && showAddForm == false) {
        // update will call
      }
      if (selectedNodeId && showAddForm == true) {
        // set sub category  will call
      }
    }
  };

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const descHandler = (e) => {
    setDescription(e.target.value);
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

  const checkValidations = () => {
    // console.log("isChecked");
    if ((nameValidations() == true) & (descValidations() == true)) {
      return true;
    } else {
      return false;
    }
  };

  const cancelToNewAdd = () => {
    setShowAddForm(false);
    setSelectedNodeId();
  };

  const addNewBtn = () => {
    setShowAddForm(true);
    if (selectedNodeId) {
      // set sub category  will call

      setNameError(false);
      setDescError(false);
      setName("");
      setDescription("");
    }
  };

  return (
    <div className={styles.catogory_container}>
      <Grid container spacing={2}>
        <Grid container spacing={2} justifyContent="space-between">
          <Typography variant="h5" className={styles.main_title}>
            Category
          </Typography>

          <Box>
            <Button
              variant="outlined"
              color="success"
              component="label"
              onClick={addNewBtn}
            >
              ADD NEW
              {/* <input hidden accept="image/*" multiple type="file" /> */}
            </Button>
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Card sx={{ p: 0 }}>
            <CardContent>
              <Grid xs={12}>
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
                  onNodeSelect={handleNodeSelect}
                >
                  {renderTree(categoryList)}
                </TreeView>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={8} className={styles.main_addCategory}>
          <Card sx={{ p: 1 }} className={styles.form_addCategory}>
            <CardContent>
              {selectedNodeId && showAddForm ? (
                <>
                  <div className={styles.add_title}> Add Sub Category</div>
                </>
              ) : selectedNodeId && !showAddForm ? (
                <>
                  <div className={styles.add_title}> Update Category</div>
                </>
              ) : (
                <>
                  <div className={styles.add_title}> Add Category</div>
                </>
              )}

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
                    <FormControl fullWidth variant="standard">
                      <InputLabel id="demo-simple-select-standard-label">
                        {name || `Parent Category`}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Parent Category"
                        // value={category}
                        // onChange={categoryHandler}
                        disabled={true}
                      >
                        <MenuItem value=""></MenuItem>
                        {/* {dropdownOptions &&
                          dropdownOptions.map((item, i) => {
                            return (
                              <MenuItem value={item.value}>
                                {item.name}
                              </MenuItem>
                            );
                          })} */}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel id="demo-simple-select-standard-label">
                        {name || `  Sub Category`}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Category"
                        // value={category}
                        // onChange={categoryHandler}
                        disabled={true}
                      >
                        <MenuItem value=""></MenuItem>
                        {/* {dropdownOptions &&
                          dropdownOptions.map((item, i) => {
                            return (
                              <MenuItem value={item.value}>
                                {item.name}
                              </MenuItem>
                            );
                          })} */}
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs={6}>
                    <TextField
                      id="outlined-name"
                      label="Slug"
                      type="text"
                      variant="standard"
                      // value={name}
                      // onChange={nameHandler}
                      fullWidth
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="outlined-name"
                      label="Description"
                      type="text"
                      variant="standard"
                      value={description}
                      onChange={descHandler}
                      multiline
                      rows={3}
                      disabled={selectedNodeId?.length > 0 ? true : false}
                    />
                    {descError ? (
                      <p style={{ color: "red" }}>
                        ** Please enter description
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Grid>

                  <Grid
                    container
                    justifyContent="space-around"
                    className={styles.addButton}
                  >
                    <Button
                      onClick={cancelToNewAdd}
                      variant="outlined"
                      color="secondary"
                    >
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
                      {/* {isLoading ? <CircularProgress size={12} /> : "Submit"} */}
                    </Button>
                  </Grid>
                </Grid>
                <ToastContainer />
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default Category;
