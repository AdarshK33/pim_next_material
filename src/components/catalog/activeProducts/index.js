import React, { useState, useEffect } from "react";
import styles from "./activeProducts.module.css";
import Image from "next/image";
import edit from "../../../../assets/icons/edit.svg";
import lens from "../../../../assets/icons/lens.svg";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  // console.log("selectedItemIds", selectedItemIds);

  const [viewDoc, setViewDoc] = useState(false);
  const [channel, setChannel] = useState("");

  const { catalogServiceNewReducer, channelReducer } = useSelector((state) => {
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
  const recordPerPage = 5;
  const totalRecords = catalogServiceNewReducer?.getAllProducts?.totalElements;
  const pageRange = 5;
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
    dispatch(getAllProductListApi(0, 5, "ACTIVATED"));
    dispatch(getChannelListApi(0, 1000));
  }, []);

  const handlePaginationChange = (value) => {
    setCurrentPage(value);
    dispatch(getAllProductListApi(value - 1, 5, "ACTIVATED"));
  };

  const handleChannel = (event) => {
    setChannel(event.target.value);
  };

  function handleEdit(PimCodeId) {
    router.push({
      pathname: "/productDetails",
      query: { PimCodeId: PimCodeId, ActiveProduct: "Active%Products" },
    });

    dispatch(productDetailsApi(PimCodeId));
  }
  const download = function (data) {
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "catalog.csv");
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

  useEffect(() => {
    console.log("publishProduct", publishProduct);
    if (
      publishProduct &&
      publishProduct !== null &&
      publishProduct !== undefined &&
      Object.keys(publishProduct).length &&
      viewDoc
    ) {
      const csvdata = csvmaker(publishProduct);
      download(csvdata);
      // console.log("publishProduct", publishProduct);
      setViewDoc(false);
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
              {selectedItemIds.length > 0 && channel ? (
                <Button
                  variant="outlined"
                  color="success"
                  component="label"
                  onClick={() => {
                    setViewDoc(true);
                    dispatch(getCatalogPublishApi(selectedItemIds, channel));
                  }}
                  disabled={
                    selectedItemIds.length === 0 && channel.length === 0
                  }
                >
                  Export
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="success"
                  component="label"
                  // onClick={() =>
                  //   dispatch(getCatalogPublishApi(selectedItemIds, channel))
                  // }
                  disabled={selectedItemIds.length === 0 || channel.length == 0}
                >
                  Export
                </Button>
              )}
            </Grid>
            <Box style={{ paddingTop: "20px" }}>
              <FormControl style={{ width: "30%" }}>
                <InputLabel id="demo-simple-select-label">
                  Select Channel
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={channel}
                  label="Select Channel"
                  onChange={handleChannel}
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
                      <TableCell> </TableCell>
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
                          <TableCell align="right">{row.itemId}</TableCell>
                          <TableCell align="right">{row.itemName}</TableCell>
                          <TableCell align="right">{row.category}</TableCell>
                          <TableCell align="right">
                            {row.productStatus}
                          </TableCell>
                          <div className="action_center Active_Product_Detials_Actions">
                            <Image
                              className="px-2 "
                              src={lens}
                              alt="lens"
                              width={20}
                              height={20}
                              onClick={() => handleEdit(row.itemId)}
                              // onClick={() => setShowUserUpdateForm(true)}
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

export default ActiveProducts;
