import dashboard from "../../../assets/images/ICONS/Dashboard.svg";
import master from "../../../assets/images/ICONS/Master.svg";

import media from "../../../assets/images/ICONS/Media.svg";

import products from "../../../assets/images/ICONS/Products.svg";

import Publish from "../../../assets/images/ICONS/Publish.svg";
import upload from "../../../assets/images/ICONS/Upload.svg";

import userManagement from "../../../assets/images/ICONS/UserManagement.svg";

const Menuitems = [
  {
    title: "DASHBOARD",
    icon: dashboard,
    href: "/dashboard",
  },
  {
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
  },
  {
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
        href: "#",
      },
    ],
  },

  // {
  //   title: "PRODUCTS",
  //   icon: products,
  //   href: "/rating",
  //   list: [
  //     {
  //       title: "FORMATION",
  //       href: "/buttons",
  //     },
  //     {
  //       title: "ACTIVE",
  //       href: "/image",
  //     },
  //   ],
  // },
  {
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
  },
  {
    title: "USER MANAGEMENT",
    icon: userManagement,
    href: "#",
    list: [
      {
        title: "ROLES",
        href: "#",
      },
      {
        title: "USERS",
        href: "/userManagement",
      },
    ],
  },
  {
    title: "BULK UPLOAD",
    icon: upload,
    href: "#",
  },

  {
    title: "MEDIA",
    icon: media,
    href: "#",
  },
];

export default Menuitems;
