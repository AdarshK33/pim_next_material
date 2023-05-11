import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Alert,
  Snackbar,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import styles from "./addCategory.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryApi } from "../../../redux/actions/catalogServiceNew";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function addCategory() {
  const dispatch = useDispatch();
  // get loader fron useSelector
  const { loading } = useSelector((state) => state.catalogServiceNewReducer);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [slug, setSlug] = useState("");
  // const [addCatData, setAddCatData] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("name", name, "description", description, "slug", slug);
    if (name === "") {
      //add alert from @mui
      toast.error("Please enter name");
    } else {
      let formData = {
        name: name,
        description: description,
        slug: slug,
        precedence: 0,
      };
      console.log("formData", formData);
      // setAddCatData(formData);
      dispatch(addCategoryApi(formData));
    }
  };
  useEffect(() => {
    if (loading === false) {
      setName("");
      setDescription("");
      setSlug("");
      setParentCategoryId("");
      setSubCategoryId("");
    }
  }, [loading]);

  return (
    <div className={styles.catogory_container}>
      <Card sx={{ p: 5 }}>
        <CardContent>
          <div className={styles.add_title}> Add Category</div>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              // width: "70%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Box style={{ width: "50%" }}>
                <InputLabel style={{ bottom: 5 }} htmlFor="name">
                  Name
                </InputLabel>
                <TextField
                  size="small"
                  style={{ width: "90%" }}
                  id="name"
                  variant="outlined"
                  sx={{ borderRadius: "300px" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Box>
              <Box style={{ width: "50%" }}>
                <InputLabel style={{ bottom: 5 }} htmlFor="description">
                  Description
                </InputLabel>
                <TextField
                  size="small"
                  style={{
                    width: "90%",
                    borderRadius: "20px",
                    display: "flex",
                  }}
                  id="description"
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  sx={{ borderRadius: 4, height: 40 }}
                />
                {/* <TextField
                size="small"
                style={{
                  width: "90%",
                  borderRadius: "20px",
                  display: "flex",
                }}
                id="description"
                variant="outlined"
              /> */}
              </Box>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box style={{ width: "50%" }}>
                <InputLabel style={{ bottom: 5 }} htmlFor="parentCategory">
                  Parent Category
                </InputLabel>
                <FormControl style={{ width: "90%" }} variant="outlined">
                  <Select
                    labelId="parent-category-label"
                    id="parent-category"
                    value={parentCategoryId}
                    sx={{
                      height: "40px",
                    }}
                    variant="outlined"
                    onChange={(e) => setParentCategoryId(e.target.value)}
                  >
                    <MenuItem value="category1">Category 1</MenuItem>
                    <MenuItem value="category2">Category 2</MenuItem>
                    <MenuItem value="category3">Category 3</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box style={{ width: "50%" }}>
                <InputLabel style={{ bottom: 5 }} htmlFor="subCategory">
                  Sub Category
                </InputLabel>
                <FormControl style={{ width: "90%" }} variant="outlined">
                  <Select
                    labelId="sub-category-label"
                    id="sub-category"
                    value={subCategoryId}
                    variant="outlined"
                    sx={{ height: "40px" }}
                    onChange={(e) => setSubCategoryId(e.target.value)}
                  >
                    <MenuItem value="subcategory1">Subcategory 1</MenuItem>
                    <MenuItem value="subcategory2">Subcategory 2</MenuItem>
                    <MenuItem value="subcategory3">Subcategory 3</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <Box style={{ width: "50%", borderRadius: "20px" }}>
              <InputLabel style={{ bottom: 5 }} htmlFor="slug">
                Slug
              </InputLabel>
              <TextField
                size="small"
                style={{ width: "90%" }}
                id="slug"
                variant="outlined"
                sx={{ borderRadius: "300px" }}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </Box>

            <Button
              style={{ width: "30%", marginTop: "10px", borderRadius: "20px" }}
              variant="contained"
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Box>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
}
