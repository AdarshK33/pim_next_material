import React, { useEffect, useState } from "react";
import styles from "./productDetails.module.css";

import { AlertTriangle } from "react-feather";

import {
  Grid,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
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

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });

  const dispatch = useDispatch();

  const [showRevalidateAddForm, setShowRevalidateAddForm] = useState(false);
  const [attributeSetIdForm, setAttributeSetId] = useState(false);
  const [commentAPICalled, setCommentAPICalled] = useState(false);

  const [objectId, setObjectId] = useState("");

  const [stateInput, setStateInput] = useState();
  const [checkUpdate, setcheckUpdate] = useState(false);
  const [updateApiCall, setCallApi] = useState(false);

  // console.log(
  //   catalogServiceNewReducer?.productPimCodeData,
  //   "catalogServiceNewReducer?.productPimCodeData"
  // );
  const inputChangeHandler = (e) => {
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

  useEffect(() => {
    if (!catalogServiceNewReducer?.productPimCodeData?.productDetails) {
      return;
    }
    // mapping the master.modelAttributes for input field
    const obj = catalogServiceNewReducer?.productPimCodeData?.productDetails;
    const inputState = new Object();
    Object.entries(obj).map(([key, value]) => {
      value?.attributes.forEach((val) => {
        inputState[val.keyName] = val.value;
      });
    });

    setStateInput(inputState);
  }, [catalogServiceNewReducer?.productPimCodeData]);
  const getInputValue = (keyName) => {
    try {
      return stateInput[keyName];
    } catch (error) {
      return "";
    }
  };

  const AccordionSetUp = (key, value) => {
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
                <Box className={styles.revalidate_Btn}></Box>
              </>
            ) : (
              <></>
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
    return value.map((val, index) => {
      return inputAllMasterRender(val, index);
    });
  };

  const sectionAccordionSetUpRender = () => {
    if (!catalogServiceNewReducer?.productPimCodeData?.productDetails) {
      return;
    }
    const obj = catalogServiceNewReducer?.productPimCodeData?.productDetails;
    return Object.entries(obj).map(([key, value]) => {
      if (key) {
        return AccordionSetUp(key, value);
      }
    });
  };

  const inputAllMasterRender = (sectionItem, index) => {
    return (
      <>
        <Grid md={4} key={index} className={styles.role_based_Text_Field}>
          <TextField
            id="outlined-basic"
            label={sectionItem.displayName}
            variant="outlined"
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
          {/* view */}

          {/* details */}
          <Card sx={{ p: 5 }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Typography variant="h2" className={styles.main_title}>
                Product Details - {router.query.PimCodeId}
              </Typography>
              {role === "ADMIN" && router.query.tab == "Ready-for-review" ? (
                <Button
                  variant="outlined"
                  color="success"
                  component="label"
                  onClick={activateHandler}
                  disabled={
                    authorities?.ACTIVE_PRODUCTS == "r"
                      ? true
                      : commentAPICalled
                  }
                >
                  Activate
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
                  </Button>
                </>
              ) : (
                <></>
              )}
            </Grid>

            <Box sx={{ p: 1 }}>{sectionAccordionSetUpRender()}</Box>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default React.memo(ProductDetails);

