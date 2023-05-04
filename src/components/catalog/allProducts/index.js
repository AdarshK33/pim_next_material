import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

import edit from "../../../../assets/icons/edit.svg";

import Image from "next/image";

import styles from "./allProducts.module.css";

import {
  Grid,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
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

const AllProducts = () => {
  const tableData = [];

  for (let i = 1; i <= 5; i++) {
    tableData.push({
      id: "11100" + i,
      sku: "Sku" + i,
      name: "Name" + i,
      brand: "Brand" + i,
      channels: "Channels" + i,
      category: "Category" + i,
    });
  }
  //   /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);

  const recordPerPage = 5;
  const totalRecords = tableData.length;
  const pageRange = 5;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = tableData;

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
  };

  /*-----------------Pagination------------------*/

  return (
    <>
      <Grid container>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          {/* <Grid item md={4}>
              <button
                onClick={() => setShowBrandCreationForm(true)}
                className={`btn btn-sm ${styles.add_button_text}`}
              >
            + Add New
              </button>
            </Grid> */}
          <Card sx={{ p: 5 }}>
            <Grid spacing={2} justifyContent="space-between">
              <Typography variant="h2" className={styles.main_title}>
                Products
              </Typography>
              <Button variant="outlined" color="success" component="label">
                Upload Products
                <input hidden accept="image/*" multiple type="file" />
              </Button>
            </Grid>
            <CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>

                      <TableCell>ID</TableCell>

                      <TableCell>SKU</TableCell>
                      <TableCell align="right">PRODUCT NAME</TableCell>
                      <TableCell align="right">BRAND</TableCell>
                      <TableCell align="right">CHANNELS</TableCell>
                      <TableCell align="right">CATEGORY</TableCell>
                      <TableCell align="right">ACTION</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((row, i) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {i + 1 + indexOfFirstRecord}
                        </TableCell>
                        <TableCell align="right">{row.id}</TableCell>

                        <TableCell align="right">{row.sku}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.brand}</TableCell>
                        <TableCell align="right">{row.channels}</TableCell>
                        <TableCell align="right">{row.category}</TableCell>
                        <div className="action_center">
                          <Image
                            className="px-2 "
                            src={edit}
                            alt="edit"
                            width={35}
                            height={30}
                            // onClick={()=>handleEdit(item.brandId)}
                          />
                        </div>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Stack spacing={2}>
                <div className={styles.products_pagination}>
                  <Pagination
                    count={10}
                    page={currentPage}
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

export default AllProducts;
