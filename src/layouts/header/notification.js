import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

import { Edit2, Bell, Search, Download } from "react-feather";

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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import styles from "./header.module.css";

const Notification = () => {
  const { userRole, notifyData } = useSelector((state) => {
    return state.loginReducer;
  });
  console.log("notifyData", notifyData);

  // console.log("extractedValue", extractedValue);

  const [anchorEl66, setAnchorEl66] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const extractedValue = Object.keys(notifyData)[0];
    setNotificationCount(extractedValue);
  }, [notifyData]);

  const sectionAccordionSetUpRender = () => {
    if (!notifyData) {
      return;
    }
    const obj = notifyData;
    return Object.entries(obj).map(([key, value]) => {
      console.log("hello key", key, value);
      return value;
    });
  };
  console.log("ashsiuh", sectionAccordionSetUpRender());
  const handleClose4 = () => {
    setAnchorEl66(null);
  };

  let data = [
    {
      getPimModelCode: "BOOST",
      getAttributeSet: "KEYMEDMASTER",
    },
    {
      getPimModelCode: "Test0001",
      getAttributeSet: "AX MASTER",
    },
    {
      getPimModelCode: "Coffee0001",
      getAttributeSet: "AX MASTER",
    },
  ];
  return (
    <>
      {notificationCount > 0 ? (
        <IconButton
          aria-label="show 4 new mails"
          color="inherit"
          aria-controls="search-menu"
          aria-haspopup="true"
          onClick={() => setAnchorEl66(true)}
          size="large"
        >
          <>
            <Bell width="35" height="30" color="red" />
            <span className={styles.notify_number}>{notificationCount}</span>
          </>
        </IconButton>
      ) : (
        <IconButton
          aria-label="show 4 new mails"
          color="inherit"
          aria-controls="search-menu"
          aria-haspopup="true"
          size="large"
        >
          <>
            <Bell width="30" height="25" />
            {/* <span>{notificationCount}</span> */}
          </>
        </IconButton>
      )}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl66}
        open={anchorEl66}
        onClose={handleClose4}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* {sectionAccordionSetUpRender()} */}
        {/* <MenuItem onClick={handleClose4}>Profile</MenuItem>
        <MenuItem onClick={handleClose4}>My account</MenuItem>
        <MenuItem onClick={handleClose4}>Logout</MenuItem> */}
        {sectionAccordionSetUpRender()[0].map((alert, index) => (
          <React.Fragment key={index}>
            {userRole === "ADMIN" && alert.getAttributeSet == "AX MASTER" ? (
              <Box>
                <List
                  component="nav"
                  aria-label="secondary mailbox folder"
                  onClick={handleClose4}
                >
                  <>
                    <Alert severity="warning">
                      ** Please check {alert.getAttributeSet}. Product Item{" "}
                      {alert.getPimModelCode}
                    </Alert>
                  </>
                </List>
              </Box>
            ) : userRole === "KEYMED_MANAGER" &&
              alert.getAttributeSet == "KEYMEDMASTER" ? (
              <Box>
                <List
                  component="nav"
                  aria-label="secondary mailbox folder"
                  onClick={handleClose4}
                >
                  <>
                    <Alert severity="warning">
                      ** Please check {alert.getAttributeSet}. Product Item{" "}
                      {alert.getPimModelCode}
                    </Alert>
                  </>
                </List>
              </Box>
            ) : userRole === "R_DRUGS" && alert.getAttributeSet == "R_DRUGS" ? (
              <Box>
                <List
                  component="nav"
                  aria-label="secondary mailbox folder"
                  onClick={handleClose4}
                >
                  <>
                    <Alert severity="warning">
                      ** Please check {alert.getAttributeSet}. Product Item{" "}
                      {alert.getPimModelCode}
                    </Alert>
                  </>
                </List>
              </Box>
            ) : userRole === "HIPAR" && alert.getAttributeSet == "HIPAR" ? (
              <Box>
                <List
                  component="nav"
                  aria-label="secondary mailbox folder"
                  onClick={handleClose4}
                >
                  <>
                    <Alert severity="warning">
                      ** Please check {alert.getAttributeSet}. Product Item{" "}
                      {alert.getPimModelCode}
                    </Alert>
                  </>
                </List>
              </Box>
            ) : userRole === "ONLINE_MASTER" &&
              alert.getAttributeSet == "ONLINEMASTER" ? (
              <>
                <Alert severity="warning">
                  ** Please check {alert.getAttributeSet}. Product Item{" "}
                  {alert.getPimModelCode}
                </Alert>
              </>
            ) : (
              <></>
            )}
          </React.Fragment>
        ))}
      </Menu>
    </>
  );
};

export default Notification;
