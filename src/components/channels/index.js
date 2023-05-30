import React, { useState, useEffect } from "react";
import styles from "./channels.module.css";
import { Edit2, Eye } from "react-feather";

import {
  Grid,
  Button,
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
import { useDispatch, useSelector } from "react-redux";
import {
  getChannelListApi,
  channelAttributeApiList,
} from "../../../redux/actions/channel";
import CustomModal from "../../common/customModal";
import AddForm from "./AddForm";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";

const Channels = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { channelReducer } = useSelector((state) => {
    return state;
  });
  const { authorities } = useSelector((state) => {
    return state.loginReducer;
  });

  const [showAttributeAddForm, setShowAttributeAddForm] = useState(false);
  const [showAttributeEditForm, setShowAttributeEditForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getChannelListApi(currentPage - 1, 5));
  }, []);


  // >>>>>>>>>>>>>>>>>PAGINATION<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const recordPerPage = 10;
  const totalRecords = channelReducer?.channelGet?.totalElements;
  const pageRange = 10;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = channelReducer?.channelGet?.content;

  const handlePaginationChange = (value) => {
    setCurrentPage(value);
    dispatch(getChannelListApi(value - 1, 5));
  };
  // >>>>>>>>>>>>>>>>>PAGINATION<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  const handleAdd = (channelId, channelName) => {
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
                disabled={authorities?.CHANNELS == 'r' ? true : false}
              >
                Add New
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
                      <TableCell align="right">STATUS</TableCell>
                      <TableCell align="right">ATTRIBUTES </TableCell>
                      {
                        authorities?.CHANNELS == 'w'
                        && <TableCell align="right">EDIT</TableCell>
                      }
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
                          <TableCell align="right">{row.channelName}</TableCell>
                          <TableCell align="right">{row.description}</TableCell>
                          <TableCell align="right">
                            {row.status === true ? "Active" : "In-Active"}
                          </TableCell>
                          <TableCell align="right">
                            <div className={`action_center }`}>
                              <Eye
                                style={{
                                  textAlign: "right",
                                  fontSize: "xx-small",
                                  color: "#419794",
                                }}
                                onClick={() =>
                                  handleAdd(row.channelId, row.channelName)
                                }
                              />
                            </div>
                          </TableCell>
                          {
                            authorities?.CHANNELS == 'w'
                            && <TableCell align="right">
                              <div className={`action_center `}>
                                <Edit2
                                  style={{
                                    textAlign: "right",
                                    fontSize: "xx-small",
                                    color: "#419794",
                                  }}
                                />
                              </div>
                            </TableCell>
                          }

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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Channels;
