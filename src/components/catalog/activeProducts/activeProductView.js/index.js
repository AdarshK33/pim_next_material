import React, { useEffect, useState } from "react";
import styles from "../activeProducts.module.css";
import { StopCircle, Eye } from "react-feather";
import Image from "next/image";

import benefits from "../../../../../assets/icons/benefit.svg";
import honey from "../../../../../assets/icons/honey.svg";
import instructions from "../../../../../assets/icons/instructions.svg";
import protection from "../../../../../assets/icons/protection.svg";

import {
  Grid,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CustomModal from "../../../../common/customModal";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import {
  productDetailsApi,
  statusChangedApis,
  productUpdateApis,
} from "../../../../../redux/actions/catalogServiceNew";
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
const ProductViewDetails = (props) => {
  const { user: { role = "" } = {}, loggedIn } = props.user;
  const { productPimCodeData } = useSelector((state) => {
    return state.catalogServiceNewReducer;
  });
  const { authorities } = useSelector((state) => {
    return state.loginReducer;
  });

  const router = useRouter();

  const dispatch = useDispatch();

  const [showRevalidateAddForm, setShowRevalidateAddForm] = useState(false);
  const [attributeSetIdForm, setAttributeSetId] = useState(false);
  const [commentAPICalled, setCommentAPICalled] = useState(false);
  const [value, setValue] = React.useState(0);

  const [objectId, setObjectId] = useState("");

  const [stateInput, setStateInput] = useState();
  const [stateAxDetails, setAXStateDetails] = useState();
  const [stateKeyDetails, setKeyStateDetails] = useState();

  const [stateHiDetails, setHiStateDetails] = useState();

  const [stateRdDetails, setRdStateDetails] = useState();

  const [stateOnDetails, setOnStateDetails] = useState();

  const [checkUpdate, setcheckUpdate] = useState(false);
  const [updateApiCall, setCallApi] = useState(false);

  useEffect(() => {
    dispatch(productDetailsApi(router.query.PimCodeId));
  }, []);

  console.log(productPimCodeData, "hello productPimCodeData");
  console.log(stateAxDetails, "hello stateAxDetails");

  // console.log(stateDetails, "hello stateDetails");

  useEffect(() => {
    if (!productPimCodeData?.productDetails) {
      return;
    }
    // mapping the master.modelAttributes for input field
    const obj = productPimCodeData?.productDetails;
    const inputState = new Object();
    Object.entries(obj).map(([key, value]) => {
      value?.attributes.forEach((val) => {
        inputState[val.keyName] = val.value;
      });
    });

    setStateInput(inputState);
  }, [productPimCodeData]);

  useEffect(() => {
    if (!productPimCodeData?.productDetails) {
      return;
    }
    // mapping the master.modelAttributes for input field
    const obj = productPimCodeData?.productDetails;
    const inputAxState = [];
    const inputKeyState = [];
    const inputRdState = [];
    const inputHiState = [];
    const inputOnState = [];

    Object.entries(obj).map(([key, value]) => {
      // console.log(value, "kkkkkkkkkkkkkkkk");
      if (value.attributeSet == "AX MASTER") {
        value?.attributes.forEach((val) => {
          if (val.keyName == "MANUFACTURER NAME") {
            inputAxState.push(val.value);
          }
        });
      }
      if (value.attributeSet == "KEYMEDMASTER") {
        value?.attributes.forEach((val) => {
          if (val.keyName == "ITEM ID") {
            inputKeyState.push(val.value);
          }
        });
      }
      if (value.attributeSet == "R_DRUGS") {
        value?.attributes.forEach((val) => {
          if (val.keyName == "COMPOSITION") {
            inputRdState.push(val.value);
          }
        });
      }
      if (value.attributeSet == "HIPAR") {
        value?.attributes.forEach((val) => {
          if (val.keyName == "ITEM ID") {
            inputHiState.push(val.value);
          }
        });
      }
      if (value.attributeSet == "ONLINEMASTER") {
        value?.attributes.forEach((val) => {
          if (val.keyName == "status") {
            inputOnState.push(val.value);
          }
        });
      }
    });

    setAXStateDetails(inputAxState);
    setKeyStateDetails(inputKeyState);
    setRdStateDetails(inputRdState);
    setHiStateDetails(inputHiState);
    setOnStateDetails(inputOnState);
  }, [productPimCodeData]);

  // useEffect(() => {
  //   const str = "i have learned something new today";

  //   //split the above string into an array of strings
  //   //whenever a blank space is encountered

  //   const arr = str.split(" ");

  //   //loop through each element of the array and capitalize the first letter.

  //   for (var i = 0; i < arr.length; i++) {
  //     arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  //   }

  //   console.log("aaaaaaaaaaaaaaaa", arr);
  // }, [productPimCodeData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue, "newValue");
  };

  const inputChangeHandler = (e) => {
    setStateInput({
      ...stateInput,
      [e.target.name]: e.target.value,
    });
    setcheckUpdate(true);
  };

  const getInputValue = (keyName) => {
    try {
      return stateInput[keyName];
    } catch (error) {
      return "";
    }
  };

  const sectionAllMasterRender = (value) => {
    if (!value) {
      return;
    }
    return value.map((val, index) => {
      return inputAllMasterRender(val, index);
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
            // onChange={inputChangeHandler}
            disabled={sectionItem.accessRole !== role ? true : false}
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
          {/* view */}

          <Card sx={{ p: 5 }}>
            <Box>
              <Grid container spacing={2} justifyContent="space-between">
                <h1 className={styles.productDetailTitle}>
                  {router.query.PimCodeId}
                </h1>
              </Grid>

              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    {/* <img
                    src="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1240&q=80"
                    style={{ width: "100%" }}
                  /> */}
                    <Image
                      className="px-2 "
                      src="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1240&q=80"
                      alt="A description of the image"
                      width={200}
                      height={150}
                      //onClick={() => handleEdit(row.itemId)}
                      // onClick={() => setShowUserUpdateForm(true)}
                    />
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <Box>
                          <Image
                            className="px-2 "
                            src="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1240&q=80"
                            alt="A description of the image"
                            width={100}
                            height={100}
                            //onClick={() => handleEdit(row.itemId)}
                            // onClick={() => setShowUserUpdateForm(true)}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={3}>
                        <Box>
                          <Image
                            className="px-2 "
                            src="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1240&q=80"
                            alt="A description of the image"
                            width={100}
                            height={100}
                            //onClick={() => handleEdit(row.itemId)}
                            // onClick={() => setShowUserUpdateForm(true)}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={3}>
                        <Box>
                          <Image
                            className="px-2 "
                            src="https://ri-brands-pim.s3.ap-south-1.amazonaws.com/sync/OMEZ01/dsx%20cszzc-1685516684125-.png"
                            alt="A description of the image"
                            width={100}
                            height={100}
                            //onClick={() => handleEdit(row.itemId)}
                            // onClick={() => setShowUserUpdateForm(true)}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={9}>
                    {/* <h2 className={styles.pimCodeId}>
                      {router.query.PimCodeId}
                    </h2> */}
                    <Box>
                      <Box>
                        <h3 className={styles.manufacturerDetailHead}>
                          Manufacturer/Marketer
                        </h3>
                        <h3 className={styles.manufacturerDetailData}>
                          {stateAxDetails}
                        </h3>
                      </Box>

                      <Box>
                        <h3 className={styles.manufacturerDetailHead}>
                          Contry Of Origin
                        </h3>
                        <h3 className={styles.manufacturerDetailData}>
                          APEX LABORATORIES PVT LTD
                        </h3>
                      </Box>
                      <Box>
                        <h3 className={styles.manufacturerDetailHead}>
                          Manufacturer/Marketer Address
                        </h3>
                        <h3 className={styles.manufacturerDetailData}>
                          {stateOnDetails}
                        </h3>
                      </Box>
                    </Box>

                    <Box>
                      <h3 className={styles.manufacturerDetailHead}>
                        Description
                      </h3>
                      <h3 className={styles.manufacturerDetailData}>
                        Give your body a nutritional boost with the multivitamin
                        and multimineral Zincovit Tablet that is specially
                        formulated to support the overall body functioning. The
                        essential vitamins and minerals support the healthy
                        functioning of the heart, nervous system, immune system,
                        etc. It also has Grape Seed extracts that are loaded
                        with antioxidant properties and help in reducing the
                        cell damage caused by free radicals....
                        <a className={styles.read_more_href}>READ MORE</a>
                      </h3>
                    </Box>
                  </Grid>
                </Grid>
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box style={{ width: "49%", marginTop: "15px" }}>
                    <Box className={styles.right_box_details}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Image
                          className="px-2 "
                          src={benefits}
                          alt="lens"
                          width={30}
                          height={30}
                        />
                        <Typography
                          variant="h3"
                          className={styles.manufacturerDetailHead}
                        >
                          Medicinal Benefits
                        </Typography>
                      </Box>

                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <StopCircle
                              style={{
                                textAlign: "right",
                                fontSize: "xx-small",
                                color: "Black ",
                                padding: "8px",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText>
                            Helps in strengthening immunity system of the body
                            so that it can fight against infections
                          </ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <StopCircle
                              style={{
                                textAlign: "right",
                                fontSize: "xx-small",
                                color: "Black ",
                                padding: "8px",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText>
                            Good for a speedy recovery after surgery and
                            pregnancy
                          </ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <StopCircle
                              style={{
                                textAlign: "right",
                                fontSize: "xx-small",
                                color: "Black ",
                                padding: "8px",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText>
                            Maintains a healthy metabolism and improves appetite
                          </ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <StopCircle
                              style={{
                                textAlign: "right",
                                fontSize: "xx-small",
                                color: "Black ",
                                padding: "8px",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText>
                            Has a balanced nutrional (vitamins and minerals)
                            dose that helps reduce body fatigue
                          </ListItemText>
                        </ListItem>
                      </List>
                    </Box>
                  </Box>
                  <Box className={styles.divider}></Box>
                  <Box style={{ width: "49%", marginTop: "15px" }}>
                    <Box className={styles.right_box_details}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Image
                          className="px-2 "
                          src={instructions}
                          alt="lens"
                          width={30}
                          height={30}
                        />
                        <Typography
                          variant="h3"
                          className={styles.manufacturerDetailHead}
                        >
                          Directions for use
                        </Typography>
                      </Box>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <StopCircle
                              style={{
                                textAlign: "right",
                                fontSize: "xx-small",
                                color: "Black ",
                                padding: "8px",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText>
                            Helps in strengthening immunity system of the body
                            so that it can fight against infections
                          </ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <StopCircle
                              style={{
                                textAlign: "right",
                                fontSize: "xx-small",
                                color: "Black ",
                                padding: "8px",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText>
                            Replenishes the body's needs for essential vitamins
                            and minerals
                          </ListItemText>
                        </ListItem>
                      </List>
                    </Box>

                    <Box className={styles.right_box_details}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Image
                          className="px-2 "
                          src={protection}
                          alt="lens"
                          width={30}
                          height={30}
                        />
                        <Typography
                          variant="h3"
                          className={styles.manufacturerDetailHead}
                        >
                          Safety Information
                        </Typography>
                      </Box>

                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <StopCircle
                              style={{
                                textAlign: "right",
                                fontSize: "xx-small",
                                color: "Black ",
                                padding: "8px",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText>{stateRdDetails}</ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <StopCircle
                              style={{
                                textAlign: "right",
                                fontSize: "xx-small",
                                color: "Black ",
                                padding: "8px",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText>
                            Helps in strengthening immunity system of the body
                            so that it can fight against infections
                          </ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <StopCircle
                              style={{
                                textAlign: "right",
                                fontSize: "xx-small",
                                color: "Black ",
                                padding: "8px",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText>
                            Replenishes the body's needs for essential vitamins
                            and minerals
                          </ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <StopCircle
                              style={{
                                textAlign: "right",
                                fontSize: "xx-small",
                                color: "Black ",
                                padding: "8px",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText>
                            Good for a speedy recovery after surgery and
                            pregnancy
                          </ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <StopCircle
                              style={{
                                textAlign: "right",
                                fontSize: "xx-small",
                                color: "Black ",
                                padding: "8px",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText>
                            Maintains a healthy metabolism and improves appetite
                          </ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <StopCircle
                              style={{
                                textAlign: "right",
                                fontSize: "xx-small",
                                color: "Black ",
                                padding: "8px",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText>
                            Has a balanced nutritional (vitamins and minerals)
                            dose that helps reduce body fatigue
                          </ListItemText>
                        </ListItem>
                      </List>
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Image
                        className="px-2 "
                        src={honey}
                        alt="lens"
                        width={30}
                        height={30}
                      />
                      <Typography
                        variant="h3"
                        className={styles.manufacturerDetailHead}
                      >
                        Key Ingredients
                      </Typography>
                    </Box>
                    <h3 className={styles.manufacturerDetailData}>
                      Sugar, Microcrystalline Cellulose (460(i)), Vitamins, Talc
                      (553(iii)), Grape Seed Extract, Calcium Carbonate
                      (170(i)), Stabilizer (468), Minerals, Binders (1401, 1202,
                      1201), Silicon Dioxide (551), Disodium EDTA, Permitted
                      Symbiotic Food Colour(214), Coating Agents (901, 462).
                      ..... <a className={styles.read_more_href}>READ MORE</a>
                    </h3>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* details */}

            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    {productPimCodeData?.productDetails !== null &&
                      productPimCodeData?.productDetails !== undefined &&
                      Object.keys(productPimCodeData?.productDetails).length &&
                      productPimCodeData?.productDetails.map((tab, index) => (
                        <Tab
                          label={
                            tab?.attributeSet?.charAt(0).toUpperCase() +
                            tab?.attributeSet.slice(1).toLowerCase()
                          }
                          value={index}
                          key={index}
                          className={styles.tab_active_master}
                        />
                      ))}

                    {/* <Tab label="Item One" value="1" /> */}
                    {/* <Tab label="Item Two" value="2" />
                    <Tab label="Item Three" value="3" /> */}
                  </TabList>
                </Box>
                {productPimCodeData?.productDetails !== null &&
                  productPimCodeData?.productDetails !== undefined &&
                  Object.keys(productPimCodeData?.productDetails).length &&
                  productPimCodeData?.productDetails.map((item, i) => (
                    <TabPanel value={i}>
                      <Grid container>
                        {sectionAllMasterRender(item.attributes)}
                      </Grid>
                    </TabPanel>
                  ))}
              </TabContext>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default ProductViewDetails;
