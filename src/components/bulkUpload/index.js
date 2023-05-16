import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  Chip,
  Grid,
  Button,
} from "@mui/material";

import styles from "./bulk.module.css";
import { useDropzone } from "react-dropzone";
import axios from "axios";

// import { CloudUpload } from "@material-ui/icons";

import Image from "next/image";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { bulkUploadApi } from "../../../redux/actions/catalogServiceNew";
import { uploadClient } from "../../../utils/axios";

// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "react-js-pagination";
const BulkUpload = (props) => {
  const dispatch = useDispatch();
  // console.log("ppppppppppp", props.user);
  const { user: { at = "" } = {}, loggedIn } = props.user;
  const [currentPage, setCurrentPage] = useState(1);

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("file", file);
    });

    // dispatch(bulkUploadApi(formData));

    axios
      .post(
        `https://catalogservice-apis.theretailinsightsdemos.com/api/v1/catalog/bulk`,
        formData,
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${at}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        toast.info("Bulk File uploaded Successfully !!!");
      })
      .catch((error) => {
        toast.error("Bulk File upload Failed !!!");
        console.log(error);
      });
  };

  const tableData = [];

  for (let i = 1; i <= 5; i++) {
    tableData.push({
      filename: `file${i} `,
      UploadedBy: i + "/5" + "/2023",
      UpdateAt: i + "/5" + "/2023",
    });
  }

  //   /*-----------------Pagination------------------*/

  const recordPerPage = 5;
  const totalRecords = tableData.length;
  const pageRange = 5;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = tableData;

  const handlePaginationChange = (value) => {
    setCurrentPage(value);
    dispatch(getAttributeListApi(value - 1, 5));
  };

  /*-----------------Pagination------------------*/

  return (
    <>
      <Grid container>
        <Grid item xs={12} lg={12}>
          <Card sx={{ p: 5 }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Typography variant="h2" className={styles.main_title}>
                Bulk Upload
              </Typography>
            </Grid>
            <Box className="dropZone-container">
              <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    className="dropzone col-2 p-3 text-end align-self-center d-flex"
                  >
                    <input {...getInputProps()} />
                    {}
                    <Box className="upload_placeholder upload_blk">
                      <Box></Box>
                      <u className="">Upload Your Document</u>
                    </Box>
                  </Box>
                )}
              </Dropzone>
            </Box>

            <Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>FILE NAME</TableCell>
                      <TableCell>UPLOAD AT</TableCell>
                      <TableCell align="right">UPDATE AT</TableCell>
                      {/* <TableCell align="right">PRECEDENCE</TableCell> */}
                      <TableCell align="right">STATUS</TableCell>
                      {/* <TableCell align="right">ACTION</TableCell> */}
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
                            {i + 1 + indexOfFirstRecord}
                          </TableCell>
                          <TableCell align="right">{row.filename}</TableCell>
                          <TableCell align="right">{row.UploadedBy}</TableCell>
                          <TableCell align="right">{row.UpdateAt}</TableCell>
                          {/* <TableCell align="right">{row.precedence}</TableCell> */}
                          <TableCell align="right">
                            {row?.active === true ? "Active" : "In-Active"}
                          </TableCell>
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
              <div className={styles.bulk_pagination}>
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
            </Box>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default BulkUpload;
