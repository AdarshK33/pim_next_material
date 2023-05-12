import React, { useState, useEffect } from "react";
import styles from "./activeProducts.module.css";
import Image from "next/image";
import edit from "../../../../assets/icons/edit.svg";
import {
  Grid,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  Checkbox,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  getAllProductListApi,
  getCatalogPublishApi,
} from "../../../../redux/actions/catalogServiceNew";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";

const ActiveProducts = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [showUserAddForm, setShowUserAddForm] = useState(false);

  const { catalogServiceNewReducer } = useSelector((state) => {
    return state;
  });
  const { publishProduct } = useSelector((state) => {
    return catalogServiceNewReducer;
  });
  console.log("publishProduct", publishProduct);
  const data = `["DTE00015", "ABP0002"]`;
  const recordPerPage = 5;
  const totalRecords = catalogServiceNewReducer?.getAllProducts?.totalElements;
  const pageRange = 5;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = catalogServiceNewReducer?.getAllProducts.content;
  const tableData = [];
  for (let i = 1; i <= 5; i++) {
    tableData.push({
      itemId: "DTE000" + i,
      itemName: "Dolo 650mg 1sheet",
      category: "PHARMA",
      productStatus: "Ready for publish/Active",
    });
  }

  useEffect(() => {
    dispatch(getAllProductListApi(0, 5, "ACTIVATED"));
  }, []);

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
    dispatch(getAllProductListApi(value - 1, 5, "ACTIVATED"));
  };

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <Card sx={{ p: 5 }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Typography variant="h7" className={styles.main_title}>
                Active Products
              </Typography>
              <CSVLink data={publishProduct} filename={"catalog.csv"}>
                <Button
                  variant="outlined"
                  color="success"
                  component="label"
                  onClick={() => dispatch(getCatalogPublishApi())}
                >
                  Publish
                </Button>
              </CSVLink>
            </Grid>
            <Box style={{ paddingTop: "20px" }}>
              <FormControl style={{ width: "30%" }}>
                <InputLabel id="demo-simple-select-label">
                  Select Channel
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Select Channel"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Shopify</MenuItem>
                  <MenuItem value={20}>Amazon</MenuItem>
                  <MenuItem value={30}>Myntra</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        {" "}
                        <Checkbox />
                      </TableCell>
                      <TableCell align="right">ITEM ID</TableCell>
                      <TableCell align="right">NAME</TableCell>
                      <TableCell align="right">CATEGORY</TableCell>
                      <TableCell align="right">STATUS</TableCell>
                      <TableCell align="right">DETAILS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentRecords &&
                    currentRecords !== null &&
                    currentRecords.length > 0 ? (
                      currentRecords.map((row, i) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell align="right">{row.itemId}</TableCell>
                          <TableCell align="right">{row.itemName}</TableCell>
                          <TableCell align="right">{row.category}</TableCell>
                          <TableCell align="right">
                            {row.productStatus}
                          </TableCell>
                          <div className="action_center">
                            <Image
                              className="px-2 "
                              src={edit}
                              alt="edit"
                              width={30}
                              height={25}
                              // onClick={()=>handleEdit(item.brandId)}
                              onClick={() => setShowUserUpdateForm(true)}
                            />
                          </div>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={12}>No Record Found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Stack spacing={2}>
                <div className={styles.category_pagination}>
                  <Pagination
                    count={Math.ceil(totalRecords / recordPerPage)}
                    page={currentPage}
                    showFirstButton
                    showLastButton
                    onChange={handlePaginationChange}
                  />
                </div>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ActiveProducts;
