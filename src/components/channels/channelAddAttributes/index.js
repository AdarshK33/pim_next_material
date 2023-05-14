import React, { useState, useEffect } from "react";
import styles from "./channelAddAttributes.module.css";

import { useRouter } from "next/router";

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
import Checkbox from "@mui/material/Checkbox";
import CustomModal from "../../../common/customModal";
import AddForm from "./AddForm";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myProfileAPi } from "../../../../redux/actions/login";

import {
  getChannelListApi,
  channelAttributeApiList,
} from "../../../../redux/actions/channel";
import { useDispatch, useSelector } from "react-redux";

const ChannelAddAttributes = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { channelAttribute } = useSelector((state) => {
    return state.channelReducer;
  });
  const channelName = router.query.channelName;
  const channelId = router.query.channelId;

  // console.log(channelId, "channelId");

  const [currentPage, setCurrentPage] = useState(1);
  const [channelAttr, setChannelAttr] = useState();
  const [showAttributeAddForm, setShowAttributeAddForm] = useState(false);
  const [attributeAddFormId, setAttributeAddFormId] = useState();
  // useEffect(() => {
  // dispatch(myProfileAPi());
  // }, []);
  useEffect(() => {
    if (!channelAttribute?.content?.channelAttributes) {
      return;
    }

    const obj = channelAttribute?.content?.channelAttributes;
    const channelAttributes = new Object();
    Object.entries(obj).map(([key, value]) => {
      return Object.entries(value).map(([key, val]) => {
        // console.log("hello 1", key, val);
        if (key === "attributes") {
          channelAttributes = val;
        }
      });
    });
    setChannelAttr(channelAttributes);
    // console.log(channelAttributes, "channelAttributes");
  }, [channelAttribute]);

  // console.log(channelAttr, "channelAttr");

  //   const tableData = [];

  //   for (let i = 1; i <= 5; i++) {
  //     tableData.push({
  //       attributes: "AirEnabled" + i,
  //     });
  //   }

  const recordPerPage = 100;
  //   const totalRecords = 100;
  //   const pageRange = 5;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = channelAttr;

  //   const handlePaginationChange = (event, value) => {
  //     setCurrentPage(value);
  //     dispatch(channelAttributeApiList(router.query.channelName, value - 1, 5));
  //   };

  const onChangeOfCheckBox = (e, pim) => {
    console.log(pim, e);
  };
  return (
    <>
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <Card sx={{ p: 5 }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Typography variant="h2" className={styles.main_title}>
                {router.query.channelName} Attributes
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
                closeModal={() => {
                  setShowAttributeAddForm(!showAttributeAddForm);
                  // setAttributeAddFormId(router.query.channelId);
                }}
                body={
                  <AddForm
                    classModal={() => setShowAttributeAddForm(false)}
                    dataID={router.query.channelId}
                  />
                }
              />
            </Grid>
            <CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell align="right">ATTRIBUTE ID</TableCell>
                      {/* <TableCell align="right">DESCRIPTION</TableCell> */}
                      {/* <TableCell align="right">LAST UPLOADED</TableCell> */}
                      {/* <TableCell align="right">TOTAL PRODUCT ACTIVE</TableCell> */}
                      {/* <TableCell align="right">
                        TOTAL PRODUCT INACTIVE
                      </TableCell> */}
                      {/* <TableCell align="right">STATUS</TableCell> */}
                      <TableCell align="right">ATTRIBUTE NAME </TableCell>
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
                          <TableCell align="right">{row.attributeId}</TableCell>
                          <TableCell align="right">{row.displayName}</TableCell>

                          <TableCell align="right"></TableCell>
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
              {/* <Stack spacing={2}>
                <div className={styles.category_pagination}>
                  <Pagination
                    count={Math.ceil(totalRecords / recordPerPage)}
                    page={currentPage}
                    showFirstButton
                    showLastButton
                    onChange={handlePaginationChange}
                  />
                </div> */}
              {/* </Stack> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default ChannelAddAttributes;
