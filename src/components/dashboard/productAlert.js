import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import Image from "next/image";
import { Edit2, Bell, Search, Download } from "react-feather";
import styles from "./dashboard.module.css";

import {
  IconButton,
  Input,
  Box,
  Alert,
  Drawer,
  Menu,
  Button,
  List,
  Divider,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
// import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";

const ProductAlert = () => {
  const dispatch = useDispatch();
  // const router = useRouter();

  const { loading, dashBoardData, notifyData, userRole } = useSelector(
    (state) => {
      return state.loginReducer;
    }
  );

  const [expanded, setExpanded] = React.useState(false);
  const [arrayData, setArrayData] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const extractedValue = Object.keys(notifyData)[0];
    setNotificationCount(extractedValue);
    const result = sectionAccordionSetUpRender(notifyData);
  }, [notifyData]);

  const sectionAccordionSetUpRender = (obj) => {
    if (!obj) {
      return;
    }
    // const obj = notifyData;
    const mappedArray = Object.entries(obj).map(([key, value]) => {
      // console.log("hello key", key, value);
      if (key) {
        return value;
      }
    });
    setArrayData(mappedArray);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    // #F2F0F0
    <Grid container>
      <Card
        sx={{
          p: 0,
          width: "100%",
        }}
      >
        <CardContent
          sx={{
            paddingLeft: "25px",
            paddingRight: "25px",
          }}
        >
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <Box sx={{ display: "flex", flexShrink: 0 }}>
              {loading === false && notificationCount > 0 ? (
                <>
                  <Typography sx={{ width: "5%", flexShrink: 0 }}>
                    <Bell width="30" height="25" color="red" />
                    {/* <span className={styles.notify_number}>
                      {notificationCount}
                    </span> */}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography sx={{ width: "5%", flexShrink: 0 }}>
                    <Bell width="30" height="25" />
                  </Typography>
                </>
              )}

              <Typography
                sx={{ color: "#00000", fontSize: "18px", fontWeight: "600" }}
              >
                Actions Pending & Recent Updates
              </Typography>
            </Box>
          </Accordion>

          {arrayData &&
            arrayData !== null &&
            arrayData !== undefined &&
            arrayData.length !== 0 &&
            arrayData[0].map((alert, index) => (
              <Accordion key={index}>
                <AccordionSummary>
                  {userRole === "ADMIN" ? (
                    <Typography sx={{ color: "text.secondary" }}>
                      Item ID {alert.getPimModelCode} has pending validation in
                      attribute set {alert.getAttributeSet}.
                    </Typography>
                  ) : (
                    <Typography>
                      Item ID {alert.getPimModelCode} is pending validation
                    </Typography>
                  )}
                  {/* <Typography sx={{ color: "text.secondary" }}>
                    18 Products are under review and waiting for Approval
                  </Typography> */}
                </AccordionSummary>
              </Accordion>
            ))}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductAlert;
