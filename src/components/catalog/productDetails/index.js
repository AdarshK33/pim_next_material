import React, { useState } from "react";
import styles from "./productDetails.module.css";
import edit from "../../../../assets/icons/edit.svg";
import Image from "next/image";
import {
  Grid,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  Checkbox,
  Container,
  LinearProgress,
  TextField,
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
import CustomModal from '../../../common/customModal';
import AddForm from './AddForm';

const ProductDetails = () => {
    const [showModal, setShowModal] = useState(false);
    
  const tableData = [];

  for (let i = 1; i <= 5; i++) {
    tableData.push({
      id: "DTE000" + i,
      name: "Dolo 650mg",
      category: "PHARMA",
      formation: `${i}0%`,
      status: "Draft",
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

  function handleEdit() {
    router.push(`/productDetails`);
  }


  return (
    <>
      <Grid container>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <Card sx={{ p: 5 }}>
            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              style={{ borderBottom: "3px solid #aaa", padding: "5px" }}
            >
              <Typography variant="h7" className={styles.main_title}>
                Product Details
              </Typography>
              <Button
                variant="outlined"
                color="success"
                component="label"
                onClick={() => setShowUserAddForm(true)}
              >
                Activate
                {/* <input hidden accept="image/*" multiple type="file" /> */}
              </Button>
              {/* <CustomModal
                openModal={showUserAddForm}
                closeModal={() => setShowUserAddForm(false)}
                body={<AddForm classModal={() => setShowUserAddForm(false)} />}
              /> */}
            </Grid>
            <Card>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                style={{ borderBottom: "2px solid #bbb", padding: "5px" }}
              >
                <Typography variant="h7" className={styles.sub_title}>
                  AX-MASTER
                </Typography>
                <Typography
                  variant="h7"
                  style={{ color: "orange", borderBottom: "2px solid #ffcf76" }}
                  onClick={() => setShowModal(true)}
                >
                  Revalidate
                </Typography>
                <CustomModal
                openModal={showModal}
                closeModal={() => setShowModal(false)}
                body={<AddForm classModal={() => setShowModal(false)} />}
              />
              </Grid>
              <CardContent>
                <Grid container spacing={3} style={{ marginTop: "15px" }}>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item ID"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item Name"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item Category ID"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item Category Name"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: "15px" }}>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Logistics"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Disease Type"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Puch UOM Factor"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Unit Of Measurement"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card>
              <Grid
                container
                spacing={0}
                justifyContent="space-between"
                alignItems="center"
                style={{ borderBottom: "2px solid #bbb", padding: "5px" }}
              >
                <Typography variant="h7" className={styles.sub_title}>
                  KEYMED MASTER
                </Typography>
                <Typography
                  variant="h7"
                  style={{ color: "orange", borderBottom: "2px solid #ffcf76" }}
                >
                  Revalidate
                </Typography>
              </Grid>
              <CardContent>
                <Grid container spacing={3} style={{ marginTop: "15px" }}>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item ID"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item Name"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item Category ID"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item Category Name"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: "15px" }}>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Logistics"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Disease Type"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Puch UOM Factor"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Unit Of Measurement"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card>
              <Grid
                container
                spacing={0}
                justifyContent="space-between"
                alignItems="center"
                style={{ borderBottom: "2px solid #bbb", padding: "5px" }}
              >
                <Typography variant="h7" className={styles.sub_title}>
                  R_DURGS MASTER
                </Typography>
                <Typography
                  variant="h7"
                  style={{ color: "orange", borderBottom: "2px solid #ffcf76" }}
                >
                  Revalidate
                </Typography>
              </Grid>
              <CardContent>
                <Grid container spacing={3} style={{ marginTop: "15px" }}>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item ID"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item Name"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item Category ID"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item Category Name"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: "15px" }}>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Logistics"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Disease Type"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Puch UOM Factor"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Unit Of Measurement"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductDetails;
