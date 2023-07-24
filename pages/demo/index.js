
import React from "react";
import Image from "next/image";
import { StopCircle, Eye } from "react-feather";

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
import { styled } from "@mui/material/styles";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { withIronSessionSsr } from "iron-session/next";
import { sessionOption } from "../../utils/session";
import styles from "./view.module.css";

import manufature from "../../assets/icons/manufature.svg";
import compotion from "../../assets/icons/compotion.svg";
import consume from "../../assets/icons/consume.svg";
import amazon from "../../assets/icons/amazon.svg";
import bhel from "../../assets/icons/bhel.svg";
import apollo from "../../assets/icons/logo_2_2022.svg";
import iconpills from "../../assets/icons/iconpills.svg";
import iconfill from "../../assets/icons/iconfill.svg";
import beingsick from "../../assets/icons/beingsick.svg";




import prescription from "../../assets/icons/prescription.svg";
import CombinedImageDisplay from "./zoom";


const index = (user) => {
    const [value, setValue] = React.useState('1');
    const [attributeValue, setAttributeValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeAttribute = (event, newValue) => {
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






    const images = [
        {
            original:
                "https://ri-brands-pim.s3.ap-south-1.amazonaws.com/sync/APL0019/front_livochoice_1-1689341233865-.jpg",
            thumbnail:
                "https://ri-brands-pim.s3.ap-south-1.amazonaws.com/sync/APL0019/front_livochoice_1-1689341233865-.jpg",

        },
        {
            original:
                " https://ri-brands-pim.s3.ap-south-1.amazonaws.com/sync/ECO0038/ECO0037_1_1-1689341038564-.jpg"
            ,
            thumbnail:
                " https://ri-brands-pim.s3.ap-south-1.amazonaws.com/sync/ECO0038/ECO0037_1_1-1689341038564-.jpg"
        }
    ];

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
                            <Box className={styles.first_info}>
                                Combiflam Tablet 20's belongs to a class of painkillers called non-steroidal anti-inflammatory drugs (NSAIDs). It relieves symptoms of muscle pain, arthritis pain, dysmenorrhea (painful periods or menstrual cramps), and dental pain and reduces fever. Pain can be temporary (acute) or long-lasting (chronic). Acute pain is for a short time caused by damage to the tissues of the muscle, bone, or other organs. In contrast, chronic pain lasts for a long duration and is caused due to pathologies like nerve damage, osteoarthritis etc. Besides this, it is also useful for dental pain, which can occur due to damage to the tooth nerve, infection, decay, extraction or injury.

                            </Box>
                            <Box className={styles.second_info}>

                                Combiflam Tablet 20's is composed of two medicines, namely Ibuprofen and Paracetamol. Ibuprofen is known to have an analgesic and anti-inflammatory effect for reducing mild to moderate pain. It works by blocking the effect of a chemical known as prostaglandin, responsible for inducing pain and inflammation in our body. Paracetamol acts as a mild analgesic and antipyretic (fever reducer). It lowers the elevated body temperature and mild pain by inhibiting the synthesis of a chemical messenger (prostaglandin) and promoting heat loss (through sweating) that helps reset the hypothalamic thermostat. Together, these two medicines help reduce mild to moderate pain in a shorter duration.
                            </Box>


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
                                <Typography variant="h7" className={styles.uses_main_header}>
                                    Uses of Combiflam Tablet 20's
                                </Typography>

                                <p className={styles.uses_main_text}>
                                    Uses of Combiflam Tablet 20's Muscle pain, Arthritis pain, Headache, Migraine, Backache, Dental pain, Fever.


                                </p>

                                <Typography variant="h7" className={styles.uses_main_header}>
                                    Medical Benefits
                                </Typography>


                                <p className={styles.uses_main_text}>
                                    Combiflam Tablet 20's belongs to a class of painkillers called non-steroidal anti-inflammatory drugs (NSAIDs). It relieves symptoms of muscle pain, arthritis pain, dysmenorrhea (painful periods or menstrual cramps), and dental pain and reduces fever. Pain can be temporary (acute) or long-lasting (chronic). Acute pain is for a short time caused by damage to the tissues of the muscle, bone, or other organs. In contrast, chronic pain lasts for a long duration and is caused due to pathologies like nerve damage, osteoarthritis etc. Besides this, it is also useful for dental pain, which can occur due to damage to the tooth nerve, infection, decay, extraction or injury.

                                </p>
                                <Typography variant="h7" className={styles.uses_main_header}>
                                    Direction of use
                                </Typography>

                                <p className={styles.uses_main_text}>
                                    Directions of use must clearly state the route of admintration as well as the dose for each target population for which the product is intended.
                                </p>
                                <Typography variant="h7" className={styles.uses_main_header}>
                                    Storage
                                </Typography>

                                <p className={styles.uses_main_text}>

                                    Store in a cool and dry place away from sunlight.
                                </p>

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
                                <Typography variant="h7" className={styles.uses_main_header}>
                                    Side Effects of Combiflam Tablet 20's
                                </Typography>

                                <List>
                                    <ListItem className={styles.list_li}>
                                        <ListItemIcon >
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
                                            Nausea
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem className={styles.list_li}>
                                        <ListItemIcon >
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
                                            Vomiting
                                        </ListItemText>


                                    </ListItem>
                                    <ListItem className={styles.list_li}>
                                        <ListItemIcon >
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
                                            Painkillers called non-steroidal
                                        </ListItemText>

                                    </ListItem>
                                    <ListItem className={styles.list_li}>
                                        <ListItemIcon >
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
                                            Skin
                                        </ListItemText>

                                    </ListItem>




                                </List>
                            </Box>



                        </Grid>

                    </Grid>
                </Box>
            </>
        )
    }
    const axMasterRender = () => {
        return (
            <>
                <Grid container>
                    <Grid md={3} key={index} className={styles.role_based_Text_Field}>
                        <InputLabel htmlFor="outlined-basic" style={{ fontSize: '.75rem' }}>
                            {`Display Name`}
                        </InputLabel>
                        <TextField
                            className={styles.input_active_master}
                            style={{ cursor: 'pointer' }}
                            id="outlined-basic"
                            variant="standard"
                            name="Display Name"
                            value={"Tablets"}
                        // InputProps={{ disableUnderline: true, readOnly: true }}
                        />
                    </Grid >
                    <Grid md={3} key={index} className={styles.role_based_Text_Field}>
                        <InputLabel htmlFor="outlined-basic" style={{ fontSize: '.75rem' }}>
                            {`Category Name`}
                        </InputLabel>
                        <TextField
                            className={styles.input_active_master}
                            style={{ cursor: 'pointer' }}
                            id="outlined-basic"
                            variant="standard"
                            name="Category Name"
                            value={"pharma"}
                        // InputProps={{ disableUnderline: true, readOnly: true }}
                        />
                    </Grid >

                    <Grid md={3} key={index} className={styles.role_based_Text_Field}>
                        <InputLabel htmlFor="outlined-basic" style={{ fontSize: '.75rem' }}>
                            {`Brand Name`}
                        </InputLabel>
                        <TextField
                            className={styles.input_active_master}
                            style={{ cursor: 'pointer' }}
                            id="outlined-basic"
                            variant="standard"
                            name="Brand Name"
                            value={"Apollo"}
                        // InputProps={{ disableUnderline: true, readOnly: true }}
                        />
                    </Grid >

                    <Grid md={3} key={index} className={styles.role_based_Text_Field}>
                        <InputLabel htmlFor="outlined-basic" style={{ fontSize: '.75rem' }}>
                            {`Manufature Name`}
                        </InputLabel>
                        <TextField
                            className={styles.input_active_master}
                            style={{ cursor: 'pointer' }}
                            id="outlined-basic"
                            variant="standard"
                            name="Manufature Name"
                            value={"pvt ltd"}
                        // InputProps={{ disableUnderline: true, readOnly: true }}
                        />
                    </Grid >
                    <Grid md={3} key={index} className={styles.role_based_Text_Field}>
                        <InputLabel htmlFor="outlined-basic" style={{ fontSize: '.75rem' }}>
                            {`Price`}
                        </InputLabel>
                        <TextField
                            className={styles.input_active_master}
                            style={{ cursor: 'pointer' }}
                            id="outlined-basic"
                            variant="standard"
                            name="price"
                            value={"$12"}
                        // InputProps={{ disableUnderline: true, readOnly: true }}
                        />
                    </Grid >
                    <Grid md={3} key={index} className={styles.role_based_Text_Field}>
                        <InputLabel htmlFor="outlined-basic" style={{ fontSize: '.75rem' }}>
                            {`Tax`}
                        </InputLabel>
                        <TextField
                            className={styles.input_active_master}
                            style={{ cursor: 'pointer' }}
                            id="outlined-basic"
                            variant="standard"
                            name="Tax"
                            value={"$2"}
                        // InputProps={{ disableUnderline: true, readOnly: true }}
                        />
                    </Grid >

                    <Grid md={3} key={index} className={styles.role_based_Text_Field}>
                        <InputLabel htmlFor="outlined-basic" style={{ fontSize: '.75rem' }}>
                            {`Package Size`}
                        </InputLabel>
                        <TextField
                            className={styles.input_active_master}
                            style={{ cursor: 'pointer' }}
                            id="outlined-basic"
                            variant="standard"
                            name="price"
                            value={"20"}
                        // InputProps={{ disableUnderline: true, readOnly: true }}
                        />
                    </Grid >
                    <Grid md={3} key={index} className={styles.role_based_Text_Field}>
                        <InputLabel htmlFor="outlined-basic" style={{ fontSize: '.75rem' }}>
                            {`Package Type`}
                        </InputLabel>
                        <TextField
                            className={styles.input_active_master}
                            style={{ cursor: 'pointer' }}
                            id="outlined-basic"
                            variant="standard"
                            name="Tax"
                            value={"Black"}
                        // InputProps={{ disableUnderline: true, readOnly: true }}
                        />
                    </Grid >
                </Grid>
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
                                        Combiflam Tablet 15's
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

                                                        VERTEX PHARMACEUTICALS PVT LTD

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
                                                        Required
                                                    </p>
                                                </Box>
                                            </Box>


                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={1}>

                                        <Grid item md={6}>
                                            <Box display="flex" alignItems="center">
                                                <Image
                                                    className="px-2 "
                                                    src={compotion}
                                                    alt="manufacture"
                                                    width={70}
                                                    height={70}

                                                />
                                                <Box>
                                                    <p className={styles.manufacturerDetailHead}>
                                                        composition
                                                    </p>
                                                    <p className={styles.manufacturerDetailData}>
                                                        IBUPROFEN-400MG + PARACETAMOL-325MG
                                                    </p>
                                                </Box>
                                            </Box>


                                        </Grid>
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
                                                        ORAL
                                                    </p>
                                                </Box>
                                            </Box>


                                        </Grid>
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
                                                        width={30}
                                                        height={30}
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

                                    {/* {stateImageDetails && stateImageDetails.length ? (
                                        <ThumbnailSlider images={stateImageDetails} />
                                    ) : ( */}
                                    <>
                                        <CombinedImageDisplay images={images} />
                                    </>
                                    {/* )} */}

                                </Grid>

                            </Grid>

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
                                            <StyledTab label="AX Master" value="1" />
                                            <StyledTab label="Keymed Master" value="2" />
                                            <StyledTab label="Hiper master" value="3" />
                                            <StyledTab label="Online master" value="4" />
                                        </TabList>
                                    </Box>
                                    <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
                                        <TabPanel value="1">{axMasterRender()}</TabPanel>
                                        <TabPanel value="2">Keymed master  input field</TabPanel>
                                        <TabPanel value="3">Hiper master  input field</TabPanel>
                                        <TabPanel value="4">Online master input field</TabPanel>
                                    </Box>
                                </TabContext>
                            </Box>
                        </Box>
                        <Box sx={{ marginTop: "2rem" }}>
                            <Box sx={{ width: '100%', typography: 'body1', border: 1, borderTop: 0, borderColor: 'divider' }}>
                                <TabContext value={value}>
                                    <Box >
                                        <TabList onChange={handleChange} aria-label="lab API tabs example" >
                                            <StyledTab label="About Combiflam Tablet 20's" value="1" />
                                            <StyledTab label="In-Depth Precautions and Warning" value="2" />
                                            <StyledTab label="Disease/Condition Glossary" value="3" />
                                            <StyledTab label="FAQ’s" value="4" />
                                        </TabList>
                                    </Box>
                                    <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
                                        <TabPanel value="1">{aboutRender()}</TabPanel>
                                        <TabPanel value="2">In-Depth Precautions and Warning  input field</TabPanel>
                                        <TabPanel value="3">Disease/Condition Glossary  input field</TabPanel>
                                        <TabPanel value="4">FAQ’s input field</TabPanel>
                                    </Box>
                                </TabContext>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default index;

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
        try {
            const user = req?.session?.user || null;
            if (!user) {
                return {
                    redirect: {
                        destination: "/",
                        permanent: false,
                    },
                };
            }

            return {
                props: {
                    user: req?.session?.user || null,
                },
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    sessionOption
);
