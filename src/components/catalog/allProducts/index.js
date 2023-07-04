import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import Autocomplete from "@mui/material/Autocomplete";
// import edit from "../../../../assets/icons/edit.svg";
// import edit from "../../../../assets/icons/big-search-lens.svg";

import lens from "../../../../assets/icons/lens.svg";
import { Edit2, Eye, Search, Download } from "react-feather";

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
  TextField,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
import Pagination from "react-js-pagination";

import { useRouter } from "next/router";
import {
  getAllProductListApi,
  productDetailsApi,
  productSearchApis,
} from "../../../../redux/actions/catalogServiceNew";
import { useDispatch, useSelector } from "react-redux";

const AllProducts = (props) => {
  const { user: { role = "" } = {}, loggedIn } = props.user;

  const router = useRouter();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState(0);
  const [progress, setProgress] = React.useState(0);
  const [searchKeyValue, setSearchKeyValue] = useState("");
  const [searchAllObject, setSearchAllObject] = useState("");
  const [countState, setCountState] = useState("");


  const isFirstRender = useRef(true);
  const isElseBlockExecuted = useRef(false);
  // console.log("hello countState", countState);

  const { catalogServiceNewReducer } = useSelector((state) => {
    return state;
  });
  // console.log(
  //   "catalogServiceNewReducer?.getAllProducts?.content?",
  //   catalogServiceNewReducer?.getAllProducts?.content
  // );
  // console.log(
  //   "catalogServiceNewReducer?.productSearch?.content?",
  //   catalogServiceNewReducer?.productSearch?.content
  // );
  // const tableData = [];
  // for (let i = 1; i <= 5; i++) {
  //   tableData.push({
  //     itemId: "DTE000" + i,
  //     itemName: "Dolo 650mg",
  //     category: "PHARMA",
  //     formation: "20%",
  //     productStatus: "Draft",
  //   });
  // }
  //   /*-----------------Pagination------------------*/

  const recordPerPage = 10;
  const totalRecords = catalogServiceNewReducer?.getAllProducts.totalElements ?? 0;
  // console.log(catalogServiceNewReducer?.getAllProducts?.totalElements, "catalogServiceNewReducer totalElements")
  const pageRange = 10;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = catalogServiceNewReducer?.getAllProducts?.content;

  const handlePaginationChange = (val) => {
    setCurrentPage(val);

    if (value === 0) {
      dispatch(getAllProductListApi(val - 1, 10, "DRAFT"));
    } else if (value === 1) {
      dispatch(getAllProductListApi(val - 1, 10, "READY_FOR_REVIEW"));
    } else if (value === 2) {
      dispatch(getAllProductListApi(val - 1, 10, "REVALIDATE"));
    }
  };

  /*-----------------Pagination------------------*/

  const handleNext = () => {
    setValue((prevValue) => prevValue + 1);
  };

  // useEffect(() => {

  //   if (searchKeyValue) {
  //     console.log("hello 1 searchKeyValue", searchKeyValue)
  //     if (value === 0) {
  //       console.log("hello 2  value === 0")
  //       //default call
  //       setCountState("DRAFT");
  //       // dispatch(getAllProductListApi(0, 10, "DRAFT"));
  //       dispatch(productSearchApis("DRAFT", searchKeyValue));
  //     } else if (value === 1) {
  //       setCountState("READY_FOR_REVIEW");
  //       // dispatch(getAllProductListApi(0, 10, "READY_FOR_REVIEW"));
  //       dispatch(productSearchApis("READY_FOR_REVIEW", searchKeyValue));
  //     } else if (value === 2) {
  //       setCountState("REVALIDATE");
  //       // dispatch(getAllProductListApi(0, 10, "REVALIDATE"));
  //       dispatch(productSearchApis("REVALIDATE", searchKeyValue));
  //     }
  //   }
  //   else {
  //     console.log("hello 3 else", searchKeyValue)

  //     setSearchKeyValue();
  //     console.log("hello 4 else searchKeyValue null", searchKeyValue)

  //     if (value === 0) {
  //       //default call
  //       console.log("hello 5 else Value 0 ", searchKeyValue)

  //       //setCountState("DRAFT");
  //       dispatch(getAllProductListApi(0, 10, "DRAFT"));
  //       dispatch(productSearchApis("DRAFT", searchKeyValue));
  //     } else if (value === 1) {
  //       //setCountState("READY_FOR_REVIEW");
  //       dispatch(getAllProductListApi(0, 10, "READY_FOR_REVIEW"));
  //       dispatch(productSearchApis("READY_FOR_REVIEW", searchKeyValue));
  //     } else if (value === 2) {
  //       //setCountState("REVALIDATE");
  //       dispatch(getAllProductListApi(0, 10, "REVALIDATE"));
  //       dispatch(productSearchApis("REVALIDATE", searchKeyValue));
  //     }
  //   }
  // }, [value, searchKeyValue]);



  useEffect(() => {
    if (searchKeyValue) {
      console.log("hello 1 searchKeyValue", searchKeyValue)
      if (value === 0) {
        console.log("hello 2  value === 0")
        setCountState("DRAFT");
        dispatch(productSearchApis("DRAFT", searchKeyValue));
      } else if (value === 1) {
        setCountState("READY_FOR_REVIEW");
        dispatch(productSearchApis("READY_FOR_REVIEW", searchKeyValue));
      } else if (value === 2) {
        setCountState("REVALIDATE");
        dispatch(productSearchApis("REVALIDATE", searchKeyValue));
      }
    } else {
      console.log("hello 3 else", searchKeyValue)
      if (searchKeyValue) {
        setSearchKeyValue()
      }
      if (value === 0) {
        setCountState("DRAFT");
        console.log("hello 5 else Value 0 ", searchKeyValue)
        dispatch(getAllProductListApi(0, 10, "DRAFT"));
        dispatch(productSearchApis("DRAFT", searchKeyValue));
      } else if (value === 1) {
        setCountState("READY_FOR_REVIEW");
        dispatch(getAllProductListApi(0, 10, "READY_FOR_REVIEW"));
        dispatch(productSearchApis("READY_FOR_REVIEW", searchKeyValue));
      } else if (value === 2) {
        setCountState("REVALIDATE");
        dispatch(getAllProductListApi(0, 10, "REVALIDATE"));
        dispatch(productSearchApis("REVALIDATE", searchKeyValue));
      }
    }
  }, [value, searchKeyValue]);

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
    if (value === 2) {
      router.push({
        pathname: "/productDetails",
        query: { PimCodeId: PimCodeId, tab: "Revalidate" },
      });
    }
    if (value === 1) {
      router.push({
        pathname: "/productDetails",
        query: { PimCodeId: PimCodeId, tab: "Ready-for-review" },
      });
    }
    if (value === 0) {
      router.push({
        pathname: "/productDetails",
        query: { PimCodeId: PimCodeId, tab: "Draft" },
      });
    }
    dispatch(productDetailsApi(PimCodeId));
  }
  function handleBulk() {
    router.push(`/bulkUpload`);
  }

  const handlePanelClick = () => {
    console.log("Panel clicked");
  };

  const searchHandler = (e, value) => {
    // console.log(value?.itemId, "hello e.target.value");
    setSearchKeyValue(value?.itemId);
  };

  // const searchHandler = (e, searchKey) => {
  //   setSearchKeyValue(searchKey);
  //   if (value === 0) {
  //     dispatch(productSearchApis("DRAFT", searchKey));
  //   } else if (value === 1) {
  //     dispatch(productSearchApis("READY_FOR_REVIEW", searchKey));
  //   } else if (value === 2) {
  //     dispatch(productSearchApis("REVALIDATE", searchKey));
  //   }
  // };

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
              <Box className={styles.product_Bar}>
                <Box>
                  <Button
                    variant="outlined"
                    color="success"
                    component="label"
                    onClick={() => handleBulk()}
                  >
                    Upload Products
                  </Button>
                </Box>
              </Box>
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

              {/* <Box sx={{ maxWidth: 250 }}>
                {catalogServiceNewReducer?.getAllProducts !== null &&
                  catalogServiceNewReducer?.getAllProducts !== undefined &&
                  (catalogServiceNewReducer?.getAllProducts).length !== 0 && (
                    <Autocomplete
                      freeSolo
                      id="free-solo-demo"
                      options={
                        catalogServiceNewReducer?.productSearch?.content || ""
                      }
                      getOptionLabel={(option) =>
                        `${option.itemId ?? ""} /${option.itemName ?? ""}`
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Id/Name.."
                          className={styles.input_search_product}
                          disable={true}
                        />
                      )}
                      onChange={(event, value) => {
                        // Handle the onChange event here
                        searchHandler(event, value); // Log the selected value to the console
                      }}
                      filterOptions={(options, params) => {
                        const inputValue = params.inputValue.toLowerCase();
                        const minimumLength = 3;

                        if (inputValue.length < minimumLength) {
                          return []; // Return an empty array when inputValue length is less than the minimum length
                        }

                        const filteredOptions = options.filter((option) => {
                          const optionTitle =
                            (option.itemId ?? "") +
                            " /" +
                            (option.itemName ?? "");
                          return optionTitle.toLowerCase().includes(inputValue);
                        });

                        return filteredOptions;
                      }}
                    />
                  )}
              </Box> */}

              <Box sx={{ maxWidth: 1200 }}>
                {/* <Container maxWidth="xl"> */}

                <Tabs value={value} onChange={handleChange}>
                  <Tab
                    label={`${tabLabels[0]}  ${countState === "DRAFT"
                      ? `(${totalRecords})`
                      : ""
                      }`}
                    className={styles.tab}
                  />
                  {/* {role === "ADMIN" && ( */}
                  <Tab
                    label={`${tabLabels[1]} ${countState === "READY_FOR_REVIEW"
                      ? `(${totalRecords})`
                      : ""
                      }`}
                    className={styles.tab}
                  />
                  {/* )} */}

                  <Tab
                    label={`${tabLabels[2]} ${countState === "REVALIDATE"
                      ? `(${totalRecords})`
                      : ""
                      }`}
                    className={styles.tab}
                  />
                </Tabs>
                {/* </Container> */}
              </Box>

              <>
                <TabPanel value={value} index={0} onNext={handleNext}>
                  <Table style={{ margin: "10px 0" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="start">ITEM ID</TableCell>
                        <TableCell align="start">NAME</TableCell>
                        <TableCell align="start">CATEGORY</TableCell>
                        <TableCell>FORMATION</TableCell>
                        <TableCell align="right">STATUS</TableCell>
                        <TableCell align="center">DETAILS</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {catalogServiceNewReducer?.loading == true &&
                        currentRecords !== null &&
                        currentRecords !== undefined ? (
                        <TableBody>
                          <TableRow
                            key="row"
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <Grid
                              container
                              style={{
                                position: "relative",
                                left: "390px",
                              }}
                            >
                              <Grid
                                item
                                md={12}
                                style={{ width: "100% !important" }}
                              >
                                <Box className="loader">
                                  <Box className="circle"></Box>
                                  <Box className="circle"></Box>
                                  <Box className="circle"></Box>
                                </Box>
                              </Grid>
                            </Grid>
                          </TableRow>
                        </TableBody>
                      ) : currentRecords &&
                        currentRecords !== null &&
                        currentRecords.length > 0 ? (
                        currentRecords.map((row, i) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row" align="start">
                              {row.itemId}
                            </TableCell>
                            <TableCell align="start">{row.itemName}</TableCell>
                            <TableCell align="start">{row.category}</TableCell>
                            <TableCell>
                              {" "}
                              <LinearProgressWithLabel value={row.formation} />
                            </TableCell>
                            <TableCell align="right">
                              {row.productStatus}
                            </TableCell>
                            <div className="action_center product_Detials_Actions">
                              {/* <Image
                              className="px-2"
                              src={lens}
                              alt="lens"
                              width={20}
                              height={20}
                              onClick={() => handleEdit(row.itemId)}
                            /> */}
                              <Eye
                                style={{
                                  textAlign: "center",
                                  fontSize: "xx-small",
                                  color: "#419794",
                                }}
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
                      itemClass="page-item"
                      linkClass="page-link"
                      activePage={currentPage}
                      itemsCountPerPage={recordPerPage}
                      totalItemsCount={totalRecords}
                      pageRangeDisplayed={pageRange}
                      firstPageText="First"
                      lastPageText="Last"
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
                        <TableCell align="center">DETAILS</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {catalogServiceNewReducer?.loading == true &&
                        currentRecords !== null &&
                        currentRecords !== undefined ? (
                        <TableBody>
                          <TableRow
                            key="row"
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <Grid
                              container
                              style={{
                                position: "relative",
                                left: "390px",
                              }}
                            >
                              <Grid
                                item
                                md={12}
                                style={{ width: "100% !important" }}
                              >
                                <Box className="loader">
                                  <Box className="circle"></Box>
                                  <Box className="circle"></Box>
                                  <Box className="circle"></Box>
                                </Box>
                              </Grid>
                            </Grid>
                          </TableRow>
                        </TableBody>
                      ) : currentRecords &&
                        currentRecords !== null &&
                        currentRecords.length > 0 ? (
                        currentRecords.map((row, i) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
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
                            <div className="action_center product_Detials_Actions">
                              {/* <Image
                              className="px-2"
                              src={lens}
                              alt="lens"
                              width={20}
                              height={20}
                              onClick={() => handleEdit(row.itemId)}
                            /> */}
                              <Eye
                                style={{
                                  textAlign: "right",
                                  fontSize: "xx-small",
                                  color: "#419794",
                                }}
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
                      itemClass="page-item"
                      linkClass="page-link"
                      activePage={currentPage}
                      itemsCountPerPage={recordPerPage}
                      totalItemsCount={totalRecords}
                      pageRangeDisplayed={pageRange}
                      firstPageText="First"
                      lastPageText="Last"
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
                        <TableCell align="center">STATUS</TableCell>
                        <TableCell align="center">DETAILS</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {catalogServiceNewReducer?.loading == true &&
                        currentRecords !== null &&
                        currentRecords !== undefined ? (
                        <TableBody>
                          <TableRow
                            key="row"
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <Grid
                              container
                              style={{
                                position: "relative",
                                left: "390px",
                              }}
                            >
                              <Grid
                                item
                                md={12}
                                style={{ width: "100% !important" }}
                              >
                                <Box className="loader">
                                  <Box className="circle"></Box>
                                  <Box className="circle"></Box>
                                  <Box className="circle"></Box>
                                </Box>
                              </Grid>
                            </Grid>
                          </TableRow>
                        </TableBody>
                      ) : currentRecords &&
                        currentRecords !== null &&
                        currentRecords.length > 0 ? (
                        currentRecords.map((row, i) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
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

                            <TableCell style={{ color: "red" }} align="center">
                              {row.productStatus}
                            </TableCell>
                            <div className="action_center product_Detials_Actions">
                              {/* <Image
                              className="px-2"
                              src={lens}
                              alt="lens"
                              width={20}
                              height={20}
                              onClick={() => handleEdit(row.itemId)}
                            /> */}
                              <Eye
                                style={{
                                  textAlign: "right",
                                  fontSize: "xx-small",
                                  color: "#419794",
                                }}
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
                      itemClass="page-item"
                      linkClass="page-link"
                      activePage={currentPage}
                      itemsCountPerPage={recordPerPage}
                      totalItemsCount={totalRecords}
                      pageRangeDisplayed={pageRange}
                      firstPageText="First"
                      lastPageText="Last"
                      onChange={handlePaginationChange}
                    />
                  </div>
                </TabPanel>
              </>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(AllProducts);

