import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
} from "@mui/material";
import styles from "./addCategory.module.css";
import { useDispatch, useSelector } from "react-redux";

export default function addCategory() {
  const [parentCategory, setParentCategory] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission
  };

  return (
    <div className={styles.catogory_container}>
      <div className={styles.add_title}> Add Category</div>
      <form>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            // width: "70%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Box style={{ width: "50%" }}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <TextField
                size="small"
                style={{ width: "90%" }}
                id="name"
                variant="outlined"
                sx={{ borderRadius: "300px" }}
              />
            </Box>
            <Box style={{ width: "50%" }}>
              <InputLabel htmlFor="description">Description</InputLabel>
              <TextField
                size="small"
                style={{
                  width: "90%",
                  borderRadius: "20px",
                  display: "flex",
                }}
                id="description"
                variant="outlined"
              />
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
              <InputLabel htmlFor="parentCategory">Parent Category</InputLabel>
              <FormControl style={{ width: "90%" }} variant="outlined">
                <Select
                  size="small"
                  id="parentCategory"
                  value={parentCategory}
                  onChange={(event) => setParentCategory(event.target.value)}
                >
                  <MenuItem value="category1">Category 1</MenuItem>
                  <MenuItem value="category2">Category 2</MenuItem>
                  <MenuItem value="category3">Category 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box style={{ width: "50%" }}>
              <InputLabel htmlFor="subCategory">Sub Category</InputLabel>
              <FormControl style={{ width: "90%" }} variant="outlined">
                <Select
                  size="small"
                  id="subCategory"
                  value={subCategory}
                  onChange={(event) => setSubCategory(event.target.value)}
                >
                  <MenuItem value="subcategory1">Subcategory 1</MenuItem>
                  <MenuItem value="subcategory2">Subcategory 2</MenuItem>
                  <MenuItem value="subcategory3">Subcategory 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <Box style={{ width: "50%", borderRadius: "20px" }}>
            <InputLabel htmlFor="slug">Slug</InputLabel>
            <Stack spacing={3}>
              <TextField
                size="small"
                style={{ width: "90%", borderRadius: "20px" }}
                id="slug"
                variant="outlined"
              />
            </Stack>
          </Box>

          <Button
            style={{ width: "30%", marginTop: "10px", borderRadius: "20px" }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
}
