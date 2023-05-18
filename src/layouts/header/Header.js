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

const Header = ({
  sx,
  customClass,
  toggleMobileSidebar,
  position,
  moduleName,
}) => {
  return (
    <AppBar sx={sx} position={position} elevation={0} className={customClass}>
      <Toolbar>
        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "flex",
              xs: "flex",
            },
          }}
        >
          <Menu width="20" height="20" />
        </IconButton>

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
