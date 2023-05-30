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
  TextField,
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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ChannelAddAttributes = () => {
  const router = useRouter();

  const { channelAttribute } = useSelector((state) => {
    return state.channelReducer;
  });
  const { authorities } = useSelector((state) => state.loginReducer);

  const [currentPage, setCurrentPage] = useState(1);
  const [channelAttr, setChannelAttr] = useState();
  const [stateInput, setStateInput] = useState();
  const [showAttributeAddForm, setShowAttributeAddForm] = useState(false);
  const [checkUpdate, setcheckUpdate] = useState(false);

  const inputChangeHandler = (e) => {
    setStateInput({
      ...stateInput,
      [e.target.name]: e.target.value,
    });
    setcheckUpdate(true);
  };

  console.log(stateInput, "hello stateInput channel");

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

  useEffect(() => {
    if (!channelAttribute?.content?.channelAttributes) {
      return;
    }
    // mapping the master.modelAttributes for input field
    const obj = channelAttribute?.content?.channelAttributes;
    const inputState = new Object();
    Object.entries(obj).map(([key, value]) => {
      console.log("heuello iiiiiiiiiiii", key, value);

      value?.attributes.forEach((val) => {
        // console.log("hello iiiiiiiiiiii", val);
        inputState[val.attributeId] = val.keyName;
      });
    });

    setStateInput(inputState);
  }, [channelAttribute]);

  const sectionAccordionSetUpRender = () => {
    if (!channelAttr) {
      return;
    }
    const obj = channelAttr;
    return channelAttr.map((row, i) => {
      console.log("channelAttr", row, i);
      return inputAllMasterRender(row, i);
    });
  };

  const updateHandler = () => {
    //call update apis
    console.log("hello update called");
    setcheckUpdate(false);
  };
  const inputAllMasterRender = (sectionItem, index) => {
    return (
      <>
        <Grid
          md={4}
          key={index}
          className={styles.inputAllMasterRender_Text_Field}
        >
          <TextField
            id="outlined-basic"
            // label={sectionItem.displayName}
            variant="outlined"
            name={sectionItem.attributeId}
            value={getInputValue(sectionItem.attributeId)}
            onChange={inputChangeHandler}
            // disabled={sectionItem.accessRole !== role ? true : false}
          />
        </Grid>
      </>
    );
  };
  const getInputValue = (attributeId) => {
    try {
      return stateInput[attributeId];
    } catch (error) {
      return "";
    }
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
              <Box>
                <Button
                  variant="outlined"
                  color="success"
                  component="label"
                  className={styles.buttonAdd_channelAtt}
                  onClick={() => setShowAttributeAddForm(true)}
                  disabled={
                    authorities?.CHANNELS == "r" || checkUpdate ? true : false
                  }
                >
                  Add New
                </Button>

                <Button
                  variant="outlined"
                  color="success"
                  component="label"
                  onClick={updateHandler}
                  disabled={!checkUpdate}
                >
                  Update
                </Button>
              </Box>
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

            {/* <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>{router.query.channelName} Attributes</Typography>
              </AccordionSummary>

              <AccordionDetails> */}
            <CardContent>
              <Grid container>{sectionAccordionSetUpRender()}</Grid>
            </CardContent>
            {/* </AccordionDetails>
            </Accordion> */}
            {/* <CardContent>
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
            </CardContent> */}
          </Card>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default ChannelAddAttributes;
