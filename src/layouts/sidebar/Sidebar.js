import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
} from "@mui/material";

import Menuitems from "./MenuItems";

import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./sidebar.module.css";

import { useSelector } from "react-redux";
import { ChevronRight, ChevronDown } from "react-feather";
import dashboard from "../../../assets/images/ICONS/Dashboard.svg";
import master from "../../../assets/images/ICONS/Master.svg";
import products from "../../../assets/images/ICONS/Products.svg";
import Publish from "../../../assets/images/ICONS/Publish.svg";
import userManagement from "../../../assets/images/ICONS/UserManagement.svg";
import upload from "../../../assets/images/ICONS/Upload.svg";
import media from "../../../assets/images/ICONS/Media.svg";

const Sidebar = ({ onSidebarClose, isSidebarOpen }) => {
  const [open, setOpen] = React.useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
  const [dynamicMenu, setDynamicMenu] = useState("");

  const { loginReducer } = useSelector((state) => {
    return state;
  });
  const { authorities } = useSelector((state) => state.loginReducer);

  const [openSecondLevel, setOpenSecondLevel] = React.useState(true);

  useEffect(() => {
    if (authorities) {
      updateDynamicMenu();
    }
  }, [authorities]);

  const handleMenuClick = (title) => {
    if (title === selectedMenu) {
      setSubmenuOpen(!submenuOpen);
    } else {
      setSelectedMenu(title);
      setSubmenuOpen(true);
    }
  };
  const handleSubMenuClick = (submenuTitle) => {
    if (selectedSubMenu === submenuTitle) {
      setSelectedSubMenu(null);
    } else {
      setSelectedSubMenu(submenuTitle);
    }
  };

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  let curl = useRouter();
  const location = curl.pathname;
  //console.log(location, "location");

  const menuProtected = Menuitems.filter(
    (item) =>
      !["DASHBOARD", "USER MANAGEMENT", "PUBLISH"].includes(
        item.title.toUpperCase()
      )
  );

  const filteredMenuItems =
    loginReducer?.userRole === "ADMIN" ? Menuitems : menuProtected;

  const updateDynamicMenu = () => {
    let menu = [];

    if (authorities?.DASHBOARD) {
      menu.push({
        title: "DASHBOARD",
        icon: dashboard,
        href: "/dashboard",
      });
    }

    if (authorities?.CATEGORY && authorities?.ATTRIBUTES) {
      menu.push({
        title: "MASTER",
        icon: master,
        href: "",
        list: [
          {
            title: "CATEGORIES",
            href: "/category",
          },
          {
            title: "ATTRIBUTES",
            href: "/attributes",
          },
        ],
      });
    }

    if (authorities?.CATEGORY && !authorities?.ATTRIBUTES) {
      menu.push({
        title: "MASTER",
        icon: master,
        href: "",
        list: [
          {
            title: "CATEGORIES",
            href: "/category",
          },
        ],
      });
    }

    if (!authorities?.CATEGORY && authorities?.ATTRIBUTES) {
      menu.push({
        title: "MASTER",
        icon: master,
        href: "",
        list: [
          {
            title: "ATTRIBUTES",
            href: "/attributes",
          },
        ],
      });
    }

    if (authorities?.FORMATION && authorities?.ACTIVE_PRODUCTS) {
      menu.push({
        title: "PRODUCTS",
        icon: products,
        href: "#",
        list: [
          {
            title: "FORMATION",
            href: "/allProducts",
          },
          {
            title: "ACTIVE PRODUCTS",
            href: "/activeProducts",
          },
        ],
      });
    }

    if (authorities?.FORMATION && !authorities?.ACTIVE_PRODUCTS) {
      menu.push({
        title: "PRODUCTS",
        icon: products,
        href: "#",
        list: [
          {
            title: "FORMATION",
            href: "/allProducts",
          },
        ],
      });
    }

    if (!authorities?.FORMATION && authorities?.ACTIVE_PRODUCTS) {
      menu.push({
        title: "PRODUCTS",
        icon: products,
        href: "#",
        list: [
          {
            title: "ACTIVE PRODUCTS",
            href: "/activeProducts",
          },
        ],
      });
    }

    if (authorities?.CHANNELS && authorities?.ATTRIBUTE_MAPPING) {
      menu.push({
        title: "PUBLISH",
        icon: Publish,
        href: "#",
        list: [
          {
            title: "CHANNELS",
            href: "/channels",
          },
          {
            title: "ATTRIBUTES MAPPING",
            href: "/channelAttributes",
          },
        ],
      });
    }

    if (authorities?.CHANNELS && !authorities?.ATTRIBUTE_MAPPING) {
      menu.push({
        title: "PUBLISH",
        icon: Publish,
        href: "#",
        list: [
          {
            title: "CHANNELS",
            href: "/channels",
          },
        ],
      });
    }

    if (!authorities?.CHANNELS && authorities?.ATTRIBUTE_MAPPING) {
      menu.push({
        title: "PUBLISH",
        icon: Publish,
        href: "#",
        list: [
          {
            title: "ATTRIBUTES MAPPING",
            href: "/channelAttributes",
          },
        ],
      });
    }

    if (authorities?.ROLES && authorities?.USERS) {
      menu.push({
        title: "USER MANAGEMENT",
        icon: userManagement,
        href: "#",
        list: [
          {
            title: "ROLES",
            href: "/roles",
          },
          {
            title: "USERS",
            href: "/userDetails",
          },
        ],
      });
    }
    if (authorities?.ROLES && !authorities?.USERS) {
      menu.push({
        title: "USER MANAGEMENT",
        icon: userManagement,
        href: "#",
        list: [
          {
            title: "ROLES",
            href: "/roles",
          },
        ],
      });
    }

    if (!authorities?.ROLES && authorities?.USERS) {
      menu.push({
        title: "USER MANAGEMENT",
        icon: userManagement,
        href: "#",
        list: [
          {
            title: "USERS",
            href: "/userDetails",
          },
        ],
      });
    }

    if (authorities?.BULK_UPLOAD) {
      menu.push({
        title: "BULK UPLOAD",
        icon: upload,
        href: "/bulkUpload",
      });
    }

    if (authorities?.MEDIA) {
      menu.push({
        title: "MEDIA",
        icon: media,
        href: "/media",
      });
    }
    setDynamicMenu(menu);
  };

  const SidebarContent = (
    <Box p={5} height="100%" className={styles.bg_color}>
      <div></div>

      <Box mt={2}>
        <div className={styles.roots}>
          <List>
            {dynamicMenu &&
              dynamicMenu.map((menuitem, index) => {
                return (
                  <div style={{ marginTop: 10 }} key={index}>
                    <List component="li" disablePadding>
                      <NextLink href={menuitem.href}>
                        <ListItem
                          onClick={() => handleMenuClick(menuitem.title)}
                          selected={location === menuitem.href}
                          sx={{
                            mb: 1,
                            pl: 0,
                            ...(location === menuitem.href && {
                              color: "#419794",
                            }),
                          }}
                        >
                          <ListItemIcon>
                            <Image
                              src={menuitem.icon}
                              alt="edit"
                              width={20}
                              height={20}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={menuitem.title}
                            className={styles.text_menu}
                          />
                          {submenuOpen &&
                          menuitem.title === selectedMenu &&
                          menuitem.list ? (
                            <>
                              <ChevronDown
                                icon="chevron-down"
                                width="25"
                                height="20"
                              />
                            </>
                          ) : menuitem.list ? (
                            <>
                              <ChevronRight
                                icon="chevron-right"
                                width="25"
                                height="20"
                              />
                            </>
                          ) : (
                            <></>
                          )}
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
                                    }),
                                  }}
                                  onClick={() =>
                                    handleSubMenuClick(submenu.title)
                                  }
                                >
                                  <ListItemIcon>
                                    <ChevronRight
                                      icon="chevron-right"
                                      width="25"
                                      height="20"
                                    />
                                    {/* Change the icon based on the state */}
                                  </ListItemIcon>
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
      {/* <div className="copyright_block">
        <p className="copyright_txt">All copyrights reserved, 2023 @ APOLLO</p>
      // </div> */}
      {/* Its working  */}
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
            zIndex: 1,
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
