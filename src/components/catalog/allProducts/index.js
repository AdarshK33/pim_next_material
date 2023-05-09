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
import { Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";
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
import { useRouter } from "next/router";
import {
  getAllProductListApi,
  productDetailsApi,
} from "../../../../redux/actions/catalogServiceNew";
import { useDispatch, useSelector } from "react-redux";

const AllProducts = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllProductListApi(0, 5, "DRAFTED"));
  // }, []);

  const { catalogServiceNewReducer } = useSelector((state) => {
    return state;
  });
  console.log(
    "catalogServiceNewReducer",
    catalogServiceNewReducer?.getAllProducts
  );
  const tableData = [];
  for (let i = 1; i <= 5; i++) {
    tableData.push({
      itemId: "DTE000" + i,
      itemName: "Dolo 650mg",
      category: "PHARMA",
      formation: "20%",
      productStatus: "Draft",
    });
  }
  //   /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);

  const recordPerPage = 5;
  const totalRecords = tableData.length;
  const pageRange = 5;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = catalogServiceNewReducer?.getAllProducts;

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
  };

  /*-----------------Pagination------------------*/

  const [value, setValue] = useState(0);
  const [progress, setProgress] = React.useState(0);

  const handleNext = () => {
    setValue((prevValue) => prevValue + 1);
  };
  console.log("hello adarsh", value);

  useEffect(() => {
    if (value === 0) {
      dispatch(getAllProductListApi(0, 5, "DRAFTED"));
    } else if (value === 1) {
      dispatch(getAllProductListApi(0, 5, "READY_FOR_REVIEW"));
    } else if (value === 2) {
      dispatch(getAllProductListApi(0, 5, "REVALIDATE"));
    }
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNextClick = () => {
    if (value < 2) {
      // assuming you have 3 tabs in total
      setValue(value + 1);
      // alert(`Moving to ${tabLabels[value + 1]} tab`);
    }
  };

  const tabLabels = ["Draft", "Ready for review", "Revalidate"];

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <div>{children}</div>}
      </div>
    );
  }

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress
            variant="determinate"
            {...props}
            style={{ padding: "6px" }}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
  };

  function handleEdit(PimCodeId) {
    router.push(`/productDetails`);
    dispatch(productDetailsApi(PimCodeId));
  }
  function handleBulk() {
    router.push(`/bulkUpload`);
  }

  const handlePanelClick = () => {
    console.log("Panel clicked");
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) =>
  //       prevProgress >= 100 ? 10 : prevProgress + 10
  //     );
  //   }, 800);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  return (
    <>
      <Grid container>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <Card sx={{ p: 5 }}>
            <Grid container={2} justifyContent="space-between">
              <Typography variant="h2" className={styles.main_title}>
                Products
              </Typography>
              <Button
                variant="outlined"
                color="success"
                component="label"
                onClick={() => handleBulk()}
              >
                Upload Products
                {/* <input hidden accept="image/*" multiple type="file" /> */}
              </Button>
            </Grid>
            <CardContent>
              {/* <TableContainer component={Paper}>
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
              </TableContainer> */}
              {/* <Stack spacing={2}>
                <div className={styles.products_pagination}>
                  <Pagination
                    count={10}
                    page={currentPage}
                    onChange={handlePaginationChange}
                  />
                </div>
              </Stack> */}
              <Box sx={{ maxWidth: 1200 }}>
                {/* <Container maxWidth="xl"> */}
                <Tabs value={value} onChange={handleChange}>
                  <Tab label={tabLabels[0]} className={styles.tab} />
                  <Tab label={tabLabels[1]} className={styles.tab} />
                  <Tab label={tabLabels[2]} className={styles.tab} />
                </Tabs>
                {/* </Container> */}
              </Box>
              <TabPanel value={value} index={0} onNext={handleNext}>
                <Table style={{ margin: "10px 0" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>ITEM ID</TableCell>
                      <TableCell>NAME</TableCell>
                      <TableCell>CATEGORY</TableCell>
                      <TableCell>FORMATION</TableCell>
                      <TableCell>STATUS</TableCell>
                      {/* <TableCell>DETAILS</TableCell> */}
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
                          <TableCell component="th" scope="row">
                            {row.itemId}
                          </TableCell>
                          <TableCell>{row.itemName}</TableCell>
                          <TableCell>{row.category}</TableCell>
                          <TableCell>
                            {" "}
                            <LinearProgressWithLabel value={row.formation} />
                          </TableCell>
                          <TableCell>{row.productStatus}</TableCell>
                          <div className="action_center">
                            <Image
                              className="px-2"
                              src={edit}
                              alt="edit"
                              width={30}
                              height={25}
                              onClick={() => handleEdit(row.itemId)}
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
                {/* <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextClick}
                >
                  READY FOR REVIEW
                </Button> */}
                <div className={styles.category_pagination}>
                  <Pagination
                    count={Math.ceil(totalRecords / recordPerPage)}
                    page={currentPage}
                    showFirstButton
                    showLastButton
                    onChange={handlePaginationChange}
                  />
                </div>
              </TabPanel>
              <TabPanel
                value={value}
                index={1}
                onNext={handleNext}
                onClick={handlePanelClick}
              >
                <Table style={{ margin: "10px 0" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>ITEM ID</TableCell>
                      <TableCell>NAME</TableCell>
                      <TableCell>CATEGORY</TableCell>
                      <TableCell>FORMATION</TableCell>
                      <TableCell>STATUS</TableCell>
                      <TableCell>DETAILS</TableCell>
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
                          <TableCell component="th" scope="row">
                            {row.itemId}
                          </TableCell>
                          <TableCell>{row.itemName}</TableCell>
                          <TableCell>{row.category}</TableCell>
                          <TableCell>
                            {" "}
                            <LinearProgressWithLabel value={row.formation} />
                          </TableCell>
                          <TableCell style={{ color: "#f4c476" }}>
                            {row.productStatus}
                          </TableCell>
                          <div className="action_center">
                            <Image
                              className="px-2"
                              src={edit}
                              alt="edit"
                              width={30}
                              height={25}
                              onClick={() => handleEdit(row.itemId)}
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
                {/* <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextClick}
                >
                  REVALIDATE
                </Button> */}
                <div className={styles.category_pagination}>
                  <Pagination
                    count={Math.ceil(totalRecords / recordPerPage)}
                    page={currentPage}
                    showFirstButton
                    showLastButton
                    onChange={handlePaginationChange}
                  />
                </div>
              </TabPanel>
              <TabPanel value={value} index={2} onNext={handleNext}>
                <Table style={{ margin: "10px 0" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>ITEM ID</TableCell>
                      <TableCell>NAME</TableCell>
                      <TableCell>CATEGORY</TableCell>
                      {/* <TableCell>FORMATION</TableCell> */}
                      <TableCell>STATUS</TableCell>
                      <TableCell>DETAILS</TableCell>
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
                          <TableCell component="th" scope="row">
                            {row.itemId}
                          </TableCell>
                          <TableCell>{row.itemName}</TableCell>
                          <TableCell>{row.category}</TableCell>
                          {/* <TableCell>
                            {" "}
                            {/* <LinearProgressWithLabel value={row.formation} /> */}

                          <TableCell style={{ color: "red" }}>
                            {row.productStatus}
                          </TableCell>
                          <div className="action_center">
                            <Image
                              className="px-2"
                              src={edit}
                              alt="edit"
                              width={30}
                              height={25}
                              onClick={() => handleEdit(row.itemId)}
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
                {/* <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextClick}
                >
                  READY FOR PUBLISH
                </Button> */}
                <div className={styles.category_pagination}>
                  <Pagination
                    count={Math.ceil(totalRecords / recordPerPage)}
                    page={currentPage}
                    showFirstButton
                    showLastButton
                    onChange={handlePaginationChange}
                  />
                </div>
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AllProducts;
