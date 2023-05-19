import React from "react";

import { ChevronDown } from "react-feather";

import Image from "next/image";
import userimg from "../../../assets/images/users/user2.jpg";
import { Box, Menu, Typography, Link, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logoutApi } from "../../../redux/actions/logout";
const ProfileDD = () => {
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const dispatch = useDispatch();

  const { userRole } = useSelector((state) => {
    return state.loginReducer;
  });
  // console.log("loginReducer", userRole);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };
  return (
    <>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick4}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            marginRight: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "2px solid orange",
            }}
          >
            <Image
              src={userimg}
              alt={userimg}
              width={40}
              height={40}
              className="roundedCircle"
            />
          </div>

          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
            }}
          >
            <h4
              className="text-primary"
              variant="h5"
              fontWeight="700"
              sx={{
                ml: 1,
              }}
            >
              {/* {userRole ? userRole : "My Profile"} */}

              {userRole ? userRole : "My Profile"}
              <ChevronDown icon="chevron-down" width="20" height="20" />
            </h4>
          </Box>
        </div>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
        sx={{
          "& .MuiMenu-paper": {
            width: "385px",
            right: "10px !important",
            left: "auto !important",
            top: "50px !important",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Box>
          <Box p={2}>
            <Link to="/" onClick={() => dispatch(logoutApi())}>
              <Button
                sx={{
                  borderRadius: "8px",
                  transition: "all 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  },
                }}
                fullWidth
                variant="contained"
                color="primary"
              >
                Logout
              </Button>
            </Link>
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default ProfileDD;
