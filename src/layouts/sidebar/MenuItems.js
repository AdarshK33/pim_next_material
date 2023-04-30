import dashboard from "../../../assets/icons/dashboard.svg";
import attributes from "../../../assets/icons/attributes.svg";
import category from "../../../assets/icons/category.svg";
import products from "../../../assets/icons/products.svg";
import user from "../../../assets/icons/user.svg";
import userImg from "../../../assets/icons/userImg.svg";

const Menuitems = [
  {
    title: "DASHBOARD",
    icon: dashboard,
    href: "#",
  },
  {
    title: "MASTER",
    icon: category,
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
    title: "CATALOG",
    icon: userImg,
    href: "#",
    list: [
      {
        title: "ALL PRODUCTS",
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
    title: "CHANNELS",
    icon: userImg,
    href: "/channels",
    list: [
      {
        title: "ATTRIBUTES MAPPING",
        href: "/channelAttributes",
      },
    ],
  },
  {
    title: "USER MANAGEMENT",
    icon: user,
    href: "#",
  },

  {
    title: "MEDIA",
    icon: user,
    href: "#",
  },
];

export default Menuitems;
