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

const ProductDetails = (props) => {
  const { user: { role = "" } = {}, loggedIn } = props.user;
  const { catalogServiceNewReducer } = useSelector((state) => {
    return state;
  });

  console.log("pimcode", catalogServiceNewReducer?.productPimCodeData);
  var result = {
    "AX MASTER": [
      {
        attributeSetId: 1,
        attributeId: 44,
        keyName: "STRENGTH",
        displayName: "STRENGTH",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 45,
        keyName: "TAX",
        displayName: "TAX",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 46,
        keyName: "CATEGORY RETAIL",
        displayName: "CATEGORY RETAIL",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 47,
        keyName: "CATEGORY HIERARCHY RETAIL",
        displayName: "CATEGORY HIERARCHY RETAIL",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 48,
        keyName: "CATEGORY HIERARCHY PROCUREMENT",
        displayName: "CATEGORY HIERARCHY PROCUREMENT",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },

      {
        attributeSetId: 1,
        attributeId: 50,
        keyName: "DRUG TYPE",
        displayName: "DRUG TYPE",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 3,
        keyName: "ITEM NAME",
        displayName: "ITEM NAME",
        inputType: "string",
        value: "DTEL 40MG TAB 10'S",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
    ],
    "KEYMED MASTER": [
      {
        attributeSetId: 1,
        attributeId: 32,
        keyName: "DEL_MODIFIED TIME",
        displayName: "DEL_MODIFIED TIME",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 33,
        keyName: "MODIFIED BY",
        displayName: "MODIFIED BY",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 34,
        keyName: "CREATED DATE TIME",
        displayName: "CREATED DATE TIME",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 35,
        keyName: "DEL_CREATED TIME",
        displayName: "DEL_CREATED TIME",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 36,
        keyName: "CREATED BY",
        displayName: "CREATED BY",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 37,
        keyName: "REC VERSION",
        displayName: "REC VERSION",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 38,
        keyName: "REC ID",
        displayName: "REC ID",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 39,
        keyName: "HSN CODE",
        displayName: "HSN CODE",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 40,
        keyName: "ISFSSAI",
        displayName: "ISFSSAI",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 41,
        keyName: "MRP",
        displayName: "MRP",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 42,
        keyName: "REMARKS",
        displayName: "REMARKS",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 43,
        keyName: "SCHEDULE",
        displayName: "SCHEDULE",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 44,
        keyName: "STRENGTH",
        displayName: "STRENGTH",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 45,
        keyName: "TAX",
        displayName: "TAX",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 46,
        keyName: "CATEGORY RETAIL",
        displayName: "CATEGORY RETAIL",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 47,
        keyName: "CATEGORY HIERARCHY RETAIL",
        displayName: "CATEGORY HIERARCHY RETAIL",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 48,
        keyName: "CATEGORY HIERARCHY PROCUREMENT",
        displayName: "CATEGORY HIERARCHY PROCUREMENT",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 49,
        keyName: "CATEGORY PROCUREMENT",
        displayName: "CATEGORY PROCUREMENT",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 50,
        keyName: "DRUG TYPE",
        displayName: "DRUG TYPE",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 3,
        keyName: "ITEM NAME",
        displayName: "ITEM NAME",
        inputType: "string",
        value: "DTEL 40MG TAB 10'S",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
    ],
    "RX MASTER": [
      {
        attributeSetId: 1,
        attributeId: 32,
        keyName: "DEL_MODIFIED TIME",
        displayName: "DEL_MODIFIED TIME",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 33,
        keyName: "MODIFIED BY",
        displayName: "MODIFIED BY",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 34,
        keyName: "CREATED DATE TIME",
        displayName: "CREATED DATE TIME",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 35,
        keyName: "DEL_CREATED TIME",
        displayName: "DEL_CREATED TIME",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 36,
        keyName: "CREATED BY",
        displayName: "CREATED BY",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 37,
        keyName: "REC VERSION",
        displayName: "REC VERSION",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 38,
        keyName: "REC ID",
        displayName: "REC ID",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 39,
        keyName: "HSN CODE",
        displayName: "HSN CODE",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 40,
        keyName: "ISFSSAI",
        displayName: "ISFSSAI",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 41,
        keyName: "MRP",
        displayName: "MRP",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 42,
        keyName: "REMARKS",
        displayName: "REMARKS",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 43,
        keyName: "SCHEDULE",
        displayName: "SCHEDULE",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 44,
        keyName: "STRENGTH",
        displayName: "STRENGTH",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 45,
        keyName: "TAX",
        displayName: "TAX",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 46,
        keyName: "CATEGORY RETAIL",
        displayName: "CATEGORY RETAIL",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 47,
        keyName: "CATEGORY HIERARCHY RETAIL",
        displayName: "CATEGORY HIERARCHY RETAIL",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 48,
        keyName: "CATEGORY HIERARCHY PROCUREMENT",
        displayName: "CATEGORY HIERARCHY PROCUREMENT",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 49,
        keyName: "CATEGORY PROCUREMENT",
        displayName: "CATEGORY PROCUREMENT",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 50,
        keyName: "DRUG TYPE",
        displayName: "DRUG TYPE",
        inputType: "string",
        value: "",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
      {
        attributeSetId: 1,
        attributeId: 3,
        keyName: "ITEM NAME",
        displayName: "ITEM NAME",
        inputType: "string",
        value: "DTEL 40MG TAB 10'S",
        structureType: "ARRAY",
        active: true,
        readOnly: true,
        mandatory: true,
        accessRole: "ADMIN",
      },
    ],
  };
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showRevalidateAddForm, setShowRevalidateAddForm] = useState(false);
  const [showCommentAddForm, setShowCommentAddForm] = useState(false);

  const AccordionSetUp = (key, value) => {
    return (
      <>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>{key}</Typography>
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
              <Grid container>{sectionAllMasterRender(value)}</Grid>
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

    return value.map((val, index) => {
      return inputAllMasterRender(val, index);
    });
  };

  const sectionAccordionSetUpRender = (screenType) => {
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
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductDetails;
