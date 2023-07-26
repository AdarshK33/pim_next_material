import React from "react";
import { Menu } from "react-feather";

import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import PropTypes from "prop-types";
// Dropdown Component
import SearchDD from "./SearchDD";
import ProfileDD from "./ProfileDD";
import Notification from "./notification";

import {
  Grid,
  Button,
  // Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import LogoIcon from "../logo/LogoIcon";

const Header = ({
  sx,
  customClass,
  toggleMobileSidebar,
  position,
  moduleName,
}) => {
  return (
    <AppBar
      style={{
        borderRadius: "10px",
        borderRadius: "10px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        zIndex: 200,
      }}
      sx={sx}
      position={position}
      elevation={0}
      className={customClass}
    >
      <Toolbar>
        <div
          style={{
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LogoIcon />
          <IconButton
            size="extra-large"
            color="inherit"
            aria-label="menu"
            onClick={toggleMobileSidebar}
            sx={{
              display: {
                lg: "flex",
                xs: "flex",
              },
              position: "fixed",
              top: "14px",
              left: "230px",
              zIndex: 2,
            }}
          >
            <Menu width="20" height="20" />
          </IconButton>
        </div>
        <div style={{ position: "fixed", left: "35rem" }}>
          <p
            className="
          text-primary2
          "
          >
            Product Information Management
          </p>
        </div>
        {/* <Typography variant="h2">{moduleName}</Typography> */}
        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        {/* <SearchDD /> */}
        {/* <div className="adarsh">adarsh</div> */}
        {/* ------------ End Menu icon ------------- */}

        <Box flexGrow={1} />
        <Notification />
        <ProfileDD />
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  customClass: PropTypes.string,
  moduleName: PropTypes.string,

  position: PropTypes.string,
  toggleSidebar: PropTypes.func,
  toggleMobileSidebar: PropTypes.func,
};

export default Header;
