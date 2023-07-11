import React, { useEffect, useState } from "react";
import styles from "../activeProducts.module.css";
import { StopCircle, Eye } from "react-feather";
import Image from "next/image";

import benefits from "../../../../../assets/icons/benefit.svg";
import honey from "../../../../../assets/icons/honey.svg";
import instructions from "../../../../../assets/icons/instructions.svg";
import protection from "../../../../../assets/icons/protection.svg";
import ThumbnailSlider from "./imageView";
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
  InputLabel,
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
  const [manufaturererNameDetails, setManufaturererNameDetails] = useState();
  const [descriptionDetails, setDescription] = useState();

  const [directionForUse, setDirectionForUse] = useState();

  const [keyBenefits, setKeyBenefits] = useState();


  const [keyIngredient, setKeyIngredient] = useState();
  const [stateImageDetails, setImageDetails] = useState();
  const [stateSafety_InformationDetails, setSafety_InformationDetails] = useState();




  const [checkUpdate, setcheckUpdate] = useState(false);
  const [updateApiCall, setCallApi] = useState(false);

  useEffect(() => {
    dispatch(productDetailsApi(router.query.PimCodeId));
  }, []);

  console.log(productPimCodeData, "hello productPimCodeData");
  console.log(stateImageDetails, "hello stateImageDetails");

  // console.log(stateDetails, "hello stateDetails");

  useEffect(() => {
    if (
      !productPimCodeData?.productDetails &&
      !productPimCodeData?.mediaDetails
    ) {
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

    const images = productPimCodeData?.mediaDetails.map((item) => ({
      original: item.completeUrl,
      thumbnail: item.completeUrl,
    }));

    setStateInput(inputState);
    setImageDetails(images);
  }, [productPimCodeData]);

  useEffect(() => {
    if (!productPimCodeData?.productDetails) {
      return;
    }
    // mapping the master.modelAttributes for input field
    const obj = productPimCodeData?.productDetails;





    const inputDescription = [];
    const inputBenefits = [];
    const inputDirectionForUse = [];
    const inputManufacturerName = [];
    const inputSafety_InformationState = [];
    const inputKeyIngredient = [];

    Object.entries(obj).map(([key, value]) => {
      // console.log(value, "kkkkkkkkkkkkkkkk");
      if (value.attributeSet == "AX MASTER") {
        value?.attributes.forEach((val) => {
          if (val.keyName == "MANUFACTURER NAME") {
            inputManufacturerName.push(val.value);
          }
        });
      }
      if (value.attributeSet === "ONLINEMASTER") {
        value?.attributes.forEach((val) => {
          if (val.keyName === "Product Information") {
            const Description = val.value.replace(/;p/g, "").replace(/;/g, "").replace("/p", ".")
            inputDescription.push(Description);
          }
        });
      }
      if (value.attributeSet == "ONLINEMASTER") {
        value?.attributes.forEach((val) => {
          if (val.keyName == "Key Benefits/Uses") {

            const Benefits = val.value.split(";;;");

            const filteredItems = Benefits
              .filter((item) => item !== ";ul" && item !== ";/;;")
              .map((item) => item.replace(/\/$/, '')
                .replace(/\/;;$/, '')
                .replace(/;/g, '.')
              );
            // console.log(filteredItems, "filteredItems");
            inputBenefits.push(filteredItems);

          }
        });
      }
      if (value.attributeSet == "ONLINEMASTER") {
        value?.attributes.forEach((val) => {
          if (val.keyName == "Direction for use/Dosage") {
            const Direction = val.value.split(";;;");

            const filteredItems = Direction
              .filter((item) => item !== ";ul" && item !== ";/;;")
              .map((item) => item.replace(/\/$/, '')
                .replace(/\/;;$/, '')
                .replace(/;/g, '.')
              );
            // console.log(filteredItems, "filteredItems");

            inputDirectionForUse.push(filteredItems);
          }
        });
      }
      if (value.attributeSet == "ONLINEMASTER") {
        value?.attributes.forEach((val) => {
          if (val.keyName == "Safety Information") {
            const Safety_Information = val.value.split(";;;");

            const filteredItems = Safety_Information
              .filter((item) => item !== ";ul" && item !== ";/;;")
              .map((item) => item.replace(/\/$/, '')
                .replace(/\/;;$/, '')
                .replace(/;/g, '.')
              );
            // console.log(filteredItems, "filteredItems");

            inputSafety_InformationState.push(filteredItems);
          }
        });
      }
      if (value.attributeSet == "ONLINEMASTER") {
        value?.attributes.forEach((val) => {
          if (val.keyName == "Key Ingredient") {
            inputKeyIngredient.push(val.value);
          }
        });
      }
    });

    setManufaturererNameDetails(inputManufacturerName);
    setDescription(inputDescription);
    setKeyBenefits(inputBenefits);
    setDirectionForUse(inputDirectionForUse);
    setKeyIngredient(inputKeyIngredient);
    setSafety_InformationDetails(inputSafety_InformationState);

  }, [productPimCodeData]);

  // useEffect(() => {
  //   if (!productPimCodeData?.mediaDetails) {
  //     return;

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

  // const inputAllMasterRender = (sectionItem, index) => {
  //   return (
  //     <>
  //       <Grid md={4} key={index} className={styles.role_based_Text_Field}>

  //         <>
  //           <InputLabel htmlFor="outlined-basic"

  //             style={{

  //               fontSize: '.75rem',


  //             }}
  //           >{sectionItem.displayName}</InputLabel>

  //           <TextField
  //             className={styles.input_active_master}
  //             style={{
  //               cursor: 'pointer'
  //             }}
  //             id="outlined-basic"
  //             variant="standard"
  //             name={sectionItem.keyName}
  //             value={getInputValue(sectionItem.keyName)?.trim() || "---"}
  //             InputProps={{ disableUnderline: true, readOnly: true }}
  //           // onChange={inputChangeHandler}
  //           // disabled={sectionItem.accessRole !== role ? true : false}
  //           />

  //           {/* <div
  //             style={{
  //               cursor: 'pointer',
  //               // border: '1px solid #ccc',
  //               // borderRadius: '4px',
  //               // padding: '8px',
  //               //backgroundColor: '#f9f9f9',
  //               // textAlign: 'center',
  //               overflow: 'hidden',
  //               textOverflow: 'ellipsis',
  //               whiteSpace: 'nowrap',
  //               width: "330px"
  //             }}
  //           >
  //             {getInputValue(sectionItem.keyName).trim() || '---'}
  //           </div> */}
  //         </>
  //       </Grid >




  //     </>
  //   );
  // };

  const inputAllMasterRender = (sectionItem, index) => {
    const inputValue = getInputValue(sectionItem.keyName)?.trim();

    if (!inputValue) {
      return null; // Don't render anything if the value is empty
    }

    return (
      <>
        <Grid md={4} key={index} className={styles.role_based_Text_Field}>
          <InputLabel htmlFor="outlined-basic" style={{ fontSize: '.75rem' }}>
            {sectionItem.displayName}
          </InputLabel>
          <TextField
            className={styles.input_active_master}
            style={{ cursor: 'pointer' }}
            id="outlined-basic"
            variant="standard"
            name={sectionItem.keyName}
            value={inputValue}
            InputProps={{ disableUnderline: true, readOnly: true }}
          />
        </Grid >
      </>
    );
  };
  const images = [
    {
      original:
        "https://ri-brands-pim.s3.ap-south-1.amazonaws.com/sync/OMEZ01/logo_2_2022%20%281%29-1686159756837-.jpg",
      thumbnail:
        "https://ri-brands-pim.s3.ap-south-1.amazonaws.com/sync/OMEZ01/logo_2_2022%20%281%29-1686159756837-.jpg",
    },
  ];

  return (
    <>
      <Grid container>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          {/* view */}

          <Card sx={{ p: 5 }}>
            <Box>
              <Grid container spacing={2} justifyContent="space-between">
                {/* <h1 className={styles.productDetailTitle}>
                  {router.query.PimCodeId}
                </h1> */}
              </Grid>

              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    {stateImageDetails && stateImageDetails.length ? (
                      <ThumbnailSlider images={stateImageDetails} />
                    ) : (
                      <>
                        <ThumbnailSlider images={images} />
                      </>
                    )}
                  </Grid>
                  <Grid item xs={8}>
                    <h2 className={styles.pimCodeId}>
                      {router.query.ActiveProduct}
                    </h2>
                    <Box>
                      <Box>
                        <h3 className={styles.manufacturerDetailHead}>
                          Manufacturer/Marketer
                        </h3>
                        <h3 className={styles.manufacturerDetailData}>
                          {manufaturererNameDetails}
                        </h3>
                      </Box>

                      <Box>
                        <h3 className={styles.manufacturerDetailHead}>
                          Contry Of Origin
                        </h3>
                        <h3 className={styles.manufacturerDetailData}>
                          INDIA
                        </h3>
                      </Box>
                      {/* <Box>
                        <h3 className={styles.manufacturerDetailHead}>
                          Manufacturer/Marketer Address
                        </h3>
                        <h3 className={styles.manufacturerDetailData}>
                          {}
                        </h3>
                      </Box> */}
                    </Box>
                    {keyBenefits &&
                      keyBenefits !== null &&
                      keyBenefits !== undefined &&
                      keyBenefits.length !== 0 &&

                      <Box>
                        <h3 className={styles.manufacturerDetailHead}>
                          Description
                        </h3>
                        <h3 className={styles.manufacturerDetailData}>
                          {descriptionDetails}

                          {/* <a className={styles.read_more_href}>READ MORE</a> */}
                        </h3>
                      </Box>
                    }
                  </Grid>
                </Grid>
                {keyBenefits &&
                  keyBenefits !== null &&
                  keyBenefits !== undefined &&
                  keyBenefits.length !== 0 &&
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
                            Key Uses/ Benefits
                          </Typography>
                        </Box>



                        <List>
                          {
                            keyBenefits &&
                            keyBenefits !== null &&
                            keyBenefits !== undefined &&
                            keyBenefits.length !== 0
                            && keyBenefits[0].map((item, index) => (
                              <ListItem key={index}>
                                <ListItemIcon key={index}>
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
                                  {item}
                                </ListItemText>
                              </ListItem>
                            ))

                          }



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


                          {
                            directionForUse &&
                            directionForUse !== null &&
                            directionForUse !== undefined &&
                            directionForUse.length !== 0

                            && directionForUse[0].map((item, index) => (
                              <ListItem key={index}>
                                <ListItemIcon key={index}>
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
                                  {item}
                                </ListItemText>
                              </ListItem>
                            ))

                          }

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
                          {
                            stateSafety_InformationDetails &&
                            stateSafety_InformationDetails !== null &&
                            stateSafety_InformationDetails !== undefined &&
                            stateSafety_InformationDetails.length !== 0

                            && stateSafety_InformationDetails[0].map((item, index) => (
                              <ListItem key={index}>
                                <ListItemIcon key={index}>
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
                                  {item}
                                </ListItemText>
                              </ListItem>
                            ))

                          }
                        </List>
                      </Box>
                    </Box>
                  </Box>
                }
                {keyBenefits &&
                  keyBenefits !== null &&
                  keyBenefits !== undefined &&
                  keyBenefits.length !== 0 &&
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
                        {keyIngredient}
                        {/* ..... <a className={styles.read_more_href}>READ MORE</a> */}
                      </h3>
                    </Box>
                  </Box>
                }
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


export default React.memo(ProductViewDetails);

