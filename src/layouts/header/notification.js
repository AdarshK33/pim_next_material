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
  const { userRole, notifyData, loading } = useSelector((state) => {
    return state.loginReducer;
  });
  console.log("notifyData", notifyData);

  // console.log("extractedValue", extractedValue);

  const [anchorEl66, setAnchorEl66] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [arrayData, setArrayData] = useState(0);

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
      console.log("hello key", key, value);
      if (key) {
        return value;
      }
    });
    setArrayData(mappedArray);
  };

  console.log("arrayData", arrayData[0]);
  const handleClose4 = () => {
    setNotificationCount(0);
    setAnchorEl66(null);
  };

  return (
    <>
      {loading === false && notificationCount > 0 ? (
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
          onClick={() => setAnchorEl66(true)}
          size="large"
        >
          <>
            <Bell width="30" height="25" />
            {/* <span>{notificationCount}</span> */}
          </>
        </IconButton>
      )}
      {loading === false && (
        <Menu
          id="basic-menu"
          // anchorEl={anchorEl66}
          open={anchorEl66}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClose={handleClose4}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {/* {sectionAccordionSetUpRender()} */}
          {/* <MenuItem onClick={handleClose4}>Profile</MenuItem>
        <MenuItem onClick={handleClose4}>My account</MenuItem>
        <MenuItem onClick={handleClose4}>Logout</MenuItem> */}
          {Object.keys(arrayData).length &&
            arrayData[0].map((alert, index) => (
              <Box key={index}>
                <List
                  component="nav"
                  aria-label="secondary mailbox folder"
                  onClick={handleClose4}
                >
                  {userRole === "ADMIN" ? (
                    <Alert severity="warning">
                      Item ID {alert.getPimModelCode} has pending validation in
                      attribute set {alert.getAttributeSet}.
                    </Alert>
                  ) : (
                    <Alert severity="warning">
                      Item ID {alert.getPimModelCode} is pending validation
                    </Alert>
                  )}
                </List>
              </Box>
            ))}
        </Menu>
      )}
    </>
  );
};

export default Notification;
