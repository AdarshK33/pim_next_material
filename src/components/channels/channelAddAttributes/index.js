import React, { useState, useEffect } from "react";
import styles from "./channelAddAttributes.module.css";
import { useRouter } from "next/router";

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
import CustomModal from "../../../common/customModal";
import AddForm from "./AddForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const ChannelAddAttributes = () => {
  const router = useRouter();

  const { channelAttribute } = useSelector((state) => {
    return state.channelReducer;
  });
  const { authorities } = useSelector(state => state.loginReducer)


  const [currentPage, setCurrentPage] = useState(1);
  const [channelAttr, setChannelAttr] = useState();
  const [showAttributeAddForm, setShowAttributeAddForm] = useState(false);

  useEffect(() => {
    if (!channelAttribute?.content?.channelAttributes) {
      return;
    }

    const obj = channelAttribute?.content?.channelAttributes;
    const channelAttributes = new Object();
    Object.entries(obj).map(([key, value]) => {
      return Object.entries(value).map(([key, val]) => {
        if (key === "attributes") {
          channelAttributes = val;
        }
      });
    });
    setChannelAttr(channelAttributes);
  }, [channelAttribute]);

  const recordPerPage = 100;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = channelAttr;

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
                disabled={authorities?.CHANNELS == 'r' ? true : false}
              >
                Add New
              </Button>
              <CustomModal
                openModal={showAttributeAddForm}
                closeModal={() => {
                  setShowAttributeAddForm(!showAttributeAddForm);
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
                          </TableCell>
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default ChannelAddAttributes;
