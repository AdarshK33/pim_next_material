import React, { Fragment } from "react";
import { Accordion } from "react-bootstrap";
import SidebarContent from "./sidebarContent";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import Image from 'next/image';


import brand from "../../assets/icons/brand-image.svg";
import catalogue from "../../assets/icons/catalogue.svg"
import distribution from "../../assets/icons/distribution.svg"
import inventory from "../../assets/icons/inventory.svg"
import upload from "../../assets/icons/upload.svg"
import process from "../../assets/icons/process.svg"



function DashBoardSideBar({ defaultValue }) {
  const allTabs = [
    {
      name: "Catalog",
      icon: catalogue,
      id: "catalog",
      list: [
        // {
        //   name: "Catalogs",
        //   link: "/dashboard/catalog?list=catalog_list",
        //   list_name: "catalog_list",
        // },
        
        // {
        //   name: "Catalog Versions",
        //   link: "/dashboard/catalog?list=catelog_version",
        //   list_name: "catelog_version",
        // },
        // {
        //   name: "Brand",
        //   link: "/dashboard/brands?list=brands_categories",
        //   list_name: "brands_categories",
        // },
        {
          name: "Categories",
          link: "/dashboard/catalog?list=categories",
          list_name: "categories",
        },
        {
          name: "Products",
          link: "/dashboard/catalog?list=products",
          list_name: "products",
        },
        // {
        //   name: "Uploads",
        //   link: "/dashboard/catalog?list=uploads",
        //   list_name: "uploads",
        // },
        // {
        //   name: "Publish",
        //   link: "/dashboard/catalog?list=publish",
        //   list_name: "publish",
        // },
      ],
    },
    {
      name: "Brands",
      icon: brand,
      id: "brands",
      link: "/dashboard/brands?list=brands_categories",
      list: [
        // {
        //   name: "Classifying Category",
        //   link: "/dashboard/brands?list=brands_categories",
        //   list_name: "brands_categories",
        // },
        // {
        //   name: "Features List",
        //   link: "/dashboard/brands?list=features_list",
        //   list_name: "features_list",
        // },
        // {
        //   name: "Features Values",
        //   link: "/dashboard/brands?list=features_values",
        //   list_name: "features_values",
        // },
        // {
        //   name: "Classification Units",
        //   link: "/dashboard/brands?list=classifications",
        //   list_name: "classifications",
        // },
      ],
    },
    {
      name: "Channels",
      icon:distribution ,
      id: "channel",
      list: [],
    },
    {
      name: "User Management",
      icon:process ,
      id: "usermanagement",
      link: "/dashboard/settings?list=permission",
      list: [],
    },
    { 
    name: "Bulk Upload", 
    icon: inventory, 
    id: "bulkupload", 
    link: "/dashboard/catalog?list=uploads",
    list: [] 
    },
    {
      name: "Media",
      icon: upload,
      id: "media",
      list: [],
      link: "/dashboard/settings?list=permission",
    },
  ];

  return (defaultValue ? 
  <Accordion flush className="dashboard-side-filter" defaultActiveKey={defaultValue} >
    {allTabs.map((item) => (
      <Accordion.Item key={`dashboardSidebar${item.id}`} eventKey={item.id}>
        {item.link ? (
          <Link href={item.link}>
            <Accordion.Header>
              {/* <img src={item.icon} alt={item.name} className="px-2" /> */}
              <Image
              className="px-2"
							src={item.icon}
							alt="logo"
              width={40}
							height={30}
						/>
              {item.name}
            </Accordion.Header>
          </Link>
        ) : (
          <Accordion.Header>
            {/* <img src={item.icon} alt={item.name} className="px-2" /> */}
            <Image
              className="px-2"
							src={item.icon}
							alt="logo"
              width={40}
							height={30}
						/>
            {item.name}
          </Accordion.Header>
        )}
        <Accordion.Body className="py-1">
          <SidebarContent data={item.list} />
        </Accordion.Body>
      </Accordion.Item>
    ))}
  </Accordion> : <Fragment />
  );

}

export default React.memo(DashBoardSideBar);
