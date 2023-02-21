import { useRouter } from "next/router";
import Image from "next/image";
import React, { useMemo,useState, useEffect } from "react";
import DashBoardContent from "../../components/admin/dashBoardContent";
import DashBoardSideBar from "../../components/admin/dashBoardSideBar";
import styles from "./dashboard.module.css";
import PublicHeader from "../../components/public/publicHeader";
import logo from "../../assets/icons/logo_2_2022.svg";
import user from "../../assets/icons/user1.png";
import CommonHeader from "../../components/admin/commonHeader"
import { useDispatch, useSelector } from "react-redux";
import {initApplication} from "../../redux/actions/app"

import useUser from "../../utils/useUser";
// import fetchJson from "../../utils/fetchJson";
// import { useRouter } from "next/router";
import RedirectLogin from "../redirectLogin";

function AdminDashBoard() {
  const dispatch = useDispatch();
  const { user, mutateUser } = useUser();


  // useEffect(() => {
	// 	dispatch(initApplication());
	// }, []);
  // const { loginUser } = useSelector(({app}) => {
  //   console.log("hello app",app)
  //   return {loginUser: app?.loggedIn,};
  // });


  const { query } = useRouter();
  const heading = useMemo(() => {
    switch (query.list) {
      case "dashboard":
        return "DashBoard";
      case "catalog_list":
        return "Catalog";
      case "permission":
        return "Admin";
      case "publish":
        return "View";
      case "products":
        return "Products";
      case "uploads":
        return "Catalog";
      case "brands_categories":
        return "Brands";
      default:
        return `${query.name}/${query.list}`;
    }
  }, [query]);

  return (
<>
    {user?.isLoggedIn === true ? (
      <>
    <div className="page-container dashBoard">
      {/* <h4 className="offset-md-2 px-2 text-uppercase heading">{heading}</h4> */}
      <div className="row mx-0 md-5 p-0 min_height_100">
        <div className={`col-md-2 ${styles.bg_color} sidebar_blk`}>
          <DashBoardSideBar defaultValue={query.name} />
        </div>

        <div className={`col-md-10 px-0 ${styles.bg_color_header}`}>
          {/* CommonHeader */}
       <CommonHeader />
          <hr className={styles.dashboard_hr}></hr>
          <DashBoardContent />
        </div>
      </div>
    </div>
    </>
    ):(<>
    <RedirectLogin />
    </>)
  }
     </>
  );
 
}

export default React.memo(AdminDashBoard);
