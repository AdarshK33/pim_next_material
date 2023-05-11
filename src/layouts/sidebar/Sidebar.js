import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  Link,
  Button,
  Typography,
  ListItem,
  Collapse,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import LogoIcon from "../logo/LogoIcon";
import Menuitems from "./MenuItems";
import Buynow from "./Buynow";
import { useRouter } from "next/router";
import SideBarContent from "./siderBarContent";
import Image from "next/image";
import styles from "./sidebar.module.css";

import ProfileDD from "../header/ProfileDD";

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const [open, setOpen] = React.useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("");

  const [openSecondLevel, setOpenSecondLevel] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickSecondLevel = () => {
    setOpenSecondLevel(!openSecondLevel);
  };

  const handleMenuClick = (title) => {
    console.log(title, "hello title");
    if (title === selectedMenu) {
      setSubmenuOpen(!submenuOpen);
    } else {
      setSelectedMenu(title);
      setSubmenuOpen(true);
    }
  };

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  let curl = useRouter();
  const location = curl.pathname;

  // the below role has to be dynamic
  const ROLE = "ADMIN";

  const filteredMenuItems =
    ROLE !== "ADMIN"
      ? Menuitems.filter(
          (item) =>
            !["DASHBOARD", "USER MANAGEMENT", "PUBLISH"].includes(
              item.title.toUpperCase()
            )
        )
      : Menuitems;

  const SidebarContent = (
    <Box p={2} height="100%" className={styles.bg_color}>
      <LogoIcon />
      <Divider />

      <div>{/* <ProfileDD /> */}</div>
      <Divider />
      <Box mt={2}>
        <div className={styles.roots}>
          <List>
            {filteredMenuItems.map((menuitem, index) => {
              console.log("menuIiem", menuitem);
              return (
                <div key={index}>
                  <List component="li" disablePadding>
                    <NextLink href={menuitem.href}>
                      <ListItem
                        // button
                        onClick={() => handleMenuClick(menuitem.title)}
                        // onClick={() => handleClick(index)}
                        // button
                        selected={location === menuitem.href}
                        sx={{
                          mb: 1,
                          ...(location === menuitem.href && {
                            color: "#419794",
                            // backgroundColor: (theme) =>
                            //   `${theme.palette.primary.main}!important`,
                          }),
                        }}
                      >
                        <ListItemIcon>
                          {/* <img src={menuitem.icon} alt={menuitem.title} /> */}
                          <Image
                            // className="px-2 "
                            src={menuitem.icon}
                            alt="edit"
                            width={20}
                            height={20}
                            // onClick={()=>handleEdit(item.brandId)}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={menuitem.title}
                          className={styles.text_menu}
                        />
                        {menuitem.list && submenuOpen ? "" : ""}
                      </ListItem>
                    </NextLink>
                  </List>
                  {menuitem.list && (
                    <Collapse
                      in={menuitem.title === selectedMenu && submenuOpen}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {menuitem.list.map((submenu, index) => {
                          return (
                            <NextLink href={submenu.href}>
                              <ListItem
                                key={index}
                                button
                                className={styles.nesteds}
                                sx={{
                                  mb: 1,
                                  ...(location === submenu.href && {
                                    color: "#419794",
                                    // backgroundColor: (theme) =>
                                    //   `${theme.palette.primary.main}!important`,
                                  }),
                                }}
                              >
                                <ListItemText
                                  primary={submenu.title}
                                  className={styles.text_sub_menu}
                                />
                              </ListItem>
                            </NextLink>
                          );
                        })}
                      </List>
                    </Collapse>
                  )}
                </div>
              );
            })}
          </List>
        </div>
      </Box>

      {/* <Buynow /> */}
    </Box>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: "265px",
            border: "0 !important",
            boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={isSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: "265px",
          border: "0 !important",
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

Sidebar.propTypes = {
  isMobileSidebarOpen: PropTypes.bool,
  onSidebarClose: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
};

export default Sidebar;
