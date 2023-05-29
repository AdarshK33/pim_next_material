import React, { useEffect, useState } from "react";
import styles from "./productDetails.module.css";
import edit from "../../../../assets/icons/edit.svg";

import { AlertTriangle } from "react-feather";

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

import {
  productDetailsApi,
  statusChangedApis,
  productUpdateApis,
} from "../../../../redux/actions/catalogServiceNew";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
const ProductDetails = (props) => {
  const { user: { role = "" } = {}, loggedIn } = props.user;
  const { catalogServiceNewReducer, catalogQueryReducer } = useSelector(
    (state) => {
      return state;
    }
  );
  const { authorities } = useSelector((state) => {
    return state.loginReducer;
  });

  const router = useRouter();
  console.log("rrrrrrrrrrrrrrrr", router.query.PimCodeId);

  console.log(
    " catalogServiceNewReducer?.productPimCodeData",
    catalogServiceNewReducer?.productPimCodeData
  );

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });
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
  const [commentAddForm, setCommentAddForm] = useState(false);
  const [attributeSetIdForm, setAttributeSetId] = useState(false);
  const [commentAPICalled, setCommentAPICalled] = useState(false);

  const [objectId, setObjectId] = useState("");

  const [stateInput, setStateInput] = useState();
  const [checkUpdate, setcheckUpdate] = useState(false);
  const [updateApiCall, setCallApi] = useState(false);

  const inputChangeHandler = (e) => {
    // console.log("iiiiiiii", e.target.vlaue);
    setStateInput({
      ...stateInput,
      [e.target.name]: e.target.value,
    });
    setcheckUpdate(true);
  };
  useEffect(() => {
    dispatch(productDetailsApi(router.query.PimCodeId));
  }, []);

  useEffect(() => {
    if (role === "ADMIN" && updateApiCall) {
      let info = {
        payload: {
          "AX MASTER": {
            ...stateInput,
          },
        },
        modelCode: router.query.PimCodeId,
      };
      dispatch(productUpdateApis(info));
      setCallApi(false);
    }
    if (role === "ONLINE_MASTER" && updateApiCall) {
      let info = {
        payload: {
          ONLINEMASTER: {
            ...stateInput,
          },
        },
        modelCode: router.query.PimCodeId,
      };
      dispatch(productUpdateApis(info));
      setCallApi(false);
    }
    if (role === "HIPAR" && updateApiCall) {
      let info = {
        payload: {
          HIPAR: {
            ...stateInput,
          },
        },
        modelCode: router.query.PimCodeId,
      };
      dispatch(productUpdateApis(info));
      setCallApi(false);
    }
    if (role === "R_DRUGS" && updateApiCall) {
      let info = {
        payload: {
          R_DRUGS: {
            ...stateInput,
          },
        },
        modelCode: router.query.PimCodeId,
      };
      dispatch(productUpdateApis(info));
      setCallApi(false);
    }

    if (role === "KEYMED_MANAGER" && updateApiCall) {
      let info = {
        payload: {
          KEYMEDMASTER: {
            ...stateInput,
          },
        },
        modelCode: router.query.PimCodeId,
      };
      dispatch(productUpdateApis(info));
      setCallApi(false);
    }
  }, [role, updateApiCall]);

  // useEffect(() => {
  //   let info = {
  //     payload: {
  //       "AX MASTER": {
  //         "ITEM ID": "ABP0007",
  //       },
  //     },
  //     modelCode: router.query.PimCodeId,
  //   };
  //   dispatch(productUpdateApis(info));
  // }, []);

  useEffect(() => {
    if (!catalogServiceNewReducer?.productPimCodeData) {
      return;
    }
    // mapping the master.modelAttributes for input field
    const obj = catalogServiceNewReducer?.productPimCodeData;
    const inputState = new Object();
    Object.entries(obj).map(([key, value]) => {
      value?.attributes.forEach((val) => {
        // console.log("hello vvvvvvvvvvv", val.keyName);

        inputState[val.keyName] = val.value;
      });
    });

    setStateInput(inputState);
  }, [catalogServiceNewReducer?.productPimCodeData]);
  // console.log("hello objectId", stateInput);
  const getInputValue = (keyName) => {
    try {
      return stateInput[keyName];
    } catch (error) {
      return "";
    }
  };

  const AccordionSetUp = (key, value) => {
    //console.log("AccordkeyionSetUp", key, value.comments);
    return (
      <>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography
              onChange={() => {
                setObjectId(value.attributeSet);
              }}
            >
              {value.attributeSet}

              {value.notification && (
                <CustomWidthTooltip
                  title={
                    value.notification ? (
                      <>
                        <Box>This attribute set has pending validation</Box>
                      </>
                    ) : (
                      ""
                    )
                  }
                >
                  <Button
                    sx={{ m: 1 }}
                    style={{
                      margin: "0px",
                      padding: "0px",
                      paddingBottom: "3px",
                    }}
                  >
                    <AlertTriangle
                      style={{
                        // textAlign: "right",
                        fontSize: "xx-small",
                        color: "red",
                        padding: "3px",
                      }}
                    />
                  </Button>
                </CustomWidthTooltip>
              )}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            {role === "ADMIN" && router.query.tab == "Ready-for-review" ? (
              <>
                <Box className={styles.revalidate_Btn}>
                  <Button
                    variant="outlined"
                    color="danger"
                    component="label"
                    onClick={() => {
                      setShowRevalidateAddForm(true);

                      setAttributeSetId(value.attributeSetId);
                    }}
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
                      attributeSetIdData={attributeSetIdForm}
                      revalidateCalled={() => setCommentAPICalled(true)}
                    />
                  }
                />
              </>
            ) : role && router.query.tab == "Revalidate" ? (
              <>
                <Box className={styles.revalidate_Btn}>
                  {/* <Button
                    variant="outlined"
                    color="success"
                    component="label"
                    onClick={(e) => {
                      setShowCommentAddForm(true);
                      setCommentAddForm(value.notification);
                    }}
                  >
                    Comment
                  </Button> */}

                  {/* {value.notification && (
                    <CustomWidthTooltip
                      title={
                        value.notification ? (
                          <>
                            <Box>This attribute set has pending validation</Box>
                          </>
                        ) : (
                          ""
                        )
                      }
                    >
                      <Button sx={{ m: 1 }}>
                        <AlertTriangle
                          style={{
                            // textAlign: "right",
                            fontSize: "xx-small",
                            color: "red",
                          }}
                        />
                      </Button>
                    </CustomWidthTooltip>
                  )} */}
                </Box>
                {/* <CustomModal
                  id={`${key}-customModal`}
                  openModal={showCommentAddForm}
                  closeModal={(e) => setShowCommentAddForm(false)}
                  body={
                    <AddFormComment
                      id={`${key}-addfromcomment`}
                      classModal={(e) => setShowCommentAddForm(false)}
                      valueData={commentAddForm}
                    />
                  }
                /> */}
              </>
            ) : (
              <></>
            )}

            <CardContent>
              <Grid container>{sectionAllMasterRender(value.attributes)}</Grid>
              {/* <div>
                <TextField
                  variant="outlined"
                  label="COMMENTS"
                  multiline
                  rows={3}
                  value={value?.comments.join(", ")}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div> */}
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
    // console.log("item 2", value);
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
      console.log("hello key", key, value);

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
        <Grid md={4} key={index} className={styles.role_based_Text_Field}>
          <TextField
            id="outlined-basic"
            label={sectionItem.displayName}
            variant="outlined"
            // value={sectionItem.value}
            // // inputProps={{ readOnly: sectionItem.readOnly }}
            name={sectionItem.keyName}
            value={getInputValue(sectionItem.keyName)}
            onChange={inputChangeHandler}
            disabled={sectionItem.accessRole !== role ? true : false}
          />
        </Grid>
      </>
    );
  };
  const activateHandler = () => {
    let infoData = {
      pimModelCode: router.query.PimCodeId,
      status: "ACTIVATED",
    };
    dispatch(statusChangedApis(infoData));
  };
  const updateHandler = () => {
    setCallApi(true);
  };

  return (
    <>
      <Grid container>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <Card sx={{ p: 5 }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Typography variant="h2" className={styles.main_title}>
                {router.query.ActiveProduct?.length > 0
                  ? `Active Products - ${router.query.PimCodeId}`
                  : `Product Details - ${router.query.PimCodeId}`}
              </Typography>
              {role === "ADMIN" && router.query.tab == "Ready-for-review" ? (
                <Button
                  variant="outlined"
                  color="success"
                  component="label"
                  onClick={activateHandler}
                  // disabled={commentAPICalled}
                  disabled={authorities.ACTIVE_PRODUCTS == 'r' ? true : commentAPICalled}
                >
                  Activate
                  {/* <input hidden accept="image/*" multiple type="file" /> */}
                </Button>
              ) : role && router.query.tab == "Revalidate" ? (
                <>
                  <Button
                    variant="outlined"
                    color="success"
                    component="label"
                    onClick={updateHandler}
                    disabled={!checkUpdate}
                  >
                    Update
                    {/* <input hidden accept="image/*" multiple type="file" /> */}
                  </Button>
                </>
              ) : (
                <></>
              )}
            </Grid>

            <Box sx={{ p: 1 }}>{sectionAccordionSetUpRender()}</Box>
          </Card>
          <Card sx={{ p: 5 }}>
            <Grid container spacing={2} justifyContent="space-between">
              <h1 className={styles.productDetailTitle}>Product Detail View</h1>
            </Grid>

            {/* <Box sx={{ p: 1 }}>{sectionAccordionSetUpRender()}</Box> */}
            <div style={{ width: '100%' }}>
              <div className={styles.prodImg}>
                <img
                  src="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1240&q=80"
                  style={{ width: '100%' }}
                />
              </div>
              <div className={styles.prodDetailsDiv}>
                <h2 className={styles.pimCodeId}>{router.query.PimCodeId}</h2>
                <div className={styles.manufactureDiv}>
                  <div>
                    <h3 className={styles.manufacturerDetailHead}>Manufacturer/Marketer</h3>
                    <h3 className={styles.manufacturerDetailData}>APEX LABORATORIES PVT LTD</h3>
                  </div>
                  <div>
                    <h3 className={styles.manufacturerDetailHead}>Manufacturer/Marketer</h3>
                    <h3 className={styles.manufacturerDetailData}>APEX LABORATORIES PVT LTD</h3>
                  </div>
                  <div>
                    <h3 className={styles.manufacturerDetailHead}>Manufacturer/Marketer</h3>
                    <h3 className={styles.manufacturerDetailData}>APEX LABORATORIES PVT LTD</h3>
                  </div>
                </div>

                <div>
                  <h3 className={styles.manufacturerDetailHead}>Description</h3>
                  <h3 className={styles.manufacturerDetailData}>Give your body a nutritional boost with the multivitamin and multimineral Zincovit Tablet that is specially formulated to support the overall body functioning. The essential vitamins and minerals support the healthy functioning of the heart, nervous system, immune system, etc. It also has Grape Seed extracts that are loaded with antioxidant properties and help in reducing the cell damage caused by free radicals.... READ MORE</h3>
                </div>
              </div>

              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '49%' }}>
                  <h3 className={styles.manufacturerDetailHead}>Medicinal Benfits</h3>
                  <ul>
                    <li>Helps in strengthening immunity system of the body so that it can fight against infections</li>
                    <li>Replenishes the body's needsfor essential vitamins and minerals</li>
                    <li>Good for a speedy recovery after surgery and pregnancy</li>
                    <li>Maintains a healthy metabolism and improves appetite</li>
                    <li>Has a balanced nutrional (vitamins and minerals) dose that helps reduce body fatigue</li>
                  </ul>
                </div>
                <div className={styles.divider}></div>
                <div style={{ width: '49%' }}>
                  <div>
                    <h3 className={styles.manufacturerDetailHead}>Directions for use</h3>
                    <ul>
                      <li>Helps in strengthening immunity system of the body so that it can fight against infections</li>
                      <li>Replenishes the body's needsfor essential vitamins and minerals</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className={styles.manufacturerDetailHead}>Safety Information</h3>
                    <ul>
                      <li>Helps in strengthening immunity system of the body so that it can fight against infections</li>
                      <li>Replenishes the body's needsfor essential vitamins and minerals</li>
                      <li>Good for a speedy recovery after surgery and pregnancy</li>
                      <li>Maintains a healthy metabolism and improves appetite</li>
                      <li>Has a balanced nutrional (vitamins and minerals) dose that helps reduce body fatigue</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <h3 className={styles.manufacturerDetailHead}>Key Ingredients</h3>
                  <h3 className={styles.manufacturerDetailData}>
                    Sugar, Microcrystalline Cellulose (460(i)), Vitamins, Talc (553(iii)), Grape Seed Extract, Calcium Carbonate (170(i)), Stabilizer (468), Minerals, Binders (1401, 1202, 1201), Silicon Dioxide (551), Disodium EDTA, Permitted Symbiotic Food Colour(214), Coating Agents (901, 462). ..... READ MORE</h3>
                </div>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default ProductDetails;
