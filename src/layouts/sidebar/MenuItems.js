
import dashboard from "../../../assets/icons/dashboard.svg";
import attributes from "../../../assets/icons/attributes.svg";
import category from "../../../assets/icons/category.svg";
import products from "../../../assets/icons/products.svg";
import user from "../../../assets/icons/user.svg";
// import userImg from "../../../assets/icons/userImg.svg";






const Menuitems = [
  {
    title: "DASHBOARD",
    icon: dashboard,
    href: "/",
  },

  {
    title: "CATEGORY",
    icon: category,
    href: "/category",
    // list: [
    //   {
    //     title: "Categories",
    //     href: "/categories",
    //   },
    //   {
    //     title: "Products",
    //     href: "/products",
    //   }
    // ],
  },
  {
    title: "ATTRIBUTES",
    icon: attributes,
    href: "#",
  },

  {
    title: "PRODUCTS",
    icon: products,
    href: "#",
  },
  {
    title: "CHANNELS",
    icon: user,
    href: "/channels",
  },
  {
    title: "NOTIFICATION",
    icon: user,
    href: "#",
  },
 
  {
    title: "USER & ROLE",
    icon: user,
    href: "#",
  },
 
 
];

export default Menuitems;
