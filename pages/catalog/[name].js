import { useRouter } from "next/router";
import Image from "next/image";
import React, { useMemo } from "react";
import DashBoardContent from "../../components/admin/dashBoardContent";
import DashBoardSideBar from "../../components/admin/dashBoardSideBar";
import styles from "../dashboard/dashboard.module.css";
import PublicHeader from "../../components/public/publicHeader";
import logo from "../../assets/icons/logo_2_2022.svg";
import user from "../../assets/icons/user1.png";
import ProductDetail from "../../components/admin/catalog/productDetails"
function AdminDashBoard() {
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
    <div className="page-container dashBoard">
      {/* <h4 className="offset-md-2 px-2 text-uppercase heading">{heading}</h4> */}
      <div className="row mx-0 md-5 p-0 min_height_100">
        <div className={`col-md-2 ${styles.bg_color}`}>
          <DashBoardSideBar defaultValue={query.name} />
        </div>

        <div className={`col-md-10 px-0 ${styles.bg_color_header}`}>
          <div className={styles.header}>
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-10">
                  <div className={styles.header_logo}>
                    <div className="header_logo_img">
                      <Image src={logo} alt="logo" width={55} height={39} />
                    </div>
                    <span className={styles.header_info}>
                      Product information management
                    </span>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className={styles.header_profile}>
                    <div className={styles.header_profile_img}>
                      <Image src={user} alt="logo" width={30} height={30} />
                    </div>
                    <span className={styles.header_profile_info}>
                      My Profile
                    </span>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className={styles.dashboard_hr}></hr>
          {/* <DashBoardContent /> */}
          <div className={styles.main_product_details}>
          {<ProductDetail />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(AdminDashBoard);
