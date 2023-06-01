import React, { useEffect, useState } from "react";
import styles from "../activeProducts.module.css";

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
import CustomModal from "../../../../common/customModal";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import AddFormRevalidate from "./AddFormRevalidate";
// import AddFormComment from "./AddFormComment";

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
  const [value, setValue] = React.useState("1");

  const [objectId, setObjectId] = useState("");

  const [stateInput, setStateInput] = useState();
  const [checkUpdate, setcheckUpdate] = useState(false);
  const [updateApiCall, setCallApi] = useState(false);

  useEffect(() => {
    dispatch(productDetailsApi(router.query.PimCodeId));
  }, []);

  console.log(productPimCodeData, "hello productPimCodeData");
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
                  {router.query.ActiveProduct?.length > 0
                    ? `Active Products - ${router.query.PimCodeId}`
                    : `Product Details - ${router.query.PimCodeId}`}
                </h1>
              </Grid>

              <div style={{ width: "100%" }}>
                <div className={styles.prodImg}>
                  <img
                    src="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1240&q=80"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className={styles.prodDetailsDiv}>
                  <h2 className={styles.pimCodeId}>{router.query.PimCodeId}</h2>
                  <div className={styles.manufactureDiv}>
                    <div>
                      <h3 className={styles.manufacturerDetailHead}>
                        Manufacturer/Marketer
                      </h3>
                      <h3 className={styles.manufacturerDetailData}>
                        APEX LABORATORIES PVT LTD
                      </h3>
                    </div>
                    <div>
                      <h3 className={styles.manufacturerDetailHead}>
                        Manufacturer/Marketer
                      </h3>
                      <h3 className={styles.manufacturerDetailData}>
                        APEX LABORATORIES PVT LTD
                      </h3>
                    </div>
                    <div>
                      <h3 className={styles.manufacturerDetailHead}>
                        Manufacturer/Marketer
                      </h3>
                      <h3 className={styles.manufacturerDetailData}>
                        APEX LABORATORIES PVT LTD
                      </h3>
                    </div>
                  </div>

                  <div>
                    <h3 className={styles.manufacturerDetailHead}>
                      Description
                    </h3>
                    <h3 className={styles.manufacturerDetailData}>
                      Give your body a nutritional boost with the multivitamin
                      and multimineral Zincovit Tablet that is specially
                      formulated to support the overall body functioning. The
                      essential vitamins and minerals support the healthy
                      functioning of the heart, nervous system, immune system,
                      etc. It also has Grape Seed extracts that are loaded with
                      antioxidant properties and help in reducing the cell
                      damage caused by free radicals.... READ MORE
                    </h3>
                  </div>
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ width: "49%" }}>
                    <h3 className={styles.manufacturerDetailHead}>
                      Medicinal Benfits
                    </h3>
                    <ul>
                      <li>
                        Helps in strengthening immunity system of the body so
                        that it can fight against infections
                      </li>
                      <li>
                        Replenishes the body's needsfor essential vitamins and
                        minerals
                      </li>
                      <li>
                        Good for a speedy recovery after surgery and pregnancy
                      </li>
                      <li>
                        Maintains a healthy metabolism and improves appetite
                      </li>
                      <li>
                        Has a balanced nutrional (vitamins and minerals) dose
                        that helps reduce body fatigue
                      </li>
                    </ul>
                  </div>
                  <div className={styles.divider}></div>
                  <div style={{ width: "49%" }}>
                    <div>
                      <h3 className={styles.manufacturerDetailHead}>
                        Directions for use
                      </h3>
                      <ul>
                        <li>
                          Helps in strengthening immunity system of the body so
                          that it can fight against infections
                        </li>
                        <li>
                          Replenishes the body's needsfor essential vitamins and
                          minerals
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className={styles.manufacturerDetailHead}>
                        Safety Information
                      </h3>
                      <ul>
                        <li>
                          Helps in strengthening immunity system of the body so
                          that it can fight against infections
                        </li>
                        <li>
                          Replenishes the body's needsfor essential vitamins and
                          minerals
                        </li>
                        <li>
                          Good for a speedy recovery after surgery and pregnancy
                        </li>
                        <li>
                          Maintains a healthy metabolism and improves appetite
                        </li>
                        <li>
                          Has a balanced nutrional (vitamins and minerals) dose
                          that helps reduce body fatigue
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <div>
                    <h3 className={styles.manufacturerDetailHead}>
                      Key Ingredients
                    </h3>
                    <h3 className={styles.manufacturerDetailData}>
                      Sugar, Microcrystalline Cellulose (460(i)), Vitamins, Talc
                      (553(iii)), Grape Seed Extract, Calcium Carbonate
                      (170(i)), Stabilizer (468), Minerals, Binders (1401, 1202,
                      1201), Silicon Dioxide (551), Disodium EDTA, Permitted
                      Symbiotic Food Colour(214), Coating Agents (901, 462).
                      ..... READ MORE
                    </h3>
                  </div>
                </div>
              </div>
            </Box>

            {/* details */}

            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    {productPimCodeData?.productDetails.map((tab, index) => (
                      <Tab label={tab.attributeSet} value="1" key={index} />
                    ))}
                    {/* <Tab label="Item One" value="1" />
                    <Tab label="Item Two" value="2" />
                    <Tab label="Item Three" value="3" />
                    <Tab label="Item four" value="4" />
                    <Tab label="Item five" value="5" /> */}
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Grid container>
                    <Grid
                      md={4}
                      key={"12223"}
                      className={styles.role_based_Text_Field}
                    >
                      <TextField
                        id="outlined-basic"
                        label={"sectionItem.displayName"}
                        variant="outlined"
                        // name={sectionItem.keyName}
                        // value={getInputValue(sectionItem.keyName)}
                        // onChange={inputChangeHandler}
                        // disabled={sectionItem.accessRole !== role ? true : false}
                      />
                    </Grid>
                    <Grid
                      md={4}
                      key={"12223"}
                      className={styles.role_based_Text_Field}
                    >
                      <TextField
                        id="outlined-basic"
                        label={"sectionItem.displayName"}
                        variant="outlined"
                        // name={sectionItem.keyName}
                        // value={getInputValue(sectionItem.keyName)}
                        // onChange={inputChangeHandler}
                        // disabled={sectionItem.accessRole !== role ? true : false}
                      />
                    </Grid>
                    <Grid
                      md={4}
                      key={"12223"}
                      className={styles.role_based_Text_Field}
                    >
                      <TextField
                        id="outlined-basic"
                        label={"sectionItem.displayName"}
                        variant="outlined"
                        // name={sectionItem.keyName}
                        // value={getInputValue(sectionItem.keyName)}
                        // onChange={inputChangeHandler}
                        // disabled={sectionItem.accessRole !== role ? true : false}
                      />
                    </Grid>
                    <Grid
                      md={4}
                      key={"12223"}
                      className={styles.role_based_Text_Field}
                    >
                      <TextField
                        id="outlined-basic"
                        label={"sectionItem.displayName"}
                        variant="outlined"
                        // name={sectionItem.keyName}
                        // value={getInputValue(sectionItem.keyName)}
                        // onChange={inputChangeHandler}
                        // disabled={sectionItem.accessRole !== role ? true : false}
                      />
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value="2">
                  <Grid container>
                    <Grid
                      md={4}
                      key={"12223"}
                      className={styles.role_based_Text_Field}
                    >
                      <TextField
                        id="outlined-basic"
                        label={"sectionItem.displayName"}
                        variant="outlined"
                        // name={sectionItem.keyName}
                        // value={getInputValue(sectionItem.keyName)}
                        // onChange={inputChangeHandler}
                        // disabled={sectionItem.accessRole !== role ? true : false}
                      />
                    </Grid>
                    <Grid
                      md={4}
                      key={"12223"}
                      className={styles.role_based_Text_Field}
                    >
                      <TextField
                        id="outlined-basic"
                        label={"sectionItem.displayName"}
                        variant="outlined"
                        // name={sectionItem.keyName}
                        // value={getInputValue(sectionItem.keyName)}
                        // onChange={inputChangeHandler}
                        // disabled={sectionItem.accessRole !== role ? true : false}
                      />
                    </Grid>
                    <Grid
                      md={4}
                      key={"12223"}
                      className={styles.role_based_Text_Field}
                    >
                      <TextField
                        id="outlined-basic"
                        label={"sectionItem.displayName"}
                        variant="outlined"
                        // name={sectionItem.keyName}
                        // value={getInputValue(sectionItem.keyName)}
                        // onChange={inputChangeHandler}
                        // disabled={sectionItem.accessRole !== role ? true : false}
                      />
                    </Grid>
                    <Grid
                      md={4}
                      key={"12223"}
                      className={styles.role_based_Text_Field}
                    >
                      <TextField
                        id="outlined-basic"
                        label={"sectionItem.displayName"}
                        variant="outlined"
                        // name={sectionItem.keyName}
                        // value={getInputValue(sectionItem.keyName)}
                        // onChange={inputChangeHandler}
                        // disabled={sectionItem.accessRole !== role ? true : false}
                      />
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
                <TabPanel value="1">Item One</TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
                <TabPanel value="1">Item One</TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
                <TabPanel value="1">Item One</TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
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
