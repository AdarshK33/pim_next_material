import React, { useState, useEffect } from "react";
import { Card, Box, Typography, Grid, TextField } from "@mui/material";
import styles from "./media.module.css";
import axios from "axios";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductListApi,
  getMediaListingApi,
  mediaUploadApi,
} from "../../../redux/actions/catalogServiceNew";
import Autocomplete from "@mui/material/Autocomplete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "react-js-pagination";
import { Eye, Image } from "react-feather";

const Media = (props) => {
  const { loading, mediaData } = useSelector((state) => {
    return state.catalogServiceNewReducer;
  });
  const dispatch = useDispatch();
  const { user: { at = "" } = {}, loggedIn } = props.user;
  const [currentPage, setCurrentPage] = useState(1);
  const [enableUpload, setEnableUpload] = useState(false);
  const [selectItemId, setSelectItemId] = useState("");

  const { catalogServiceNewReducer, loginReducer } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    dispatch(getMediaListingApi(0, 10, selectItemId));
    setCurrentPage(1);
  }, [selectItemId]);

  useEffect(() => {
    dispatch(getAllProductListApi(0, 5, "ACTIVATED"));
  }, []);

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("file", file);
    });
    formData.append("id", selectItemId);

    dispatch(mediaUploadApi(formData));

    // axios
    //   .post(
    //     `${process.env.CATALOG_NEW_SERVICE_URL}/catalog/media/${selectItemId}`,
    //     ś,
    //     {
    //       headers: {
    //         Accept: "*/*",
    //         "Content-Type": "multipart/form-data",
    //         Authorization: `Bearer ${at}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     toast.info("media file uploaded Successfully !!!");
    //   })
    //   .catch((error) => {
    //     toast.error("media file upload Failed !!!");
    //   });
  };

  const onDropNotify = () => {
    toast.error("Please select item id !!!");
  };

  const handleDownload = (data) => {
    window.open(data, "_blank");
  };

  const tableData = [];

  for (let i = 1; i <= 5; i++) {
    tableData.push({
      fileName: `file${i} `,
      createdBy: i + "/5" + "/2023",
      createdAt: i + "/5" + "/2023",
      updatedBy: "admin@gmail.com",
    });
  }

  //   /*-----------------Pagination------------------*/

  const recordPerPage = 10;
  const totalRecords = mediaData?.totalElements;
  const pageRange = 10;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = mediaData?.content;

  const handlePaginationChange = (value) => {
    setCurrentPage(value);

    dispatch(getMediaListingApi(value - 1, 10));
  };

  /*-----------------Pagination------------------*/

  return (
    <>
      <Grid container>
        <Grid item xs={12} lg={12}>
          <Card sx={{ p: 5 }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Typography variant="h2" className={styles.main_title}>
                Media
              </Typography>
            </Grid>
            <Box sx={{ maxWidth: 150 }} style={{ margin: "10px" }}>
              {catalogServiceNewReducer?.getAllProducts !== null &&
                Object.entries(catalogServiceNewReducer?.getAllProducts)
                  .length !== 0 && (
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={
                      catalogServiceNewReducer?.getAllProducts?.content.map(
                        (option) => option.itemId
                      ) || []
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Item Id.."
                        className={styles.input_search_product}
                      />
                    )}
                    onChange={(event, value) => {
                      setSelectItemId(value);
                      setEnableUpload(!!value);
                    }}
                  />
                )}
            </Box>
            {loginReducer?.authorities?.MEDIA == "w" && enableUpload ? (
              <Box className="dropZone-container">
                <Dropzone
                  onDrop={onDrop}
                // accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      className="dropzone col-2 p-3 text-end align-self-center d-flex"
                    >
                      <input {...getInputProps()} />
                      { }
                      <Box
                        className={`${styles.upload_placeholder} upload_blk`}
                      >
                        <Box>
                          <Image
                            fontSize="small"
                            style={{
                              fontSize: "xx-small",
                              color: "#419794",
                            }}
                          />{" "}
                          {/* Add the icon here */}
                        </Box>
                        <u className={styles.text_bulk_upload}>Upload Image</u>
                      </Box>
                    </Box>
                  )}
                </Dropzone>
              </Box>
            ) : (
              <Box className="dropZone-container">
                <Dropzone onDrop={onDropNotify}>
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      className="dropzone col-2 p-3 text-end align-self-center d-flex"
                    >
                      <input {...getInputProps()} />
                      { }
                      <Box
                        className={`${styles.upload_placeholder} upload_blk`}
                      >
                        <Box>
                          <Image
                            fontSize="small"
                            style={{
                              fontSize: "xx-small",
                              color: "#419794",
                            }}
                          />{" "}
                          {/* Add the icon here */}
                        </Box>
                        <u className={styles.text_bulk_upload}>Upload Image</u>
                      </Box>
                    </Box>
                  )}
                </Dropzone>
              </Box>
            )}

            <Box>
              {loading === true ? (
                <div
                  className="loader-box loader"
                  style={{ width: "100% !important" }}
                >
                  <div className="loader">
                    <div className="line bg-primary"></div>
                    <div className="line bg-primary"></div>
                    <div className="line bg-primary"></div>
                    <div className="line bg-primary"></div>
                  </div>
                </div>
              ) : (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="start">FILE NAME</TableCell>
                        <TableCell align="start">CREATED AT</TableCell>
                        <TableCell align="start">CREATED BY</TableCell>
                        <TableCell align="start">UPDATED BY</TableCell>
                        <TableCell align="right">VIEW IMAGE</TableCell>
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
                            <TableCell align="start">{row.name}</TableCell>
                            <TableCell align="start">

                              {
                                new Date(row.createdAt)
                                  .toISOString()
                                  .split("T")[0]
                              }{" "}
                              {/* {new Date(row.createdAt).toLocaleTimeString()} */}
                              {new Date(row.createdAt + "Z").toLocaleTimeString()}


                            </TableCell>


                            <TableCell align="start">{row.createdBy}</TableCell>
                            <TableCell align="right">{row.updatedBy}</TableCell>
                            <div className="action_center product_Detials_Actions">
                              <Eye
                                style={{
                                  textAlign: "right",
                                  fontSize: "xx-small",
                                  color: "#419794",
                                  marginLeft: "20px",
                                  padding: "1px",
                                }}
                                onClick={() => handleDownload(row.completeUrl)}
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
              )}
              <div className={styles.bulk_pagination}>
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
            </Box>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default React.memo(Media);
