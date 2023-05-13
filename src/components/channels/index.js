import React, { useState, useEffect } from "react";
import styles from "./channels.module.css";
import Image from "next/image";
import edit from "../../../assets/icons/edit.svg";
import add from "../../../assets/icons/plus.svg";

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
import { useDispatch, useSelector } from "react-redux";
import {
  getChannelListApi,
  channelAttributeApiList,
} from "../../../redux/actions/channel";
import CustomModal from "../../common/customModal";
import AddForm from "./AddForm";
import { useRouter } from "next/router";

const Channels = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { channelReducer } = useSelector((state) => {
    return state;
  });
  const [showAttributeAddForm, setShowAttributeAddForm] = useState(false);
  const [showAttributeEditForm, setShowAttributeEditForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getChannelListApi(currentPage - 1, 5));
  }, []);

  // console.log("catalogServiceNewReducer", channelReducer?.channelGet);

  // >>>>>>>>>>>>>>>>>PAGINATION<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const recordPerPage = 5;
  const totalRecords = channelReducer?.channelGet?.totalElements;
  const pageRange = 5;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = channelReducer?.channelGet?.content;

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
    dispatch(getChannelListApi(value - 1, 5));
  };
  // >>>>>>>>>>>>>>>>>PAGINATION<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  const handleAdd = (channelId, channelName) => {
    console.log("channelId", channelId);
    router.push({
      pathname: "/channelAddAttribute",
      query: { channelId: channelId, channelName: channelName },
    });
    dispatch(channelAttributeApiList(channelName, 0, 5));
  };
  return (
    <>
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <Card sx={{ p: 5 }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Typography variant="h2" className={styles.main_title}>
                Channels
              </Typography>
              <Button
                variant="outlined"
                color="success"
                component="label"
                onClick={() => setShowAttributeAddForm(true)}
              >
                Add New
                {/* <input hidden accept="image/*" multiple type="file" /> */}
              </Button>
              <CustomModal
                openModal={showAttributeAddForm}
                closeModal={() =>
                  setShowAttributeAddForm(!showAttributeAddForm)
                }
                body={
                  <AddForm classModal={() => setShowAttributeAddForm(false)} />
                }
              />
            </Grid>
            <CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell align="right">NAME</TableCell>
                      <TableCell align="right">DESCRIPTION</TableCell>
                      {/* <TableCell align="right">LAST UPLOADED</TableCell> */}
                      {/* <TableCell align="right">TOTAL PRODUCT ACTIVE</TableCell> */}
                      {/* <TableCell align="right">
                        TOTAL PRODUCT INACTIVE
                      </TableCell> */}
                      <TableCell align="right">STATUS</TableCell>
                      <TableCell align="right">ATTRIBUTES</TableCell>
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
                            {/* {row.channelId} */}
                          </TableCell>
                          <TableCell align="right">{row.channelName}</TableCell>
                          <TableCell align="right">{row.description}</TableCell>
                          <TableCell align="right">
                            {row.status === true ? "Active" : "In-Active"}
                          </TableCell>

                          <div className="action_center">
                            <Image
                              className="px-2"
                              src={edit}
                              alt="add"
                              width={30}
                              height={25}
                              onClick={() =>
                                handleAdd(row.channelId, row.channelName)
                              }
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

export default Channels;
