import React, { useState, useEffect } from "react";
import styles from "./activeProducts.module.css";
import Image from "next/image";
import { Edit2, Eye, Search, Download } from "react-feather";
import ProductStatusForm from "./ProductStatusForm";
import CustomModal from "../../../common/customModal";
import dynamic from 'next/dynamic'
// const CustomModal = dynamic(() => import('../../../common/customModal'))
// const ProductStatusForm = dynamic(() => import('./productStatusForm'))

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
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
import Pagination from "react-js-pagination";

import {
  getAllProductListApi,
  getCatalogPublishApi,
} from "../../../../redux/actions/catalogServiceNew";

import {
  getChannelListApi,
  channelAttributeApiList,
} from "../../../../redux/actions/channel";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import { productDetailsApi } from "../../../../redux/actions/catalogServiceNew";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActiveProducts = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const [showRevalidateAddForm, setShowRevalidateAddForm] = useState(false);
  const [formationData, setFormation] = useState();
  const [pimModelCode, setPimCodetId] = useState();
  const [statusAPICalled, setSatusAPICalled] = useState(false);





  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  // console.log("selectedItemIds", selectedItemIds);

  const [viewDoc, setViewDoc] = useState();
  const [channel, setChannel] = useState("");

  const { catalogServiceNewReducer, channelReducer, loginReducer } = useSelector((state) => {
    return state;
  });
  const { publishProduct } = useSelector((state) => {
    return catalogServiceNewReducer;
  });
  // console.log("channel", channel);
  console.log("publishProduct", publishProduct);


  const channelOptions = channelReducer?.channelGet?.content?.map((item) => ({
    value: item.channelId,
    name: item.channelName,
  }));
  const recordPerPage = 10;
  const totalRecords = catalogServiceNewReducer?.getAllProducts?.totalElements;
  const pageRange = 10;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = catalogServiceNewReducer?.getAllProducts.content;
  // const tableData = [];
  // for (let i = 1; i <= 5; i++) {
  //   tableData.push({
  //     itemId: "DTE000" + i,
  //     itemName: "Dolo 650mg 1sheet",
  //     category: "PHARMA",
  //     productStatus: "Ready for publish/Active",
  //   });
  // }

  useEffect(() => {
    dispatch(getAllProductListApi(0, 10, "ACTIVATED"));
    dispatch(getChannelListApi(0, 1000));
  }, []);


  useEffect(() => {
    if (statusAPICalled) {
      dispatch(getAllProductListApi(0, 10, "ACTIVATED"));
      dispatch(getChannelListApi(0, 1000));
    }
  }, [statusAPICalled]);



  const handlePaginationChange = (value) => {
    setCurrentPage(value);
    dispatch(getAllProductListApi(value - 1, 5, "ACTIVATED"));
  };

  const handleChannel = (event) => {
    setChannel(event.target.value);
  };

  function handleEdit(PimCodeId, ProductName) {
    router.push({
      pathname: "/productView",
      query: { PimCodeId: PimCodeId, ActiveProduct: ProductName },
    });

    // dispatch(productDetailsApi(PimCodeId));// call one time on landing on product view page
  }
  const download = function (data) {
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "Export.csv");
    a.click();
  };

  const csvmaker = function (data) {
    let csvRows = [];
    // const headers = Object.keys(data);
    // csvRows.push(headers.join(","));
    const values = Object.values(data).join("");
    csvRows.push(values);
    return csvRows.join("\n");
  };
  const downloadJsonFile = (data, filename) => {
    const json = JSON.stringify(data);
    const dataUri = `data:text/json;charset=utf-8,${encodeURIComponent(json)}`;

    const link = document.createElement("a");
    link.href = dataUri;
    link.download = filename;

    // Simulate a click event to trigger the download
    link.click();

    // Clean up the temporary link
    link.remove();
  };

  useEffect(() => {
    console.log("publishProduct", publishProduct);
    if (
      publishProduct &&
      publishProduct !== null &&
      publishProduct !== undefined &&
      Object.keys(publishProduct).length &&
      viewDoc == "CSV"
    ) {
      const csvdata = csvmaker(publishProduct);

      download(csvdata);
      // console.log("publishProduct", publishProduct);
      setViewDoc("");
    }
    if (
      publishProduct &&
      publishProduct !== null &&
      publishProduct !== undefined &&
      Object.keys(publishProduct).length &&
      viewDoc == "JSON"
    ) {
      downloadJsonFile(publishProduct, "Export.json");
      setViewDoc("");
    }
  }, [publishProduct]);
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <Card sx={{ p: 5 }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Typography variant="h7" className={styles.main_title}>
                Active Products
              </Typography>
              <Box spacing={2} justifyContent="space-between">
                {selectedItemIds.length > 0 && channel ? (
                  <Button
                    variant="outlined"
                    color="success"
                    component="label"
                    className={styles.activeProductJson_btn}
                    onClick={() => {
                      setViewDoc("JSON");
                      dispatch(
                        getCatalogPublishApi("JSON", selectedItemIds, channel)
                      );
                    }}
                    disabled={
                      selectedItemIds.length === 0 && channel.length === 0
                    }
                  >
                    Export JSON
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="success"
                    component="label"
                    className={styles.activeProductJson_btn}
                    // onClick={() =>
                    //   dispatch(getCatalogPublishApi(selectedItemIds, channel))
                    // }
                    disabled={
                      selectedItemIds.length === 0 || channel.length == 0
                    }
                  >
                    Export JSON
                  </Button>
                )}

                {selectedItemIds.length > 0 && channel ? (
                  <Button
                    variant="outlined"
                    color="success"
                    component="label"
                    onClick={() => {
                      setViewDoc("CSV");
                      dispatch(
                        getCatalogPublishApi("CSV", selectedItemIds, channel)
                      );
                    }}
                    disabled={
                      selectedItemIds.length === 0 && channel.length === 0
                    }
                  >
                    Export CSV
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="success"
                    component="label"
                    // onClick={() =>
                    //   dispatch(getCatalogPublishApi(selectedItemIds, channel))
                    // }
                    disabled={
                      selectedItemIds.length === 0 || channel.length == 0
                    }
                  >
                    Export CSV
                  </Button>
                )}
              </Box>
            </Grid>
            <Box style={{ width: "60%", paddingTop: "10px" }}>
              <FormControl style={{ width: "25%" }} variant="standard">
                <InputLabel id="demo-simple-select-standard-label">
                  Select Channel
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={channel}
                  label="Select Channel"
                  onChange={handleChannel}
                  className={styles.select_channel_active}
                >
                  {channelOptions &&
                    channelOptions.map((item, i) => {
                      return (
                        <MenuItem value={item.value}>{item.name}</MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Box>
            <CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell align="start">ITEM ID</TableCell>
                      <TableCell align="start">NAME</TableCell>
                      <TableCell align="start">CATEGORY</TableCell>
                      <TableCell align="center">STATUS</TableCell>
                      <TableCell align="center">DETAILS</TableCell>
                      <TableCell align="center">EDIT</TableCell>
                    </TableRow>
                  </TableHead>

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
                            left: "330px",
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
                      <TableBody>
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>
                            <Checkbox
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedItemIds([
                                    ...selectedItemIds,
                                    row.itemId,
                                  ]);
                                } else {
                                  setSelectedItemIds(
                                    selectedItemIds.filter(
                                      (id) => id !== row.itemId
                                    )
                                  );
                                }
                              }}
                              checked={
                                selectedItemIds.includes(row.itemId)
                                  ? true
                                  : false
                              }
                            />
                          </TableCell>
                          <TableCell align="start">{row.itemId}</TableCell>
                          <TableCell align="start">{row.itemName}</TableCell>
                          <TableCell align="start">{row.category}</TableCell>
                          <TableCell align="center">
                            {row.productStatus}
                          </TableCell>
                          <TableCell align="center">
                            <div className="action_center Active_Product_Detials_Actions">
                              {/* <Image
                              className="px-2 "
                              src={lens}
                              alt="lens"
                              width={20}
                              height={20}
                              onClick={() => handleEdit(row.itemId)}
                              // onClick={() => setShowUserUpdateForm(true)}
                            /> */}
                              <Eye
                                style={{
                                  textAlign: "right",
                                  fontSize: "xx-small",
                                  color: "#419794",
                                }}
                                onClick={() => handleEdit(row.itemId, row.itemName)}
                              />
                            </div>
                          </TableCell>
                          <TableCell align="center">

                            {loginReducer?.userRole == "ADMIN" ? (
                              <>
                                <div className="action_center Active_Product_Detials_Actions">
                                  <Edit2
                                    style={{
                                      textAlign: "right",
                                      fontSize: "xx-small",
                                      color: "#419794",
                                    }}
                                    onClick={() => {
                                      setShowRevalidateAddForm(true);
                                      setSatusAPICalled(false)
                                      setFormation(row.formation);
                                      setPimCodetId(row.itemId);

                                    }}
                                  />
                                  <CustomModal
                                    openModal={showRevalidateAddForm}
                                    closeModal={() => setShowRevalidateAddForm(false)}
                                    body={
                                      <ProductStatusForm
                                        classModal={() => setShowRevalidateAddForm(false)}
                                        formation={formationData}
                                        pimModelCode={pimModelCode}
                                        statusApiCalled={() => setSatusAPICalled(true)}
                                      />
                                    }
                                  />
                                </div>
                              </>
                            ) : (<>
                              <div className="action_center Active_Product_Detials_Actions">
                                <Edit2
                                  style={{
                                    textAlign: "right",
                                    fontSize: "xx-small",
                                    color: "#000000",
                                  }}
                                // onClick={() => {
                                //   setShowRevalidateAddForm(true);
                                //   setSatusAPICalled(false)
                                //   setFormation(row.formation);
                                //   setPimCodetId(row.itemId);

                                // }}
                                />

                              </div>
                            </>)
                            }

                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ))
                  ) : (
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={12}>No Record Found</TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              {/* <Stack spacing={2}> */}
              <div className={styles.category_pagination}>
                {/* <Pagination
                    count={Math.ceil(totalRecords / recordPerPage)}
                    page={currentPage}
                    showFirstButton
                    showLastButton
                    onChange={handlePaginationChange}
                  /> */}
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
              {/* </Stack> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default React.memo(ActiveProducts);
