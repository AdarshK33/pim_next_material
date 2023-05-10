import React, { useEffect, useState } from "react";
import styles from "./productDetails.module.css";
import edit from "../../../../assets/icons/edit.svg";
import Image from "next/image";
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
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CustomModal from "../../../common/customModal";
import AddFormRevalidate from "./AddFormRevalidate";
import AddFormComment from "./AddFormComment";

import { productDetailsApi } from "../../../../redux/actions/catalogServiceNew";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const ProductDetails = (props) => {
  const { user: { role = "" } = {}, loggedIn } = props.user;
  const { catalogServiceNewReducer } = useSelector((state) => {
    return state;
  });

  const router = useRouter();
  // console.log("rrrrrrrrrrrrrrrr", router.query);

  // console.log("pimcode", catalogServiceNewReducer?.productPimCodeData);

  // const result = [
  //   {
  //     attributeSet: "AX MASTER",
  //     attributes: [
  //       {
  //         attributeSetId: 1,
  //         attributeId: 2,
  //         keyName: "ITEM ID",
  //         displayName: "ITEM ID",
  //         inputType: "string",
  //         value: "Tea0002",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: false,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 2,
  //         keyName: "ITEM ID",
  //         displayName: "ITEM ID",
  //         inputType: "string",
  //         value: "Tea0002",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: false,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 2,
  //         keyName: "ITEM ID",
  //         displayName: "ITEM ID",
  //         inputType: "string",
  //         value: "Tea0002",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: false,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 2,
  //         keyName: "ITEM ID",
  //         displayName: "ITEM ID",
  //         inputType: "string",
  //         value: "Tea0002",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: false,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 2,
  //         keyName: "ITEM ID",
  //         displayName: "ITEM ID",
  //         inputType: "string",
  //         value: "Tea0002",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: false,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 2,
  //         keyName: "ITEM ID",
  //         displayName: "ITEM ID",
  //         inputType: "string",
  //         value: "Tea0002",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: false,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 2,
  //         keyName: "ITEM ID",
  //         displayName: "ITEM ID",
  //         inputType: "string",
  //         value: "Tea0002",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: false,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 2,
  //         keyName: "ITEM ID",
  //         displayName: "ITEM ID",
  //         inputType: "string",
  //         value: "Tea0002",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: false,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 2,
  //         keyName: "ITEM ID",
  //         displayName: "ITEM ID",
  //         inputType: "string",
  //         value: "Tea0002",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: false,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 2,
  //         keyName: "ITEM ID",
  //         displayName: "ITEM ID",
  //         inputType: "string",
  //         value: "Tea0002",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: false,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 3,
  //         keyName: "ITEM NAME",
  //         displayName: "ITEM NAME",
  //         inputType: "string",
  //         value: "AB PRESS EYE DROPS",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 4,
  //         keyName: "ITEM CATEGORY ID",
  //         displayName: "ITEM CATEGORY ID",
  //         inputType: "string",
  //         value: "P",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: false,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 5,
  //         keyName: "ITEM CATEGORY NAME",
  //         displayName: "ITEM CATEGORY NAME",
  //         inputType: "string",
  //         value: "PHARMA",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 6,
  //         keyName: "ITEM CLASSIFICATION",
  //         displayName: "ITEM CLASSIFICATION",
  //         inputType: "string",
  //         value: "",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 6,
  //         keyName: "ITEM CLASSIFICATION",
  //         displayName: "ITEM CLASSIFICATION",
  //         inputType: "string",
  //         value: "",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 6,
  //         keyName: "ITEM CLASSIFICATION",
  //         displayName: "ITEM CLASSIFICATION",
  //         inputType: "string",
  //         value: "",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 6,
  //         keyName: "ITEM CLASSIFICATION",
  //         displayName: "ITEM CLASSIFICATION",
  //         inputType: "string",
  //         value: "",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 6,
  //         keyName: "ITEM CLASSIFICATION",
  //         displayName: "ITEM CLASSIFICATION",
  //         inputType: "string",
  //         value: "",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 6,
  //         keyName: "ITEM CLASSIFICATION",
  //         displayName: "ITEM CLASSIFICATION",
  //         inputType: "string",
  //         value: "",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 6,
  //         keyName: "ITEM CLASSIFICATION",
  //         displayName: "ITEM CLASSIFICATION",
  //         inputType: "string",
  //         value: "",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 6,
  //         keyName: "ITEM CLASSIFICATION",
  //         displayName: "ITEM CLASSIFICATION",
  //         inputType: "string",
  //         value: "",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 6,
  //         keyName: "ITEM CLASSIFICATION",
  //         displayName: "ITEM CLASSIFICATION",
  //         inputType: "string",
  //         value: "",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 6,
  //         keyName: "ITEM CLASSIFICATION",
  //         displayName: "ITEM CLASSIFICATION",
  //         inputType: "string",
  //         value: "",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 6,
  //         keyName: "ITEM CLASSIFICATION",
  //         displayName: "ITEM CLASSIFICATION",
  //         inputType: "string",
  //         value: "",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 6,
  //         keyName: "ITEM CLASSIFICATION",
  //         displayName: "ITEM CLASSIFICATION",
  //         inputType: "string",
  //         value: "",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 6,
  //         keyName: "ITEM CLASSIFICATION",
  //         displayName: "ITEM CLASSIFICATION",
  //         inputType: "string",
  //         value: "",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 6,
  //         keyName: "ITEM CLASSIFICATION",
  //         displayName: "ITEM CLASSIFICATION",
  //         inputType: "string",
  //         value: "",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 6,
  //         keyName: "ITEM CLASSIFICATION",
  //         displayName: "ITEM CLASSIFICATION",
  //         inputType: "string",
  //         value: "",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 6,
  //         keyName: "ITEM CLASSIFICATION",
  //         displayName: "ITEM CLASSIFICATION",
  //         inputType: "string",
  //         value: "",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 7,
  //         keyName: "ITEM SUB CLASSIFICATION",
  //         displayName: "ITEM SUB CLASSIFICATION",
  //         inputType: "string",
  //         value: "",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //     ],
  //     comments: [],
  //   },
  //   {
  //     attributeSet: "RX MASTER",
  //     attributes: [
  //       {
  //         attributeSetId: 1,
  //         attributeId: 2,
  //         keyName: "ITEM ID",
  //         displayName: "ITEM ID",
  //         inputType: "string",
  //         value: "Tea0002",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: false,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 3,
  //         keyName: "ITEM NAME",
  //         displayName: "ITEM NAME",
  //         inputType: "string",
  //         value: "AB PRESS EYE DROPS",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 4,
  //         keyName: "ITEM CATEGORY ID",
  //         displayName: "ITEM CATEGORY ID",
  //         inputType: "string",
  //         value: "P",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: false,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 5,
  //         keyName: "ITEM CATEGORY NAME",
  //         displayName: "ITEM CATEGORY NAME",
  //         inputType: "string",
  //         value: "PHARMA",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 6,
  //         keyName: "ITEM CLASSIFICATION",
  //         displayName: "ITEM CLASSIFICATION",
  //         inputType: "string",
  //         value: "",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //       {
  //         attributeSetId: 1,
  //         attributeId: 7,
  //         keyName: "ITEM SUB CLASSIFICATION",
  //         displayName: "ITEM SUB CLASSIFICATION",
  //         inputType: "string",
  //         value: "",
  //         structureType: "ARRAY",
  //         active: true,
  //         readOnly: true,
  //         mandatory: true,
  //         accessRole: "ADMIN",
  //       },
  //     ],
  //     comments: [],
  //   },
  // ];
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showRevalidateAddForm, setShowRevalidateAddForm] = useState(false);
  const [showCommentAddForm, setShowCommentAddForm] = useState(false);

  const AccordionSetUp = (key, value) => {
    console.log("AccordionSetUp", value);
    return (
      <>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>{value.attributeSet}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            {role === "ADMIN" ? (
              <>
                <Box className={styles.revalidate_Btn}>
                  <Button
                    variant="outlined"
                    color="danger"
                    component="label"
                    onClick={() => setShowRevalidateAddForm(true)}
                  >
                    Revalidate
                    {/* <input hidden accept="image/*" multiple type="file" /> */}
                  </Button>
                </Box>
                <CustomModal
                  openModal={showRevalidateAddForm}
                  closeModal={() => setShowRevalidateAddForm(false)}
                  body={
                    <AddFormRevalidate
                      classModal={() => setShowRevalidateAddForm(false)}
                      // allData={value}
                    />
                  }
                />
              </>
            ) : (
              <>
                <Box className={styles.revalidate_Btn}>
                  <Button
                    variant="outlined"
                    color="success"
                    component="label"
                    onClick={() => setShowCommentAddForm(true)}
                  >
                    Comment
                  </Button>
                </Box>
                <CustomModal
                  openModal={showCommentAddForm}
                  closeModal={() => setShowCommentAddForm(false)}
                  body={
                    <AddFormComment
                      classModal={() => setShowCommentAddForm(false)}
                    />
                  }
                />
              </>
            )}

            <CardContent>
              <Grid container>{sectionAllMasterRender(value.attributes)}</Grid>
            </CardContent>
          </AccordionDetails>
        </Accordion>
      </>
    );
  };

  const sectionAllMasterRender = (value) => {
    if (!value) {
      return;
    }
    console.log("item 2", value);
    return value.map((val, index) => {
      return inputAllMasterRender(val, index);
    });
  };

  const sectionAccordionSetUpRender = () => {
    if (!catalogServiceNewReducer?.productPimCodeData) {
      return;
    }
    const obj = catalogServiceNewReducer?.productPimCodeData;
    return Object.entries(obj).map(([key, value]) => {
      // console.log("hello key", key, value);
      if (key) {
        return AccordionSetUp(key, value);
      }
    });
    // result.map((item, index) => {
    //   console.log("item", item);
    //   return AccordionSetUp(item, index);
    // });
  };

  const inputAllMasterRender = (sectionItem, index) => {
    // console.log("hello sectionItem", sectionItem);
    return (
      <>
        <Grid md={4} key={index} className={styles.AdrshText_Field}>
          <TextField
            id="outlined-basic"
            label={sectionItem.displayName}
            variant="outlined"
            value={sectionItem.value}
            // inputProps={{ readOnly: sectionItem.readOnly }}
          />
        </Grid>
      </>
    );
  };

  return (
    <>
      <Grid container>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <Card sx={{ p: 5 }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Typography variant="h2" className={styles.main_title}>
                Product Details
              </Typography>
              {role === "ADMIN" && (
                <Button
                  variant="outlined"
                  color="success"
                  component="label"
                  // onClick={() => setShowAttributeAddForm(true)}
                >
                  Activate
                  {/* <input hidden accept="image/*" multiple type="file" /> */}
                </Button>
              )}
            </Grid>

            <Box sx={{ p: 1 }}>{sectionAccordionSetUpRender()}</Box>

            {/* <div>
              {result.map((item, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">{item.attributeSet}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      {item.attributes.map((attribute, attrIndex) => (
                        <div key={attrIndex}>
                          <Grid
                            md={4}
                            key={index}
                            className={styles.AdrshText_Field}
                          >
                            <TextField
                              id="outlined-basic"
                              label={attribute.displayName}
                              variant="outlined"
                              value={attribute.value}
                              // inputProps={{ readOnly: sectionItem.readOnly }}
                            />
                          </Grid>
                        </div>
                      ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div> */}
          </Card>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default ProductDetails;
