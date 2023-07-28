
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { StopCircle, Eye } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
    productDetailsApi,
    statusChangedApis,
    productUpdateApis,
} from "../../../../../redux/actions/catalogServiceNew";
import {
    Grid,
    Button,
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    List,
    Strong,
    ListItem,
    ListItemText,
    InputLabel,
    ListItemIcon,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import styles from "./view.module.css";
// import protection from "../../../../../assets/icons/protection.svg";

import manufature from "../../../../../assets/icons/manufature.svg";
import compotion from "../../../../../assets/icons/compotion.svg";
import consume from "../../../../../assets/icons/consume.svg";
import amazon from "../../../../../assets/icons/amazon.svg";
import bhel from "../../../../../assets/icons/bhel.svg";
import apollo from "../../../../../assets/icons/logo_2_2022.svg";
import iconpills from "../../../../../assets/icons/iconpills.svg";
import iconfill from "../../../../../assets/icons/iconfill.svg";
import beingsick from "../../../../../assets/icons/beingsick.svg";


import prescription from "../../../../../assets/icons/prescription.svg";
import CombinedImageDisplay from "./zoom";
import { useRouter } from "next/router";



const ActiveProductView = (user) => {
    const { productPimCodeData } = useSelector((state) => {
        return state.catalogServiceNewReducer;
    });
    const { authorities } = useSelector((state) => {
        return state.loginReducer;
    });

    // var he = require('he');

    const router = useRouter();

    const dispatch = useDispatch();

    const [value, setValue] = React.useState("1");
    const [attributeValue, setAttributeValue] = React.useState(0);

    const [stateInput, setStateInput] = useState();
    const [manufaturererNameDetails, setManufaturererNameDetails] = useState();
    const [consumeType, setConsumeType] = useState();

    const [descriptionDetails, setDescription] = useState();

    const [directionForUse, setDirectionForUse] = useState();

    const [keyBenefits, setKeyBenefits] = useState();
    const [hiperUsesData, setHiperUsesData] = useState();
    const [onlineUsesData, setOnlineUsesData] = useState();


    console.log(keyBenefits, "keyBenefits")


    const [hiperDirectionOfUse, setHiperDirectionOfUse] = useState();

    console.log(hiperDirectionOfUse, "hiperDirectionOfUse")




    const [keyIngredient, setKeyIngredient] = useState();
    const [stateImageDetails, setImageDetails] = useState();
    const [stateSafety_InformationDetails, setSafety_InformationDetails] = useState();
    const [is_prescription_required, set_Is_Prescription_Required] = useState();
    const [hiparSideEffets, setHiparSideEffets] = useState();
    const [hiparDrugsWarning, setHiparDrugsWarning] = useState();
    const [hiparPatientCounselling, setHiparPatientCounselling] = useState();
    const [hiparStorageData, setHiparStorage] = useState();





    console.log(stateSafety_InformationDetails, "stateSafety_InformationDetails")




    console.log(productPimCodeData, "hello productPimCodeData");
    console.log(stateImageDetails, "hello stateImageDetails");

    const handleChange = (event, newValue) => {
        //tab
        setValue(newValue);
    };
    const handleChangeAttribute = (event, newValue) => {
        //tab
        setAttributeValue(newValue);
    };


    const StyledTab = styled(Tab)(({ theme }) => ({
        position: 'relative',
        color: theme.palette.primary.black,
        fontWeight: 700,
        border: `2px solid ${theme.palette.divider}`, // Bottom border for the tab
        borderBottom: `1px solid black`,
        '&.Mui-selected': {
            color: theme.palette.primary.main,
            borderBottom: `0px solid white`,
        },
        '&.Mui-selected::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            border: `0px solid ${theme.palette.primary.main}`, // Top border for the selected tab
        },
        '&.Mui-selected::after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            border: `0px solid ${theme.palette.primary.main}`, // Bottom border for the selected tab
        },
        marginRight: theme.spacing(2),
    }));

    // const StyledTab = styled(Tab)(({ theme }) => ({
    //     position: 'relative',
    //     color: theme.palette.text.secondary,
    //     border: `2px solid ${theme.palette.divider}`, // Bottom border for the tab
    //     borderBottom: `0px solid ${theme.palette.divider}`,
    //     '&:not(.Mui-selected)': {
    //         backgroundColor: '#f0f0f0', // Replace this with the desired background color for inactive tabs
    //     },
    //     '&.Mui-selected': {
    //         color: theme.palette.primary.main,
    //         backgroundColor: '#ffffff', // Replace this with the desired background color for the selected tab
    //     },
    //     '&.Mui-selected::before': {
    //         content: '""',
    //         display: 'block',
    //         position: 'absolute',
    //         top: 0,
    //         left: 0,
    //         width: '100%',
    //         // border: `0px solid ${theme.palette.primary.main}`, // Top border for the selected tab
    //     },
    //     '&.Mui-selected::after': {
    //         content: '""',
    //         display: 'block',
    //         position: 'absolute',
    //         bottom: 0,
    //         left: '50%', // Adjusted to center the line between two tabs
    //         width: '1px', // Width of the border line
    //         height: 'calc(100% - 4px)', // Height of the border line (minus 4px to account for the 2px border on each tab)
    //         backgroundColor: theme.palette.divider, // Color of the border line
    //         transform: 'translateX(-50%)', // To center the line properly
    //     },
    //     marginRight: theme.spacing(2),
    // }));


    useEffect(() => {
        dispatch(productDetailsApi(router.query.PimCodeId));
    }, []);
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
        setImageDetails(images);//image set
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
        const inputConsumeType = [];
        const isPrescriptionRequired = [];
        const hiperUses = []
        const hiper_direction_of_use = []
        const inputUses = []
        const hipar_side_effets = [];
        const hipar_drugs_warning = [];
        const hipar_patient_counselling = [];
        const hipar_storage = [];











        Object.entries(obj).map(([key, value]) => {
            // console.log(value, "kkkkkkkkkkkkkkkk");
            if (value.attributeSet == "AX MASTER") {
                value?.attributes.forEach((val) => {
                    if (val.keyName == "MANUFACTURER NAME") {
                        inputManufacturerName.push(val.value);
                    }
                });
            }

            if (value.attributeSet == "ONLINEMASTER") {
                value?.attributes.forEach((val) => {
                    if (val.keyName == "is_prescription_required") {
                        isPrescriptionRequired.push(val.value);
                    }
                });
            }


            if (value.attributeSet == "ONLINEMASTER") {
                value?.attributes.forEach((val) => {
                    if (val.keyName == "Medicine Type") {
                        inputConsumeType.push(val.value);
                    }
                });
            }

            if (value.attributeSet === "ONLINEMASTER") {
                value?.attributes.forEach((val) => {
                    if (val.keyName === "Product Information") {
                        const Benefits = val?.value.split("<br>");

                        inputDescription.push(Benefits);
                    }
                });
            }
            if (value.attributeSet === "ONLINEMASTER") {
                value?.attributes.forEach((val) => {
                    if (val.keyName === "Uses") {
                        const Uses = val?.value.split("<br>");

                        inputUses.push(Uses);
                    }
                });
            }


            if (value.attributeSet === "ONLINEMASTER") {
                // console.log("ONLINEMASTER  ")
                value?.attributes.forEach((val) => {
                    // console.log("ONLINEMASTER  ", val.keyName)

                    if (val.keyName == "Key Benefits/Uses") {
                        const Uses = val?.value.split("<br>");

                        inputBenefits.push(Uses);
                    }
                });
            }
            if (value.attributeSet === "ONLINEMASTER") {
                // console.log("ONLINEMASTER  ")
                value?.attributes.forEach((val) => {
                    // console.log("ONLINEMASTER  ", val.keyName)

                    if (val.keyName == "Key Ingredient") {


                        inputKeyIngredient.push(val.value);
                    }
                });
            }



            if (value.attributeSet == "HIPAR") {
                value?.attributes.forEach((val) => {
                    if (val.keyName == "HOW TO USE") {
                        hiper_direction_of_use.push(val.value);
                    }
                });
            }
            if (value.attributeSet == "ONLINEMASTER") {
                value?.attributes.forEach((val) => {
                    if (val.keyName == "Safety Information") {
                        function parseFaqs(rawData) {
                            // Regular expressions to match questions and answers
                            const faqRegex = /<h2>(.*?)<\/h2>.*?<div>(.*?)<\/div>/gs;

                            // Extracting questions and answers using the regular expression
                            const faqsData = [];
                            let match;
                            while ((match = faqRegex.exec(rawData)) !== null) {
                                const question = match[1].trim();
                                const answer = match[2].trim();
                                faqsData.push({ question, answer });
                            }

                            return faqsData;
                        }
                        const faqsData = parseFaqs(val?.value);
                        inputSafety_InformationState.push(faqsData)
                    }
                });
            }


            if (value.attributeSet == "HIPAR") {
                value?.attributes.forEach((val) => {
                    if (val.keyName == "SIDE EFFECTS") {
                        const Benefits = val?.value.split("<br>");
                        hipar_side_effets.push(Benefits);
                    }
                });
            }

            if (value.attributeSet == "HIPAR") {
                value?.attributes.forEach((val) => {
                    if (val.keyName == "DRUGS WARNINGS") {
                        const Benefits = val?.value.split("<br>");
                        hipar_drugs_warning.push(Benefits);
                    }
                });
            }


            if (value.attributeSet == "HIPAR") {
                value?.attributes.forEach((val) => {
                    if (val.keyName == "PATIENT COUNSELLING") {
                        const Benefits = val?.value.split("<br>");
                        hipar_patient_counselling.push(Benefits);
                    }
                });
            }

            if (value.attributeSet == "HIPAR") {
                value?.attributes.forEach((val) => {
                    if (val.keyName == "STORAGE") {
                        const Benefits = val?.value.split("<br>");
                        hipar_storage.push(Benefits);
                    }
                });
            }


        });

        setManufaturererNameDetails(inputManufacturerName);
        set_Is_Prescription_Required(isPrescriptionRequired)
        setConsumeType(inputConsumeType);
        setDescription(inputDescription);
        setKeyBenefits(inputBenefits);
        setDirectionForUse(inputDirectionForUse);
        setKeyIngredient(inputKeyIngredient);
        setSafety_InformationDetails(inputSafety_InformationState);
        setHiperUsesData(hiperUses);
        setHiperDirectionOfUse(hiper_direction_of_use);
        setOnlineUsesData(inputUses);
        setHiparSideEffets(hipar_side_effets)
        setHiparDrugsWarning(hipar_drugs_warning)
        setHiparPatientCounselling(hipar_patient_counselling)
        setHiparStorage(hipar_storage)













    }, [productPimCodeData]);


    const images = [
        {
            original:
                "https://ri-brands-pim.s3.ap-south-1.amazonaws.com/sync/OMEZ01/logo_2_2022%20%281%29-1686159756837-.jpg",
            thumbnail:
                "https://ri-brands-pim.s3.ap-south-1.amazonaws.com/sync/OMEZ01/logo_2_2022%20%281%29-1686159756837-.jpg",
        },
    ];



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
        const inputValue = getInputValue(sectionItem.keyName)?.trim();

        if (!inputValue) {
            return null; // Don't render anything if the value is empty
        }

        return (
            <>
                <Grid md={3} key={index} className={styles.role_based_Text_Field}>
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


    const aboutRender = () => {
        return (
            <>
                <Box>
                    <Grid container spacing={1}>
                        <Grid item md={2}>

                            <Box>
                                <Image
                                    className="px-2 "
                                    src={iconpills}
                                    alt="iconpills"
                                    width={120}
                                    height={120}

                                />
                            </Box>
                        </Grid>
                        <Grid item md={10}>
                            {
                                descriptionDetails &&
                                descriptionDetails !== null &&
                                descriptionDetails !== undefined &&
                                descriptionDetails.length !== 0 &&
                                descriptionDetails.map((item, outerIndex) => (
                                    <React.Fragment key={outerIndex}>
                                        {
                                            Array.isArray(outerIndex) ? (
                                                outerIndex.map((index) => (
                                                    <React.Fragment key={index}>
                                                        <p className={styles.first_info}>
                                                            {item[index]} {/* Accessing the first element at inner index */}
                                                        </p>
                                                        <Box className={styles.second_info}>
                                                            {item[index + 1]} {/* Accessing the second element at inner index + 1 */}
                                                        </Box>
                                                    </React.Fragment>
                                                ))
                                            ) : (
                                                <>
                                                    <p className={styles.first_info}>
                                                        {item[outerIndex]} {/* Accessing the first element at outer index */}
                                                    </p>
                                                    <Box className={styles.second_info}>
                                                        {item[outerIndex + 1]} {/* Accessing the second element at outer index + 1 */}
                                                    </Box>
                                                </>
                                            )
                                        }
                                    </React.Fragment>
                                ))
                            }




                            {/* <Box className={styles.first_info}>
                                {descriptionDetails}
                            </Box>
                            <Box className={styles.second_info}>
                                {descriptionDetails}
                            </Box> */}


                        </Grid>

                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item md={2}>

                            <Box>
                                <Image
                                    className="px-2 "
                                    src={iconfill}
                                    alt="iconfill"
                                    width={120}
                                    height={120}

                                />
                            </Box>
                        </Grid>
                        <Grid item md={10}>
                            <Box className={styles.uses_info}>


                                {onlineUsesData &&
                                    onlineUsesData !== null &&
                                    onlineUsesData !== undefined &&
                                    onlineUsesData.length !== 0 &&
                                    <>
                                        <Typography variant="h7" className={styles.uses_main_header}>
                                            Uses of  {router?.query?.ActiveProduct?.charAt(0).toUpperCase() +
                                                router?.query?.ActiveProduct.slice(1).toLowerCase()}
                                        </Typography>
                                        <p className={styles.uses_main_text}>
                                            {/* Uses of {router.query?.ActiveProduct?.charAt(0).toUpperCase() +
                                        router.query?.ActiveProduct.slice(1).toLowerCase()}
                                         */}
                                            {onlineUsesData}
                                        </p>
                                    </>

                                }





                                {
                                    keyBenefits &&
                                    keyBenefits !== null &&
                                    keyBenefits !== undefined &&
                                    keyBenefits.length !== 0 &&
                                    <>
                                        <Typography variant="h7" className={styles.uses_main_header}>
                                            Medical Benefits
                                        </Typography>
                                        {/* {
                                            keyBenefits &&

                                            keyBenefits !== null &&
                                            keyBenefits !== undefined &&
                                            keyBenefits.length !== 0 &&
                                            keyBenefits.map((item, index) => (
                                                <>
                                                    <p key={index} className={styles.keyBenefits_info}>
                                                        {item[0]}
                                                    </p>
                                                    <Box className={styles.second_info}>
                                                        {item[1]}
                                                    </Box>
                                                </>

                                            ))} */}

                                        {
                                            keyBenefits &&
                                            keyBenefits !== null &&
                                            keyBenefits !== undefined &&
                                            keyBenefits.length !== 0 &&
                                            keyBenefits.map((item, outerIndex) => (
                                                <React.Fragment key={outerIndex}>
                                                    {
                                                        Array.isArray(outerIndex) ? (
                                                            outerIndex.map((index) => (
                                                                <React.Fragment key={index}>
                                                                    <p className={styles.keyBenefits_info}>
                                                                        {item[index]} {/* Accessing the first element at inner index */}
                                                                    </p>
                                                                    <Box className={styles.second_info}>
                                                                        {item[index + 1]} {/* Accessing the second element at inner index + 1 */}
                                                                    </Box>
                                                                </React.Fragment>
                                                            ))
                                                        ) : (
                                                            <>
                                                                <p className={styles.keyBenefits_info}>
                                                                    {item[outerIndex]} {/* Accessing the first element at outer index */}
                                                                </p>
                                                                <Box className={styles.second_info}>
                                                                    {item[outerIndex + 1]} {/* Accessing the second element at outer index + 1 */}
                                                                </Box>
                                                            </>
                                                        )
                                                    }
                                                </React.Fragment>
                                            ))
                                        }


                                    </>

                                }


                                {hiperDirectionOfUse &&
                                    hiperDirectionOfUse !== null &&
                                    hiperDirectionOfUse !== undefined &&
                                    hiperDirectionOfUse.length !== 0 &&
                                    <>
                                        <Typography variant="h7" className={styles.uses_main_header}>
                                            Direction of use
                                        </Typography>

                                        <p className={styles.uses_main_text}>

                                            {hiperDirectionOfUse}
                                        </p>
                                    </>
                                }

                                {hiparStorageData &&
                                    hiparStorageData !== null &&
                                    hiparStorageData !== undefined &&
                                    hiparStorageData.length !== 0 &&
                                    <Typography variant="h7" className={styles.uses_main_header}>
                                        Storage
                                    </Typography>
                                }

                                {/* <p className={styles.uses_main_text}>

                                    {hiparStorageData}
                                </p> */}

                                {
                                    hiparStorageData &&
                                    hiparStorageData !== null &&
                                    hiparStorageData !== undefined &&
                                    hiparStorageData.length !== 0 &&
                                    hiparStorageData.map((item, outerIndex) => (
                                        <React.Fragment key={outerIndex}>
                                            {
                                                Array.isArray(outerIndex) ? (
                                                    outerIndex.map((index) => (
                                                        <React.Fragment key={index}>
                                                            <p className={styles.keyBenefits_info}>
                                                                {item[index]} {/* Accessing the first element at inner index */}
                                                            </p>
                                                            <Box className={styles.second_info}>
                                                                {item[index + 1]} {/* Accessing the second element at inner index + 1 */}
                                                            </Box>
                                                        </React.Fragment>
                                                    ))
                                                ) : (
                                                    <>
                                                        <p className={styles.keyBenefits_info}>
                                                            {item[outerIndex]} {/* Accessing the first element at outer index */}
                                                        </p>
                                                        <Box className={styles.second_info}>
                                                            {item[outerIndex + 1]} {/* Accessing the second element at outer index + 1 */}
                                                        </Box>
                                                    </>
                                                )
                                            }
                                        </React.Fragment>
                                    ))
                                }

                            </Box>



                        </Grid>

                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item md={2}>

                            <Box>
                                <Image
                                    className="px-2 "
                                    src={beingsick}
                                    alt="beingsick"
                                    width={120}
                                    height={120}

                                />
                            </Box>
                        </Grid>
                        <Grid item md={10}>
                            <Box className={styles.uses_info}>
                                {
                                    hiparSideEffets &&
                                    hiparSideEffets !== null &&
                                    hiparSideEffets !== undefined &&
                                    hiparSideEffets.length !== 0 &&
                                    < Typography variant="h7" className={styles.uses_main_header}>
                                        Side Effects of {router?.query?.ActiveProduct?.charAt(0).toUpperCase() +
                                            router?.query?.ActiveProduct.slice(1).toLowerCase()}
                                    </Typography>
                                }
                                {
                                    hiparSideEffets &&
                                    hiparSideEffets !== null &&
                                    hiparSideEffets !== undefined &&
                                    hiparSideEffets.length !== 0

                                    && hiparSideEffets[0].map((item, index) => (
                                        <ListItem key={index} className={styles.list_li}>
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

                                            <ListItemText className={styles.list_li_text}>
                                                {item}
                                            </ListItemText>
                                        </ListItem>
                                    ))

                                }


                            </Box>



                        </Grid>

                    </Grid>
                </Box >
            </>
        )
    }



    const precautionsRender = () => {
        return (
            <>
                <Box>
                    <Grid container spacing={1}>
                        <Grid item md={2}>

                            <Box>
                                <Image
                                    className="px-2 "
                                    src={iconpills}
                                    alt="iconpills"
                                    width={120}
                                    height={120}

                                />
                            </Box>
                        </Grid>
                        <Grid item md={10}>
                            {
                                hiparDrugsWarning &&

                                hiparDrugsWarning !== null &&
                                hiparDrugsWarning !== undefined &&
                                hiparDrugsWarning.length !== 0 &&
                                hiparDrugsWarning.map((item, index) => (
                                    <>
                                        <p key={index} className={styles.first_info}>
                                            {item[0]}
                                        </p>
                                        <Box className={styles.second_info}>
                                            {item[1]}
                                        </Box>
                                    </>

                                ))}



                            {/* <Box className={styles.first_info}>
                                {descriptionDetails}
                            </Box>
                            <Box className={styles.second_info}>
                                {descriptionDetails}
                            </Box> */}


                        </Grid>

                    </Grid>

                </Box >
            </>
        )
    }

    const diseaseRender = () => {
        return (
            <>
                <Box>
                    <Grid container spacing={1}>
                        <Grid item md={2}>

                            <Box>
                                <Image
                                    className="px-2 "
                                    src={iconpills}
                                    alt="iconpills"
                                    width={120}
                                    height={120}

                                />
                            </Box>
                        </Grid>
                        <Grid item md={10}>
                            {/* {
                                hiparPatientCounselling &&

                                hiparPatientCounselling !== null &&
                                hiparPatientCounselling !== undefined &&
                                hiparPatientCounselling.length !== 0 &&
                                hiparPatientCounselling.map((item, index) => (
                                    <>
                                        <p key={index} className={styles.first_info}>
                                            {item[0]}
                                        </p>
                                        <Box className={styles.second_info}>
                                            {item[1]}
                                        </Box>
                                    </>

                                ))} */}




                            {
                                hiparPatientCounselling &&
                                hiparPatientCounselling !== null &&
                                hiparPatientCounselling !== undefined &&
                                hiparPatientCounselling.length !== 0 &&
                                hiparPatientCounselling.map((item, outerIndex) => (
                                    <React.Fragment key={outerIndex}>
                                        {
                                            Array.isArray(outerIndex) ? (
                                                outerIndex.map((index) => (
                                                    <React.Fragment key={index}>
                                                        <p className={styles.first_info}>
                                                            {item[index]} {/* Accessing the first element at inner index */}
                                                        </p>
                                                        <Box className={styles.second_info}>
                                                            {item[index + 1]} {/* Accessing the second element at inner index + 1 */}
                                                        </Box>
                                                    </React.Fragment>
                                                ))
                                            ) : (
                                                <>
                                                    <p className={styles.first_info}>
                                                        {item[outerIndex]} {/* Accessing the first element at outer index */}
                                                    </p>
                                                    <Box className={styles.second_info}>
                                                        {item[outerIndex + 1]} {/* Accessing the second element at outer index + 1 */}
                                                    </Box>
                                                </>
                                            )
                                        }
                                    </React.Fragment>
                                ))
                            }

                        </Grid>

                    </Grid>

                </Box >
            </>
        )
    }

    const FaqItem = ({ question, answer }) => {
        const cleanedAnswer = answer.replace(/<\/?div>/g, '');
        return (
            <div>
                <h5 className={styles.question}><span className={styles.question_bold}>Question:</span> {question}</h5>
                <p className={styles.answer}><span className={styles.answer_bold}>Answer:</span> {cleanedAnswer}</p>
            </div>
        )
    }


    const Faqs = ({ data }) => {
        // console.log(data, "dddddddddddddddd")
        return (
            <>
                {
                    data &&
                    data !== null &&
                    data !== undefined &&
                    data.length !== 0 &&
                    data[0].map((faq, index) => (
                        <FaqItem key={index} question={faq.question} answer={faq.answer.replace(/<\/div>/g, '')} />
                    ))}

            </>
        )
    }



    const faqRender = () => {
        return (
            <>
                <Box>
                    <Grid container spacing={1}>
                        <Grid item md={2}>

                            <Box>
                                <Image
                                    className="px-2 "
                                    src={iconpills}
                                    alt="iconpills"
                                    width={120}
                                    height={120}

                                />
                            </Box>
                        </Grid>
                        <Grid item md={10}>

                            {
                                stateSafety_InformationDetails &&
                                stateSafety_InformationDetails !== null &&
                                stateSafety_InformationDetails !== undefined &&
                                stateSafety_InformationDetails.length !== 0 &&
                                <Faqs data={stateSafety_InformationDetails} />

                            }
                        </Grid>

                    </Grid>

                </Box >
            </>
        )
    }



    return (
        <>
            <Grid container>
                <Grid item xs={12} lg={12}>
                    <Card sx={{ p: 3 }}>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <h2 className={styles.pimCodeId}>
                                        {router.query.ActiveProduct}
                                    </h2>
                                    <Grid container spacing={1}>
                                        <Grid item md={6}>
                                            <Box display="flex" alignItems="center">

                                                <Image
                                                    className="px-2 "
                                                    src={manufature}
                                                    alt="manufacture"
                                                    width={70}
                                                    height={70}

                                                />
                                                <Box>
                                                    <p className={styles.manufacturerDetailHead}>
                                                        Manufacturer/Marketer
                                                    </p>
                                                    <p className={styles.manufacturerDetailData}>

                                                        {manufaturererNameDetails}

                                                    </p>
                                                </Box>
                                            </Box>


                                        </Grid>
                                        <Grid item md={6}>
                                            <Box display="flex" alignItems="center">
                                                <Image
                                                    className="px-2 "
                                                    src={prescription}
                                                    alt="manufacture"
                                                    width={70}
                                                    height={70}

                                                />
                                                <Box>
                                                    <p className={styles.manufacturerDetailHead}>
                                                        Prescription
                                                    </p>
                                                    <p className={styles.manufacturerDetailData}>
                                                        {is_prescription_required == 0 ? "Not required" : "Required"}
                                                    </p>
                                                </Box>
                                            </Box>


                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={1}>

                                        {keyIngredient &&
                                            keyIngredient &&
                                            keyIngredient !== null &&
                                            keyIngredient !== undefined &&
                                            Object.keys(keyIngredient).length !== 0 &&

                                            <Grid item md={6}>
                                                <Box display="flex" alignItems="center">
                                                    <Image
                                                        className="px-2 "
                                                        src={compotion}
                                                        alt="compotion"
                                                        width={70}
                                                        height={70}

                                                    />
                                                    <Box>
                                                        <p className={styles.manufacturerDetailHead}>
                                                            Composition
                                                        </p>
                                                        <p className={styles.manufacturerDetailData}>
                                                            {keyIngredient}
                                                        </p>
                                                    </Box>
                                                </Box>


                                            </Grid>
                                        }
                                        {
                                            consumeType &&
                                            consumeType !== null &&
                                            consumeType !== undefined &&
                                            consumeType.length !== 0 &&
                                            <Grid item md={6}>

                                                <Box display="flex" alignItems="center">
                                                    <Image
                                                        className="px-2 "
                                                        src={consume}
                                                        alt="manufacture"
                                                        width={70}
                                                        height={70}

                                                    />
                                                    <Box>
                                                        <p className={styles.manufacturerDetailHead}>
                                                            Consume Type
                                                        </p>
                                                        <p className={styles.manufacturerDetailData}>
                                                            {/* {typeof consumeType} */}
                                                            {consumeType}
                                                            {/* {consumeType.length == 1 ? consumeType?.trim() : 'NA'} */}
                                                        </p>
                                                    </Box>
                                                </Box>


                                            </Grid>
                                        }
                                    </Grid>
                                    <Box className={styles.channel_published}>
                                        <p>
                                            Channels Published :
                                        </p>

                                        <hr></hr>
                                    </Box>
                                    <Box>
                                        <Grid container spacing={1}>

                                            <Grid item xs={3.3} className={styles.channel_box}>
                                                <Box className={styles.channel_logo}>

                                                    <Image
                                                        className="px-2 "
                                                        src={apollo}
                                                        alt="apollo"
                                                        width={40}
                                                        height={40}
                                                    />
                                                </Box>

                                                <p className={styles.channel_text}>
                                                    Apollo Web
                                                </p>
                                                <p className={styles.channel_last_published}>
                                                    Last Published : 12th July 2023
                                                </p>
                                                <p className={styles.channel_price}>

                                                    <span>&#8377;</span>44
                                                </p>
                                            </Grid>
                                            <p className={styles.divider}>
                                            </p>
                                            <Grid item xs={3.3} className={styles.channel_box}>
                                                <Box className={styles.channel_logo}>
                                                    <Image
                                                        className="px-2 "
                                                        src={bhel}
                                                        alt="bhel"
                                                        width={30}
                                                        height={30}
                                                    />
                                                </Box>
                                                <p className={styles.channel_text}>
                                                    Bhel
                                                </p>
                                                <p className={styles.channel_last_published}>
                                                    Last Published : 12th July 2023
                                                </p>
                                                <p className={styles.channel_price}>
                                                    <span>&#8377;</span>40
                                                </p>

                                            </Grid>
                                            <p className={styles.divider}>

                                            </p>
                                            <Grid item xs={3.3} className={styles.channel_box}>
                                                <Box className={styles.channel_logo}>
                                                    <Image
                                                        className="px-2 "
                                                        src={amazon}
                                                        alt="amazon"
                                                        width={30}
                                                        height={30}
                                                    />
                                                </Box>
                                                <p className={styles.channel_text}>
                                                    Amazon
                                                </p>
                                                <p className={styles.channel_last_published}>
                                                    Last Published : 12th July 2023
                                                </p>
                                                <p className={styles.channel_price}>
                                                    <span>&#8377;</span>45
                                                </p>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>

                                    {stateImageDetails && stateImageDetails.length ? (
                                        <CombinedImageDisplay images={stateImageDetails} />
                                    ) : (
                                        <>
                                            <CombinedImageDisplay images={images} />
                                        </>
                                    )}

                                </Grid>

                            </Grid>

                        </Box>

                        <Box sx={{ marginTop: "2rem" }}>
                            <Box sx={{ width: '100%', typography: 'body1', border: 1, borderTop: 0, borderColor: 'divider' }}>
                                <TabContext value={value}>
                                    <Box >
                                        <TabList onChange={handleChange} aria-label="lab API tabs example" >
                                            <StyledTab label={`About ${router?.query?.ActiveProduct?.charAt(0).toUpperCase() +
                                                router?.query?.ActiveProduct?.slice(1).toLowerCase()}`} value="1" />
                                            <StyledTab label="In-Depth Precautions and Warning" value="2" />
                                            <StyledTab label="Disease/Condition Glossary" value="3" />
                                            <StyledTab label="FAQ’s" value="4" />
                                        </TabList>
                                    </Box>
                                    <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
                                        <TabPanel value="1">{aboutRender()}</TabPanel>
                                        <TabPanel value="2">{precautionsRender()}</TabPanel>
                                        <TabPanel value="3">{diseaseRender()}</TabPanel>
                                        <TabPanel value="4">{faqRender()}</TabPanel>
                                    </Box>
                                </TabContext>
                            </Box>
                        </Box>
                        <Box className={styles.attribute_mapping}>
                            <p>
                                Attribute Mapping :
                            </p>

                            <hr></hr>
                        </Box>
                        <Box sx={{ marginTop: '2rem', }} >
                            <Box sx={{ width: '100%', typography: 'body1', border: 1, borderTop: 0, borderColor: 'divider' }}>
                                <TabContext value={attributeValue}>
                                    <Box>
                                        <TabList onChange={handleChangeAttribute} aria-label="lab API tabs example">

                                            {productPimCodeData?.productDetails !== null &&
                                                productPimCodeData?.productDetails !== undefined &&
                                                Object.keys(productPimCodeData?.productDetails).length &&
                                                productPimCodeData?.productDetails.map((tab, index) => (
                                                    <StyledTab label={
                                                        tab?.attributeSet?.charAt(0).toUpperCase() +
                                                        tab?.attributeSet?.slice(1).toLowerCase()
                                                    }
                                                        value={index}
                                                        key={index} />
                                                ))}

                                        </TabList>
                                    </Box>
                                    <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
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
                                    </Box>
                                </TabContext>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
            <ToastContainer />
        </>
    );
};

export default ActiveProductView;

